<script setup lang="ts">
import OptionCard from "@/components/OptionCard.vue";
import { useRouter } from "vue-router";
import { hasRole, Role } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
import { onMounted } from "vue";
import { isMobile } from "@/hooks/isMobile";
import { ROUTE_PATHS } from "@/router/constants";
const router = useRouter();
const { role: currentUserRole } = useCurrentUserRole();
onMounted(() => {
  if (!isMobile.value) {
    router.push(ROUTE_PATHS.ADMIN_APPROVALS);
  }
});
</script>

<template>
    <el-card shadow="never">
      <el-result icon="info" title="欢迎进入管理端" />
    </el-card>
    <OptionCard title="待审批" @click="router.push(ROUTE_PATHS.ADMIN_APPROVALS)" />
    <OptionCard title="申请管理" @click="router.push(ROUTE_PATHS.ADMIN_REQUESTS)" />
    <OptionCard title="返回用户首页" @click="router.push(ROUTE_PATHS.COMMON)" />
    <OptionCard title="审核员管理" @click="router.push(ROUTE_PATHS.ADMIN_ADMINS)" v-if="hasRole(currentUserRole, [Role.ADMIN])" />
</template>


