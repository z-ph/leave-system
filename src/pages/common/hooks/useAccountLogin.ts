import { ref } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { TokenManager } from "@/auth/tokenManager";
import type { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { ROUTE_PATHS } from "@/router/constants";

// 微信小程序错误类型
interface WxError {
  errMsg: string;
  errCode?: number;
}

// 微信小程序登录响应类型
interface WxLoginResponse {
  code: string;
  errMsg: string;
}

// 微信小程序全局变量类型声明
declare const wx: {
  login: (options?: {
    success?: (res: WxLoginResponse) => void;
    fail?: (err: WxError) => void;
    complete?: () => void;
  }) => void;
} | undefined;

export interface LoginFormData {
  number: string;
  password: string;
}

export function useAccountLogin(){
  const router = useRouter();
  const formData = ref<LoginFormData>({
    number: "",
    password: "",
  });
  const loginMutation = useMutation({
    mutationFn: () => api.login.loginCreate(formData.value),
    onSuccess: (res) => {
      TokenManager.setToken(res.data.data ?? "");
      TokenManager.setTokenPayload(jwtDecode(res.data.data ?? ""));
      ElMessage.success({ message: "登录成功" });
      router.push(ROUTE_PATHS.COMMON);
    },
    onError: (error) => {
      ElMessage.error({ message: error.message?.toString() ?? "登录失败" });
    },
  });
  return {
    formData,
    ...loginMutation,
  };
}