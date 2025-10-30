<script setup lang="ts">
import { useAccountLogin } from "./hooks/useAccountLogin";
import { useWatchCodeLogin } from "./hooks/useWechatOAuth";
const { formData, mutate: handleLogin } = useAccountLogin();
const { WeiLogin } = useWatchCodeLogin();
</script>

<template>
  <el-row justify="center" align="middle" style="height: 100vh">
    <el-card :style="{ flexBasis: '90%' }">
      <el-header>
        <h2 style="text-align: center">登录</h2>
      </el-header>
      <el-form>
        <el-form-item label="工号">
          <el-input v-model="formData.number" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password" placeholder="请输入密码" type="password" show-password/>
        </el-form-item>
        <el-form-item>
          <div :style="{ lineHeight: '1.5', color: 'red' }">
            首次登录请使用帐号密码登录
          </div>
          <div :style="{ lineHeight: '1.5', color: 'red' }">
            登录成功后自动绑定微信，才可使用微信登录
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="WeiLogin()">微信登录</el-button>
          <el-button type="primary" @click="handleLogin()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>
