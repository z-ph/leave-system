<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

function go(path: string) {
  if (route.path !== path) router.push(path);
}

const activePath = computed(() => route.path);
</script>

<template>
  <el-affix :offset="0" :style="{ zIndex: 1000 }">
    <el-menu
      mode="horizontal"
      :ellipsis="false"
      :default-active="activePath"
      :style="{
        display: 'flex',
        justifyContent: 'space-around',
        position: 'fixed',
        left: '0',
        right: '0',
        bottom: '0',
      }"
      @select="(index: string) => go(index)"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/my">我的</el-menu-item>
    </el-menu>
  </el-affix>
  
</template>


