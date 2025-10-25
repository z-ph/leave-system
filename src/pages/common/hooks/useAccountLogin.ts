import { ref } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { TokenManager } from "@/auth/tokenManager";

export interface LoginFormData {
  number: string;
  password: string;
}

export function useAccountLogin() {
  const router = useRouter();
  const qc = useQueryClient();

  const formData = ref<LoginFormData>({
    number: "",
    password: "",
  });

  const isSubmitting = ref(false);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const res = await api.login.loginCreate(data);
      return res.data;
    },
    onSuccess: async (response) => {
      const token = response.data;
      if (token) {
        // 保存token
        TokenManager.saveToken(token);

        // 清除相关缓存
        qc.invalidateQueries({ queryKey: ["currentUser"] });
        qc.invalidateQueries({ queryKey: ["currentUserRole"] });

        ElMessage.success("登录成功");

        // 登录成功后尝试绑定微信
        await tryBindWechat();

        // 跳转到首页
        await router.push("/");
      } else {
        ElMessage.error("登录失败：未获取到token");
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.msg || error?.message || "登录失败";
      ElMessage.error(message);
      isSubmitting.value = false;
    },
    onSettled: () => {
      isSubmitting.value = false;
    },
  });

  // 尝试绑定微信
  const tryBindWechat = async () => {
    try {
      // 获取微信登录凭证
      const code = await getWechatCode();
      if (code) {
        await api.wx.postWx({ code });
        ElMessage.success("微信绑定成功");
        // 清除用户信息缓存以更新微信绑定状态
        qc.invalidateQueries({ queryKey: ["currentUser"] });
      }
    } catch (error) {
      // 微信绑定失败不影响登录流程
      console.log("微信绑定失败，但不影响正常登录:", error);
    }
  };

  // 获取微信登录凭证
  const getWechatCode = async (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (typeof wx !== 'undefined' && wx.login) {
        wx.login({
          success: (res) => {
            if (res.code) {
              resolve(res.code);
            } else {
              resolve(null);
            }
          },
          fail: () => {
            resolve(null);
          },
        });
      } else {
        // 如果不在微信环境中，返回null
        resolve(null);
      }
    });
  };

  const handleLogin = async () => {
    if (!formData.value.number || !formData.value.password) {
      ElMessage.warning("请填写工号和密码");
      return;
    }

    isSubmitting.value = true;
    loginMutation.mutate(formData.value);
  };

  const resetForm = () => {
    formData.value = {
      number: "",
      password: "",
    };
  };

  return {
    formData,
    isSubmitting,
    handleLogin,
    resetForm,
  };
}