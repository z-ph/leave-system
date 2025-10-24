<script setup lang="ts">
import OptionCard from "@/components/OptionCard.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
    <el-card shadow="never">
      <el-result icon="info" title="欢迎进入管理端" sub-title="从左侧菜单开始你的操作" />
    </el-card>
    <OptionCard title="待审批" @click="router.push('/admin/approvals')" />
    <OptionCard title="申请管理" @click="router.push('/admin/requests')" />
    
</template>


