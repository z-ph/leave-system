<script setup lang="ts" `>
import { onMounted } from "vue";
import { TokenManager } from "../auth/tokenManager";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
  const TEST_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjozLCJvcGVuaWQiOiJvZ2lTa3Z0dmRZamxOalhZYnNSRl9IOGhoNEpnIiwidXNlcm5hbWUiOiLmnKrnn6XnlKjmiLciLCJyb2xlIjoxfSwiZXhwIjoxMDQwMTIxMzM1MX0.yk1gR3Q_HI3EEloEOq9jVjFdTuRUZIMDv25h1_HK_yg";
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
