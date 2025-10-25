import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { getCurrentUserRole } from "./userSession";
import { Role, isApproverRole, isAdminRole, isEmployeeRole, getRoleLevel, ROLE_NAMES } from "./roles";

export function useCurrentUserRole() {
  const { data: role } = useQuery<Role>({
    queryKey: ["currentUserRole"],
    queryFn: getCurrentUserRole,
  });

  // 计算属性：权限判断
  const isEmployee = computed(() => isEmployeeRole(role.value));
  const isApprover = computed(() => isApproverRole(role.value));
  const isAdmin = computed(() => isAdminRole(role.value));

  // 具体角色判断
  const isCenterDirector = computed(() => role.value === Role.CENTER_DIRECTOR);
  const isDeputyDirector = computed(() => role.value === Role.DEPUTY_DIRECTOR);
  const isDepartmentDirector = computed(() => role.value === Role.DEPARTMENT_DIRECTOR);

  // 角色层级
  const roleLevel = computed(() => getRoleLevel(role.value));
  const roleName = computed(() => role.value !== undefined ? ROLE_NAMES[role.value] : '未知角色');

  // 审批权限判断
  const canApprove1Day = computed(() => role.value === Role.CENTER_DIRECTOR);
  const canApprove2Days = computed(() => role.value === Role.DEPUTY_DIRECTOR);
  const canApprove4Days = computed(() => role.value === Role.DEPARTMENT_DIRECTOR);
  const hasAnyApprovalPermission = computed(() => isApprover.value);

  return {
    role,
    roleLevel,
    roleName,
    isEmployee,
    isApprover,
    isAdmin,
    isCenterDirector,
    isDeputyDirector,
    isDepartmentDirector,
    canApprove1Day,
    canApprove2Days,
    canApprove4Days,
    hasAnyApprovalPermission,
  };
}


