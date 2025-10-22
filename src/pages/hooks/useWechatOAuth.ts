interface GetWeChatCodeUrlOptions {
  appId: string;
  scope: string;
  state: string;
  redirectUri: string;
}
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
const CONFIG = {
  appId: "wx64e54eb19f699276",
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
    const queryCode = route.query.code ?? "";
    if (Array.isArray(queryCode)) {
      return queryCode[0];
    }
    return queryCode;
  });
  onMounted(() => {
    if (!code.value) {
      redirectToWeChatOAuth({
        appId: CONFIG.appId,
        scope: CONFIG.scope,
        state: CONFIG.state,
        redirectUri: window.location.href,
      });
    }
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
