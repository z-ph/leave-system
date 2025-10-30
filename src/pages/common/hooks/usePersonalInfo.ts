import { useMutation, useQuery } from "@tanstack/vue-query";
import { computed, reactive } from "vue";
import { api } from "@/api/axios";
import type { ChangePasswordDTO } from "@/api/axios/Api";
import { ElMessage } from "element-plus";
import { TokenManager } from "@/auth/tokenManager";

export function usePersonalInfo() {
  const { data: currentUser, isLoading: isLoadingUser, refetch } = useQuery({
    queryKey: ["currentUser",TokenManager.getTokenPayload()?.userId],
    queryFn: async () => {
      const res = await api.my.getMy();
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000, // 5分钟缓存
  });

  // 格式化的个人信息
  const formattedInfo = computed(() => {
    const user = currentUser.value;
    if (!user) return null;

    return {
      id: user.id,
      username: user.username ?? '未知',
      role: user.role ?? '未知',
      phone: user.phone ?? '未设置',
      center: user.center ?? '未设置',
      number: user.number ?? '未设置',
      openid: user.openid,
      hasWechatBound: !!user.openid,
      manageCenter: user.manageCenter,
    };
  });


  return {
    currentUser,
    formattedInfo,
    isLoadingUser,
    refetch,
  };
}
export function useChangePassword() {
  const form = reactive<ChangePasswordDTO>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }); 
  const changePasswordMutation = useMutation({
    mutationFn: () => api.changePassword.changePasswordCreate(form),
    onSuccess: () => {
      ElMessage.success({ message: "密码修改成功" });
    },
    onError: (error) => {
      ElMessage.error({ message: error.message ?? "密码修改失败" });
    },
  });
  const changePassword=()=>{
    if(form.oldPassword.trim() === ""){
      ElMessage.error({ message: "旧密码不能为空" });
      return;
    }
    if(form.newPassword.trim() === ""){
      ElMessage.error({ message: "新密码不能为空" });
      return;
    }
    if(form.confirmPassword.trim() === ""){
      ElMessage.error({ message: "确认密码不能为空" });
      return;
    }
    if(form.newPassword !== form.confirmPassword){
      ElMessage.error({ message: "新密码和确认密码不一致" });
      return;
    }
    changePasswordMutation.mutate();
  };
  return {
    form,
    ...changePasswordMutation,
    mutate: changePassword,
  };
}