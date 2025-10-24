<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { hasRole, Role } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
const { data: currentUserRole } = useCurrentUserRole();
const route = useRoute();
const active = computed(() => route.path);
</script>

<template>
  <el-container :style="{ minHeight: '100vh' }">
    <el-aside>
      <el-menu :default-active="active" router :style="{height: '100%'}">
        <el-menu-item index="/admin/dashboard">仪表盘</el-menu-item>
        <el-menu-item index="/admin/approvals">待审批</el-menu-item>
        <el-menu-item index="/admin/requests">申请管理</el-menu-item>
        <el-menu-item index="/">返回首页</el-menu-item>
        <el-menu-item index="/admin/admins" v-if="hasRole(currentUserRole, [Role.SuperAdmin])">审核员管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/admin/dashboard">管理端</el-breadcrumb-item>
          <el-breadcrumb-item>{{ route.meta?.pageTitle ?? '' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>


