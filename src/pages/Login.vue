<script setup lang="ts">
import { useLogin, useWeCode } from "./hooks/useWechatOAuth";
import { ref, onMounted ,onBeforeUnmount} from "vue";
const { refreshCode } = useWeCode();
useLogin();
const showRefreshButton = ref(false);
const timer = ref<number | null>(null);
onBeforeUnmount(() => {
  if (timer.value) {
    window.clearTimeout(timer.value);
  }
});
onMounted(() => {
  timer.value = window.setTimeout(() => {
    showRefreshButton.value = true;
  }, 5000);
});
</script>

<template>
  <div style="width: 100vw; height: 100vh">
    <el-skeleton :rows="5" animated />
    <!-- 5s后显示刷新按钮 -->
     <p style="text-align: center;margin-top: 20px;">等待太久了？点击刷新</p>
    <el-button @click="refreshCode" v-show="showRefreshButton">Refresh Code</el-button>
  </div>
</template>
