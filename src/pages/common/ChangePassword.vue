<script setup lang="ts">
import NavLayout from "@/components/NavLayout.vue";
import { useChangePassword } from "./hooks/usePersonalInfo";
const { form, mutate: changePassword, isPending: isChangingPassword } = useChangePassword();
</script>
<template>
<nav-layout title="修改密码">
    <el-card>
        <el-form >
            <el-form-item label="旧密码">
                <el-input v-model="form.oldPassword" placeholder="请输入旧密码" type="password" show-password/>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="form.newPassword" placeholder="请输入新密码" type="password" show-password/>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="form.confirmPassword" placeholder="请输入确认密码" type="password" show-password/>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="changePassword()" :loading="isChangingPassword">修改密码</el-button>
    </el-card>
</nav-layout>
</template>