import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
import { Role } from "@/auth/roles";

export function useAutoRedirect() {
  const router = useRouter();
  const { isEmployee, isApprover, isAdmin } = useCurrentUserRole();

  // 定义不同角色的默认路由
  const defaultRoutes = {
    [Role.EMPLOYEE]: '/common',
    [Role.CENTER_DIRECTOR]: '/admin',
    [Role.DEPUTY_DIRECTOR]: '/admin',
    [Role.DEPARTMENT_DIRECTOR]: '/admin',
    [Role.ADMIN]: '/admin',
  } as const;

  // 获取当前角色对应的默认路���
  const getDefaultRoute = computed(() => {
    const { role } = useCurrentUserRole();
    return role.value !== undefined ? defaultRoutes[role.value] : '/common';
  });

  // 检查是否需要重定向
  const shouldRedirect = computed(() => {
    const currentPath = router.currentRoute.value.path;
    const defaultRoute = getDefaultRoute.value;

    // 如果当前路径是登录页或根路径，需要重定向
    if (currentPath === '/login' || currentPath === '/') {
      return true;
    }

    // 如果用户是管理员但在普通页面，需要重定向
    if ((isApprover.value || isAdmin.value) && currentPath.startsWith('/common')) {
      return true;
    }

    // 如果普通用户在管理员页面，需要重定向
    if (isEmployee.value && currentPath.startsWith('/admin')) {
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
      await router.replace('/common');
    }
  };

  // 根据角色判断首页路径
  const getHomePath = () => {
    if (isAdmin.value || isApprover.value) {
      return '/admin';
    }
    return '/common';
  };

  // 检查当前路径是否为管理员页面
  const isAdminPath = (path: string) => {
    return path.startsWith('/admin');
  };

  // 检查当前路径是否为用户页面
  const isUserPath = (path: string) => {
    return path.startsWith('/common');
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