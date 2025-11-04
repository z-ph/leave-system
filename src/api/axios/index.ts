import { TokenManager } from "@/auth/tokenManager";
import { Api } from "./Api";
declare const __api_base_url__: string;
const baseURL = import.meta.env.DEV ? "/api" : __api_base_url__;
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
