<script setup lang="ts">
import OptionCard from "@/components/OptionCard.vue";
import BottomNav from "@/components/BottomNav.vue";
import { useRouter } from "vue-router";
import { hasRole, Role } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
const router = useRouter();
const { role: currentUserRole } = useCurrentUserRole();

</script>

<template>
  <h2 style="text-align: center">广工实验教学部教职工请假系统</h2>
  <el-space direction="vertical" :size="16" :style="{ width: '100%' }" fill>
    <OptionCard title="去请假" @click="router.push('/form')" />
    <OptionCard
      v-if="hasRole(currentUserRole, [Role.CENTER_DIRECTOR, Role.DEPUTY_DIRECTOR, Role.DEPARTMENT_DIRECTOR, Role.ADMIN])"
      title="管理员入口"
      @click="router.push('/admin')"
    />
  </el-space>
  <BottomNav />
</template>
