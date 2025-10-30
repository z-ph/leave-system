<script setup lang="ts">
import OptionCard from "@/components/OptionCard.vue";
import { useRouter } from "vue-router";
import { hasRole, Role } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
import { onMounted } from "vue";
import { isMobile } from "@/hooks/isMobile";
import { ROUTE_PATHS, PAGE_TITLES } from "@/router/constants";
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
  <OptionCard
    :title="PAGE_TITLES.APPROVALS"
    @click="router.push(ROUTE_PATHS.ADMIN_APPROVALS)"
  />
  <OptionCard
    :title="PAGE_TITLES.REQUESTS"
    @click="router.push(ROUTE_PATHS.ADMIN_REQUESTS)"
  />
  <OptionCard
    :title="PAGE_TITLES.USER_HOME"
    @click="router.push(ROUTE_PATHS.COMMON)"
  />
  <OptionCard
    :title="PAGE_TITLES.ADMINS"
    @click="router.push(ROUTE_PATHS.ADMIN_ADMINS)"
    v-if="hasRole(currentUserRole, [Role.ADMIN])"
  />
</template>
