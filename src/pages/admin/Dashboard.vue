<script setup lang="ts">
import OptionCard from "@/components/OptionCard.vue";
import { useRouter } from "vue-router";
import { hasRole, Role } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
const router = useRouter();
const { data: currentUserRole } = useCurrentUserRole();
</script>

<template>
    <el-card shadow="never">
      <el-result icon="info" title="欢迎进入管理端" />
    </el-card>
    <OptionCard title="待审批" @click="router.push('/admin/approvals')" />
    <OptionCard title="申请管理" @click="router.push('/admin/requests')" />
    <OptionCard title="返回用户首页" @click="router.push('/')" />
    <OptionCard title="审核员管理" @click="router.push('/admin/admins')" v-if="hasRole(currentUserRole, [Role.SuperAdmin])" />
</template>


