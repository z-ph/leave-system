<script setup lang="ts">
import { useWeCode } from './hooks/useWechatOAuth';
import { ElMessage } from 'element-plus';
const { code, refreshCode } = useWeCode();
const copyCode = () => {
  if (!code.value) return;
  navigator.clipboard.writeText(code.value);
  ElMessage.success('Code copied to clipboard');
};
</script>

<template>
  <!-- <div style="width: 100vw; height: 100vh;">
    <el-skeleton :rows="5" animated />
  </div> -->
  <el-input :value="code" />
  <el-button @click="refreshCode">Refresh Code</el-button>
  <el-button @click="copyCode">copy code</el-button>
</template>
