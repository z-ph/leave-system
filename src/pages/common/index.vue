<script setup lang="ts">
import OptionCard from "@/components/OptionCard.vue";
import BottomNav from "@/components/BottomNav.vue";
import { useRouter } from "vue-router";
import { ROUTE_PATHS } from "@/router/constants";
import { computed } from "vue";
import { getRoleGrade, Role } from "@/constants/role";
import { TokenManager } from "@/auth/tokenManager";
import { usePersonalInfo } from "./hooks/usePersonalInfo";
import { useWatchCodeBindWechat } from "./hooks/useWechatOAuth";
const { bindWechat } = useWatchCodeBindWechat();
const router = useRouter();
const currentUserRole = TokenManager.getTokenPayload()?.role;
// 根据角色获取角色等级
const roleGrade = computed(() => getRoleGrade(currentUserRole));
const { formattedInfo, isLoadingUser } = usePersonalInfo();
const handleBindWechat = () => {
  if (formattedInfo.value?.openid) {
    return;
  }
  bindWechat();
};
const handleUnbindWechat = () => {};
</script>

<template>
  <h2 style="text-align: center">广工实验教学部教职工请假系统</h2>
  <el-space direction="vertical" :size="16" :style="{ width: '100%' }" fill>
    <OptionCard title="去请假" @click="router.push(ROUTE_PATHS.FORM)" />
    <OptionCard
      title="查看请假记录"
      @click="$router.push(ROUTE_PATHS.LEAVE_LIST)"
    />
    <!-- 绑定微信 -->
    <template v-if="!isLoadingUser && formattedInfo">
      <OptionCard
        v-if="!formattedInfo.openid"
        title="绑定微信"
        @click="handleBindWechat"
      />
      <OptionCard v-else title="解绑微信" @click="handleUnbindWechat" />
    </template>
    <OptionCard
      v-if="roleGrade > getRoleGrade(Role.normal)"
      title="管理员入口"
      @click="router.push(ROUTE_PATHS.ADMIN)"
    />
  </el-space>
  <BottomNav />
</template>
