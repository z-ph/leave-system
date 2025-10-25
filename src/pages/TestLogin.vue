<script setup lang="ts">
import { onMounted } from "vue";
import { TokenManager } from "@/auth/tokenManager";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
import { ROUTE_PATHS } from "@/router/constants";

const router = useRouter();
const { role: currentUserRole } = useCurrentUserRole();

onMounted(async () => {
  const TEST_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvZ2lTa3Z0dmRZamxOalhZYnNSRl9IOGhoNEpnIiwiZXhwIjoxNzYzODc3ODIwfQ.E52WE0EPJcVmd5aWGWlXCMG5_j8cGEqNeYf6mvfoXxk";

  TokenManager.setToken(TEST_TOKEN);
  TokenManager.setTokenPayload(jwtDecode(TEST_TOKEN));

  // 等待角色信息加载，然后直接跳转到目标页面
  await new Promise(resolve => setTimeout(resolve, 100)); // 短暂等待确保状态更新

  const role = currentUserRole.value;
  const targetRoute = role && role >= 1 ? ROUTE_PATHS.ADMIN : ROUTE_PATHS.COMMON;

  // 使用replace而不是push，避免历史记录中的循环
  await router.replace(targetRoute);
});
</script>
<template>
  <div style="width: 100vw; height: 100vh">
    <el-skeleton :rows="5" animated />
  </div>
</template>
