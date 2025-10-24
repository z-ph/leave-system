<script setup lang="ts">
import BottomNav from "@/components/BottomNav.vue";
import { useUserInfo } from "./hooks/useUserInfo";
import OptionCard from "@/components/OptionCard.vue";
const { data: userInfo } = useUserInfo();
</script>

<template>
  <h2 style="text-align: center">我的信息</h2>
  <el-form :model="userInfo" label-width="100px">
    <el-form-item label="用户名">
      <el-input :value="userInfo?.username" />
    </el-form-item>
  </el-form>
  <OptionCard title="查看请假记录" @click="$router.push('/leave-list')" />
  <BottomNav />
</template>
