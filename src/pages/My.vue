<script setup lang="ts">
import BottomNav from "../components/BottomNav.vue";
import { useUserInfo } from "./hooks/useUserInfo";
const { data: userInfo } = useUserInfo();
</script>

<template>
  <el-table :data="[userInfo ?? { username: '' }]">
    <el-table-column label="用户名" prop="username" />
  </el-table>
  <OptionCard title="查看请假记录" />
  <BottomNav />
</template>
