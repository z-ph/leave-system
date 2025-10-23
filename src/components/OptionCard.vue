<template>
  <el-card @click="emit('click')" :style="{ cursor: 'pointer' }" shadow="hover">
    <el-space :style="{ width: '100%', justifyContent: 'space-between' }" >
      <span><slot name="title">{{ props.title }}</slot></span>
      <el-icon>
        <ArrowRight />
      </el-icon>
    </el-space>
  </el-card>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
const props = defineProps<{
  title: string;
}>();
const emit = defineEmits(["click"]);
</script>