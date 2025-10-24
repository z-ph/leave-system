<script setup lang="ts">
import OptionCard from "@/components/OptionCard.vue";
import BottomNav from "@/components/BottomNav.vue";
import { useRouter } from "vue-router";
import { hasRole, Role } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
import { useUserInfo, useUpdateUsername } from "./hooks/useUserInfo";
import { ElMessageBox } from "element-plus";
import {  watch } from "vue";
const router = useRouter();
const { data: currentUserRole } = useCurrentUserRole();
const { data: userInfo } = useUserInfo();
const { mutate: updateUsername } = useUpdateUsername();
watch(userInfo,(newVal)=>{
  // 检测到用户名为空时，弹出修改框，提示用户输入用户名
  if (newVal?.username==='未知用户') {
    ElMessageBox.prompt("请输入您的姓名", "第一次登录注册", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      inputValue: userInfo.value?.username ?? "",
      inputPlaceholder: "用户名",
    }).then(({ value }) => {
      updateUsername(value);
    });
  }
})
</script>

<template>
  <h2 style="text-align: center">广工实验教学部教职工请假系统</h2>
  <el-space direction="vertical" :size="16" :style="{ width: '100%' }" fill>
    <OptionCard title="去请假" @click="router.push('/form')" />
    <OptionCard
      v-if="hasRole(currentUserRole, [Role.Auditor, Role.SuperAdmin])"
      title="管理员入口"
      @click="router.push('/admin')"
    />
  </el-space>
  <BottomNav />
</template>
