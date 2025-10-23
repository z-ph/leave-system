<script setup lang="ts">
import OptionCard from "../components/OptionCard.vue";
import BottomNav from "../components/BottomNav.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const gotoForm = () => {
  router.push("/form");
};
</script>

<template>
  <h2 style="text-align: center">广工实验教学部教职工请假系统</h2>
  <OptionCard title="去请假" @click="gotoForm" />
  <BottomNav />
</template>
