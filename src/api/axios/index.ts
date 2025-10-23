import { Api } from "./Api";
const baseURL = import.meta.env.DEV ? "/api" : "https://csmht.xin/sinin";
export const api = new Api({
  baseURL,
});