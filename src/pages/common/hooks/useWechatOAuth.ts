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
import { ROUTE_PATHS } from "@/router/constants";
declare const $wechat_app_id$: string;
const CONFIG = {
  appId: $wechat_app_id$,
  scope: "snsapi_base",
  state: "123",
};
console.log(CONFIG.appId);
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
    const queryCode = route.query["code"] ?? "";
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

export function useWatchCodeLogin() {
  const router = useRouter();
  const { code, refreshCode } = useWeCode();
  const loginMutation = useMutation({
    mutationFn: () => api.wxlogin.wxloginUpdate({ code: code.value ?? "" }),
    onSuccess: (res) => {
      // 假设/wx接口在登录场景下返回JWT token
      // 注意：这基于当前代码的业务逻辑，可能需要与后端确认API设计
      const token = res.data.data;
      if (typeof token === "string") {
        TokenManager.setToken(token);
        TokenManager.setTokenPayload(jwtDecode(token));
        ElMessage.success({ message: "登录成功" });
      } else {
        ElMessage.error({ message: "登录响应格式错误：未收到有效的token" });
      }
      router.push(ROUTE_PATHS.COMMON_INDEX);
    },
    onError: (error: Error) => {
      ElMessage.error({ message: error.message });
    },
  });
  watch(
    code,
    (newCode) => {
      if (newCode) {
        loginMutation.mutate();
      }
    },
    { immediate: true }
  );
  return {
    WeiLogin: refreshCode,
  };
}
export function useWatchCodeBindWechat(refetch: () => void) {
  const router = useRouter();
  const route = useRoute();
  const { code, refreshCode: bindWechat } = useWeCode();
  const bindWechatMutation = useMutation({
    mutationFn: () => api.wx.postWx({ code: code.value ?? "" }),
    onSuccess: () => {
      ElMessage.success({ message: "绑定微信成功" });
      //清楚code
      router.replace({ query: { ...route.query, code: undefined } });
      refetch();
    },
    onError: (error: Error) => {
      ElMessage.error({ message: error.message });
    },
  });
  watch(
    code,
    (newCode) => {
      if (newCode) {
        bindWechatMutation.mutate();
      }
    },
    { immediate: true }
  );
  return {
    bindWechat,
  };
}

export function useWatchCodeUnbindWechat(refetch: () => void) {
  return useMutation({
    mutationFn: () => api.wx.deleteWx(),
    onSuccess: () => {
      ElMessage.success({ message: "解绑微信成功" });
      refetch();
    },
    onError: (error: Error) => {
      ElMessage.error({ message: error.message });
    },
  });
}
