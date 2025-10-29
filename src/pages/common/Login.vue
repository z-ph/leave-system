<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useLogin, useWeCode } from "./hooks/useWechatOAuth";
import { useAccountLogin } from "./hooks/useAccountLogin";
import { ElButton, ElForm, ElFormItem, ElInput, ElTabs, ElTabPane, ElMessage, ElIcon } from "element-plus";
import { User, Lock, Connection } from "@element-plus/icons-vue";

const { refreshCode } = useWeCode();
const { formData, isSubmitting, handleLogin, resetForm } = useAccountLogin();

// 微信登录相关
const showRefreshButton = ref(false);
const wechatLoginError = ref(false);
const timer = ref<number | null>(null);

// 登录方式切换
const activeTab = ref("wechat");

onBeforeUnmount(() => {
  if (timer.value) {
    window.clearTimeout(timer.value);
  }
});

onMounted(() => {
  timer.value = window.setTimeout(() => {
    showRefreshButton.value = true;
  }, 4000);

});
useLogin();
// 切换到账号密码登录
const switchToAccountLogin = () => {
  activeTab.value = "account";
  ElMessage.info({ message: "请使用工号和密码登录" });
};

// 微信登录重试
const handleWechatLoginRetry = () => {
  wechatLoginError.value = false;
  refreshCode();
};

// 处理账号密码登录
const handleAccountLogin = () => {
  handleLogin();
};

// Tab切换处理
const handleTabChange = (tabName: string | number) => {
  activeTab.value = String(tabName);
  if (String(tabName) === "account") {
    resetForm();
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">请假系统</h1>

      <el-tabs v-model="activeTab" @tab-change="handleTabChange" class="login-tabs">
        <!-- 微信登录 -->
        <el-tab-pane label="微信登录" name="wechat">
          <div class="wechat-login">
            <div v-if="!wechatLoginError" class="wechat-loading">
              <el-icon class="loading-icon"><Connection /></el-icon>
              <p>正在微信授权中...</p>
              <template v-if="showRefreshButton">
                <p class="refresh-text">等待太久了？</p>
                <el-button @click="handleWechatLoginRetry" size="small">
                  刷新授权
                </el-button>
              </template>
            </div>

            <div v-else class="wechat-error">
              <el-icon class="error-icon"><Connection /></el-icon>
              <p>微信授权失败</p>
              <p class="error-hint">可能是您的账号未绑定微信</p>
              <el-button @click="switchToAccountLogin" type="primary">
                使用账号密码登录
              </el-button>
              <el-button @click="handleWechatLoginRetry" size="small" style="margin-left: 10px;">
                  重试微信登录
              </el-button>
            </div>
          </div>
        </el-tab-pane>

        <!-- 账号密码登录 -->
        <el-tab-pane label="账号密码登录" name="account">
          <el-form
            :model="formData"
            class="login-form"
            @submit.prevent="handleAccountLogin"
          >
            <el-form-item>
              <el-input
                v-model="formData.number"
                placeholder="请输入工号"
                :prefix-icon="User"
                size="large"
                clearable
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="formData.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                size="large"
                show-password
                @keyup.enter="handleAccountLogin"
              />
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="isSubmitting"
                @click="handleAccountLogin"
                class="login-button"
              >
                {{ isSubmitting ? '登录中...' : '登录' }}
              </el-button>
            </el-form-item>
          </el-form>

          <div class="login-tips">
            <p>首次登录成功后将自动绑定微信</p>
            <p>绑定后可使用微信快速登录</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
  font-size: 28px;
  font-weight: 600;
}

.login-tabs {
  margin-bottom: 20px;
}

.wechat-login, .wechat-error {
  text-align: center;
  padding: 40px 20px;
}

.loading-icon {
  font-size: 48px;
  color: #409eff;
  margin-bottom: 16px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.error-icon {
  font-size: 48px;
  color: #f56c6c;
  margin-bottom: 16px;
}

.wechat-loading p, .wechat-error p {
  margin: 8px 0;
  color: #606266;
}

.refresh-text {
  color: #909399;
  font-size: 14px;
}

.error-hint {
  color: #e6a23c;
  font-size: 14px;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  font-weight: 600;
}

.login-tips {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.login-tips p {
  margin: 4px 0;
  font-size: 13px;
  color: #909399;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 20px;
  }

  .login-title {
    font-size: 24px;
  }
}
</style>
