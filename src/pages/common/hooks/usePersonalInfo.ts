import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { api } from "@/api/axios";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
import type { UserInfo } from "../types/user";

export function usePersonalInfo() {
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.my.getMy();
      return res.data.data as UserInfo;
    },
    staleTime: 5 * 60 * 1000, // 5分钟缓存
  });

  const { roleName: currentRoleName } = useCurrentUserRole();

  // 格式化的个人信息
  const formattedInfo = computed(() => {
    const user = currentUser.value;
    if (!user) return null;

    return {
      id: user.id,
      username: user.username ?? '未知',
      role: user.role ?? '未知',
      roleName: currentRoleName.value ?? '未知角色',
      phone: user.phone ?? '未设置',
      center: user.center ?? '未设置',
      number: user.number ?? '未设置',
      openid: user.openid,
      hasWechatBound: !!user.openid,
    };
  });


  return {
    currentUser,
    formattedInfo,
    isLoadingUser,
  };
}