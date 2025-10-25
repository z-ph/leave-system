import { TokenManager } from "@/auth/tokenManager";
import { Api } from "./Api";
const baseURL = import.meta.env.DEV ? "/api" : "https://csmht.xin/sinin";
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
