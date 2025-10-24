<script setup lang="ts" `>
import { onMounted } from "vue";
import { TokenManager } from "@/auth/tokenManager";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
  const TEST_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvZ2lTa3Z0dmRZamxOalhZYnNSRl9IOGhoNEpnIiwiZXhwIjoxNzYzODc3ODIwfQ.E52WE0EPJcVmd5aWGWlXCMG5_j8cGEqNeYf6mvfoXxk";
  TokenManager.setToken(TEST_TOKEN);
  TokenManager.setTokenPayload(jwtDecode(TEST_TOKEN));
  router.push("/");
});
</script>
<template>
  <div style="width: 100vw; height: 100vh">
    <el-skeleton :rows="5" animated />
  </div>
</template>
