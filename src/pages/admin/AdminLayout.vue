<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { hasRole, Role } from "@/auth/roles";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
const { role: currentUserRole } = useCurrentUserRole();
const route = useRoute();
const router = useRouter();
const active = computed(() => route.path);
import { isMobile } from "@/hooks/isMobile";
const windowWidth = ref<number>(
  typeof window !== "undefined" ? window.innerWidth : 1024
);

function handleResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <el-container :style="{ minHeight: '100vh' }">
    <el-aside v-if="!isMobile" :style="{ width: '15%', minHeight: '100vh' }">
      <el-menu :default-active="active" router :style="{ height: '100%' }">
        <el-menu-item index="/admin/approvals">我的待审批</el-menu-item>
        <el-menu-item index="/admin/requests">所有申请记录</el-menu-item>
        <el-menu-item index="/" :style="{color:'red'}">返回用户首页</el-menu-item>
        <el-menu-item
          index="/admin/admins"
          v-if="hasRole(currentUserRole, [Role.ADMIN])"
          >审核员管理</el-menu-item
        >
      </el-menu>
    </el-aside>
    <el-container>
      <el-button
        v-if="isMobile"
        @click="router.push('/admin/dashboard')"
        :style="{ marginBottom: '10px' }"
        >返回管理首页</el-button
      >
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/admin/dashboard">管理端</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            route.meta?.pageTitle ?? ""
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
