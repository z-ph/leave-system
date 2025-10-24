import type { Role } from "@/auth/roles";
declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    roles?: Role[];
    pageTitle?: string;
  }
}


