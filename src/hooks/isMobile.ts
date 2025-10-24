import { computed } from "vue";

export const isMobile = computed(() => window.innerWidth < 768);