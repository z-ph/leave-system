import { TokenManager } from "@/auth/tokenManager";
import { Api } from "./Api";
declare const $api_base_url$: string;
const baseURL = import.meta.env.DEV ? "/api" : $api_base_url$;
console.log(baseURL);
export const api = new Api({
  baseURL,
});
api.instance.interceptors.request.use((config) => {
  const token = TokenManager.getToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});
api.instance.interceptors.response.use((response) => {
  const data = response.data;
  if (data.code !== 1) {
    throw new Error(data.msg);
  }
  return response;
});
