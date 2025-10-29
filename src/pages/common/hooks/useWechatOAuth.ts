interface GetWeChatCodeUrlOptions {
  appId: string;
  scope: string;
  state: string;
  redirectUri: string;
}
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useMutation } from "@tanstack/vue-query";
import { TokenManager } from "@/auth/tokenManager";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { jwtDecode } from "jwt-decode";
import { api } from "@/api/axios";

const CONFIG = {
  appId: "wx7bbdf981cf3342ff",
  scope: "snsapi_base",
  state: "123",
};
export function redirectToWeChatOAuth(options: GetWeChatCodeUrlOptions) {
  const { appId, scope, state, redirectUri } = options;
  const urlObj = new URL(redirectUri);
  const redirectUriEncoded = encodeURIComponent(urlObj.toString());
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUriEncoded}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
  window.location.replace(url);
}
export function useWeCode() {
  const route = useRoute();
  const code = computed(() => {
    const queryCode = route.query['code'] ?? "";
    if (Array.isArray(queryCode)) {
      return queryCode[0];
    }
    return queryCode;
  });
  const refreshCode = () => {
    redirectToWeChatOAuth({
      appId: CONFIG.appId,
      scope: CONFIG.scope,
      state: CONFIG.state,
      redirectUri: window.location.href.split("?")[0] as string,
    });
  };
  return {
    code,
    refreshCode,
  };
}

export function useWechatLogin() {
  const { code } = useWeCode();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: () => api.wx.postWx({ code: code.value ?? "" }),
    onSuccess: (res) => {
      // 假设/wx接口在登录场景下返回JWT token
      // 注意：这基于当前代码的业务逻辑，可能需要与后端确认API设计
      const token = res.data.data;
      if (typeof token === 'string') {
        TokenManager.setToken(token);
        TokenManager.setTokenPayload(jwtDecode(token));
        ElMessage.success({ message: "登录成功" });
      } else {
        ElMessage.error({ message: "登录响应格式错误：未收到有效的token" });
      }
      router.push("/");
    },
    onError: (_error: unknown) => {
      const message = "微信登录失败：该微信尚未绑定账号，请使用帐号密码登录";
      ElMessage.error({ message });
    },
  });
  watch(code, (newCode) => {
    if (newCode) {
      loginMutation.mutate();
    }
  });
  return {
    ...loginMutation,
    code,
  };
}
export function useWatchCodeLogin(){
  const { code, mutate: loginWechat } = useWechatLogin();
  watch(code, (newCode) => {
    if (newCode) {
      loginWechat();
    }
  });
}