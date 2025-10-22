<script setup lang="ts">
import { useLogin } from "./hooks/useWechatOAuth";
useLogin();
</script>

<template>
  <div style="width: 100vw; height: 100vh">
    <el-skeleton :rows="5" animated />
  </div>
</template>
