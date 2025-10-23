<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{ title?: string }>();
const router = useRouter();

function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
}
</script>

<template>
  <el-row :style="{ borderBottom: '1px solid #E0E0E0',position: 'relative' }">
    <el-button @click="goBack" :style="{ border: 'none', color: '#2c3e50' }"
      >返回</el-button
    >
    <h2
      :style="{
        fontSize: '16px',
        fontWeight: 600,
        textAlign: 'center',
        margin: 0,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }"
    >
      <slot name="title">{{ props.title ?? "" }}</slot>
    </h2>
  </el-row>

  <main>
    <slot />
  </main>
</template>
