import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
import { Role } from "@/auth/roles";
import { ROUTE_PATHS } from "@/router/constants";

export function useAutoRedirect() {
  const router = useRouter();
  const { isEmployee, isApprover, isAdmin } = useCurrentUserRole();

  // 定义不同角色的默认路由
  const defaultRoutes = {
    [Role.EMPLOYEE]: ROUTE_PATHS.COMMON,
    [Role.CENTER_DIRECTOR]: ROUTE_PATHS.ADMIN,
    [Role.DEPUTY_DIRECTOR]: ROUTE_PATHS.ADMIN,
    [Role.DEPARTMENT_DIRECTOR]: ROUTE_PATHS.ADMIN,
    [Role.ADMIN]: ROUTE_PATHS.ADMIN,
  } as const;

  // 获取当前角色对应的默认路���
  const getDefaultRoute = computed(() => {
    const { role } = useCurrentUserRole();
    return role.value !== undefined ? defaultRoutes[role.value] : ROUTE_PATHS.COMMON;
  });

  // 检查是否需要重定向
  const shouldRedirect = computed(() => {
    const currentPath = router.currentRoute.value.path;

    // 如果当前路径是登录页或根路径，需要重定向
    if (currentPath === ROUTE_PATHS.LOGIN || currentPath === ROUTE_PATHS.COMMON) {
      return true;
    }

    // 如果用户是管理员但在普通页面，需要重定向
    if ((isApprover.value || isAdmin.value) && currentPath.startsWith(ROUTE_PATHS.COMMON)) {
      return true;
    }

    // 如果普通用户在管理员页面，需要重定向
    if (isEmployee.value && currentPath.startsWith(ROUTE_PATHS.ADMIN)) {
      return true;
    }

    return false;
  });

  // 执行自动重定向
  const performAutoRedirect = async () => {
    const defaultRoute = getDefaultRoute.value;

    try {
      await router.replace(defaultRoute);
      console.log(`自动重定向到: ${defaultRoute}`);
    } catch (error) {
      console.error('自动重定向失败:', error);
      // 如果重定向失败，则到通用页面
      await router.replace(ROUTE_PATHS.COMMON);
    }
  };

  // 根据角色判断首页路径
  const getHomePath = () => {
    if (isAdmin.value || isApprover.value) {
      return ROUTE_PATHS.ADMIN;
    }
    return ROUTE_PATHS.COMMON;
  };

  // 检查当前路径是否为管理员页面
  const isAdminPath = (path: string) => {
    return path.startsWith(ROUTE_PATHS.ADMIN);
  };

  // 检查当前路径是否为用户页面
  const isUserPath = (path: string) => {
    return path.startsWith(ROUTE_PATHS.COMMON);
  };

  return {
    getDefaultRoute,
    shouldRedirect,
    performAutoRedirect,
    getHomePath,
    isAdminPath,
    isUserPath,
    isEmployee,
    isApprover,
    isAdmin,
  };
}