<script setup lang="ts">
import OptionCard from "@/components/OptionCard.vue";
import BottomNav from "@/components/BottomNav.vue";
import { useRouter } from "vue-router";
import { hasRole, Role } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
const router = useRouter();
const { data: currentUserRole } = useCurrentUserRole();
</script>

<template>
  <h2 style="text-align: center">广工实验教学部教职工请假系统</h2>
  <OptionCard title="去请假" @click="router.push('/form')">
  </OptionCard>
  <!-- 管理员入口 -->
  <OptionCard v-if="hasRole(currentUserRole, [Role.Auditor, Role.SuperAdmin])" title="管理员入口" @click="router.push('/admin')">
  </OptionCard>
  <BottomNav />
</template>
