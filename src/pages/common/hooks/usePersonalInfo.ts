import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { api } from "@/api/axios";
import { ROLE_NAMES } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";

export function usePersonalInfo() {
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await api.my.getMy();
      return res.data.data;
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
      username: user.username || '未知',
      role: user.role || '未知',
      roleName: currentRoleName.value || '未知角色',
      phone: user.phone || '未设置',
      center: user.center || '未设置',
      number: user.number || '未设置',
      openid: user.openid,
      hasWechatBound: !!user.openid,
    };
  });

  // 检查是否有微信绑定
  const isWechatBound = computed(() => {
    return !!currentUser.value?.openid;
  });

  // 获取微信绑定状态文本
  const wechatBindStatus = computed(() => {
    return isWechatBound.value ? '已绑定' : '未绑定';
  });

  // 获取微信绑定状态类型
  const wechatBindStatusType = computed(() => {
    return isWechatBound.value ? 'success' : 'warning';
  });

  return {
    currentUser,
    formattedInfo,
    isLoadingUser,
    isWechatBound,
    wechatBindStatus,
    wechatBindStatusType,
  };
}