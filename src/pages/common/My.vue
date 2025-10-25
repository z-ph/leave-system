<script setup lang="ts">
import BottomNav from "@/components/BottomNav.vue";
import { useUserInfo, useUpdateUsername } from "./hooks/useUserInfo";
import { usePersonalInfo } from "./hooks/usePersonalInfo";
import OptionCard from "@/components/OptionCard.vue";
import { ElMessageBox, ElCard, ElTag } from "element-plus";
import { Loading, User, Phone, OfficeBuilding, Key, Link } from "@element-plus/icons-vue";

const { data: userInfo } = useUserInfo();
const {
  formattedInfo,
  isLoadingUser,
  wechatBindStatus,
  wechatBindStatusType
} = usePersonalInfo();

const { mutateAsync: updateUsername } = useUpdateUsername();

function handleChangeUsername() {
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
  <div class="my-page">
    <h2 style="text-align: center">我的信息</h2>

    <!-- 个人信息卡片 -->
    <el-card class="info-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <el-icon><User /></el-icon>
          <span>基本信息</span>
        </div>
      </template>

      <div v-if="isLoadingUser" class="loading-container">
        <el-icon class="loading-icon"><Loading /></el-icon>
        <span>加载中...</span>
      </div>

      <div v-else-if="formattedInfo" class="info-grid">
        <div class="info-item">
          <div class="info-label">
            <el-icon><User /></el-icon>
            <span>姓名</span>
          </div>
          <div class="info-value">{{ formattedInfo.username }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <el-icon><OfficeBuilding /></el-icon>
            <span>所属中心</span>
          </div>
          <div class="info-value">{{ formattedInfo.center }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <el-icon><Key /></el-icon>
            <span>工号</span>
          </div>
          <div class="info-value">{{ formattedInfo.number }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <el-icon><Phone /></el-icon>
            <span>手机号码</span>
          </div>
          <div class="info-value">{{ formattedInfo.phone }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <el-icon><User /></el-icon>
            <span>角色</span>
          </div>
          <div class="info-value">
            <el-tag type="info">{{ formattedInfo.roleName }}</el-tag>
          </div>
        </div>

        <div class="info-item">
          <div class="info-label">
            <el-icon><Link /></el-icon>
            <span>微信绑定</span>
          </div>
          <div class="info-value">
            <el-tag :type="wechatBindStatusType">
              {{ wechatBindStatus }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 功能选项 -->
    <el-card class="options-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>功能选项</span>
        </div>
      </template>

      <el-space direction="vertical" :size="16" :style="{ width: '100%' }" fill>
        <OptionCard title="修改用户名" @click="handleChangeUsername" />
        <OptionCard title="查看请假记录" @click="$router.push('/leave-list')" />
      </el-space>
    </el-card>

    <BottomNav />
  </div>
</template>

<style scoped>
.my-page {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 80px; /* 为底部导航留空间 */
}

.info-card, .options-card {
  margin-bottom: 16px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: #909399;
}

.loading-icon {
  font-size: 24px;
  margin-bottom: 8px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.info-grid {
  display: grid;
  gap: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  font-weight: 500;
  min-width: 100px;
}

.info-value {
  color: #303133;
  font-weight: 600;
  text-align: right;
  flex: 1;
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
