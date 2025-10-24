<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <el-result icon="warning" title="403 无权限" sub-title="您没有权限访问此页面">
    <template #extra>
      <el-space>
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
        <el-button @click="router.back()">返回上一页</el-button>
      </el-space>
    </template>
  </el-result>
</template>


