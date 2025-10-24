<script setup lang="ts">
import BottomNav from "@/components/BottomNav.vue";
import { useUserInfo, useUpdateUsername } from "./hooks/useUserInfo";
import OptionCard from "@/components/OptionCard.vue";
import { ElMessageBox } from "element-plus";
const { data: userInfo } = useUserInfo();
const { mutateAsync: updateUsername, isPending: isUpdatingUsername } = useUpdateUsername();
function handleChangeUsername() {
  // pop up a dialog to change username
  ElMessageBox.prompt("请输入新用户名", "修改用户名", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputValue: userInfo.value?.username ?? "",
    inputPlaceholder: "用户名",
  }).then(async ({ value }) => {
    if (!value || value.trim().length === 0) return;
    await updateUsername(value.trim());
  }).catch(() => {});
}
</script>

<template>
  <h2 style="text-align: center">我的信息</h2>
  <el-form :model="userInfo" label-width="100px">
    <el-form-item label="用户名">
      <el-input :value="userInfo?.username" :loading="isUpdatingUsername" />
    </el-form-item>
  </el-form>
<el-space direction="vertical" :size="16" :style="{ width: '100%' }" fill>
  <OptionCard title="修改用户名" @click="handleChangeUsername" />
  <OptionCard title="查看请假记录" @click="$router.push('/leave-list')" />
</el-space>
  <BottomNav />
</template>
