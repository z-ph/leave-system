<script setup lang="ts">
import BottomNav from "@/components/BottomNav.vue";
import { usePersonalInfo } from "./hooks/usePersonalInfo";
import OptionCard from "@/components/OptionCard.vue";
import {
  ElCard,
  ElTag,
  ElContainer,
  ElHeader,
  ElSpace,
  ElDescriptions,
  ElDescriptionsItem,
} from "element-plus";
import {
  Loading,
  User,
  Phone,
  OfficeBuilding,
  Key,
  Link,
} from "@element-plus/icons-vue";
import { ROUTE_PATHS } from "@/router/constants";
import { TokenManager } from "@/auth/tokenManager";
import { useRouter } from "vue-router";

const { formattedInfo, isLoadingUser } = usePersonalInfo();
const router = useRouter();
const handleLogout = () => {
  TokenManager.removeToken();
  TokenManager.removeTokenPayload();
  router.push(ROUTE_PATHS.LOGIN);
};
</script>

<template>
  <el-container
    style="
      padding: 16px;
      max-width: 600px;
      margin: 0 auto;
      padding-bottom: 80px;
    "
  >
    <el-header
      style="text-align: center; padding: 0; height: auto; margin-bottom: 16px"
    >
      <h2>我的信息</h2>
    </el-header>

    <!-- 个人信息卡片 -->
    <el-card style="margin-bottom: 16px" shadow="hover">
      <template #header>
        <el-space alignment="center" :size="8">
          <el-icon><User /></el-icon>
          <span style="font-weight: 600">基本信息</span>
        </el-space>
      </template>

      <el-space
        v-if="isLoadingUser"
        direction="vertical"
        alignment="center"
        :size="8"
        style="padding: 40px 0; color: #909399"
      >
        <el-icon style="font-size: 24px; animation: rotate 2s linear infinite"
          ><Loading
        /></el-icon>
        <span>加载中...</span>
      </el-space>

      <el-descriptions
        v-else-if="formattedInfo"
        :column="1"
        :size="'large'"
        border
      >
        <el-descriptions-item label="姓名">
          <el-space alignment="center" :size="8">
            <el-icon><User /></el-icon>
            <span style="font-weight: 600">{{ formattedInfo.username }}</span>
          </el-space>
        </el-descriptions-item>

        <el-descriptions-item label="所属中心">
          <el-space alignment="center" :size="8">
            <el-icon><OfficeBuilding /></el-icon>
            <span style="font-weight: 600">{{ formattedInfo.center }}</span>
          </el-space>
        </el-descriptions-item>

        <el-descriptions-item label="工号">
          <el-space alignment="center" :size="8">
            <el-icon><Key /></el-icon>
            <span style="font-weight: 600">{{ formattedInfo.number }}</span>
          </el-space>
        </el-descriptions-item>

        <el-descriptions-item label="手机号码">
          <el-space alignment="center" :size="8">
            <el-icon><Phone /></el-icon>
            <span style="font-weight: 600">{{ formattedInfo.phone }}</span>
          </el-space>
        </el-descriptions-item>

        <el-descriptions-item label="角色">
          <el-space alignment="center" :size="8">
            <el-icon><User /></el-icon>
            <el-tag type="info">{{ formattedInfo.role }}</el-tag>
          </el-space>
        </el-descriptions-item>

        <el-descriptions-item label="微信绑定">
          <el-space alignment="center" :size="8">
            <el-icon><Link /></el-icon>
            <el-tag :type="!formattedInfo.openid ? 'danger' : 'success'">
              {{ !formattedInfo.openid ? "未绑定" : "已绑定" }}
            </el-tag>
          </el-space>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 功能选项 -->
    <el-card style="margin-bottom: 16px" shadow="hover">
      <template #header>
        <el-space alignment="center" :size="8">
          <span style="font-weight: 600">功能选项</span>
        </el-space>
      </template>

      <el-space direction="vertical" :size="16" fill :style="{ width: '100%' }">

        <!-- 修改密码 -->
        <OptionCard
          title="修改密码"
          @click="$router.push(ROUTE_PATHS.CHANGE_PASSWORD)"
        />
        <!-- 退出登录 -->
        <OptionCard
          title="退出登录"
          @click="handleLogout"
        />
      </el-space>
    </el-card>

    <BottomNav />
  </el-container>
</template>

<style scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .my-page {
    padding: 12px;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .info-label {
    min-width: auto;
  }

  .info-value {
    text-align: left;
    width: 100%;
  }
}
</style>
