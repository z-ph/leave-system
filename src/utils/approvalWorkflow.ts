import type { FromVo } from "@/api/axios/Api";

/**
 * 请假申请状态枚举
 */
export enum LeaveStatus {
  PENDING = 0,           // 待审批
  APPROVED = 1,         // 已通过
  REJECTED = 2,         // 已拒绝
  CENTER_DIRECTOR_APPROVED = 3,  // 中心主任已审批
  DEPUTY_DIRECTOR_APPROVED = 4,  // 分管副主任已审批
  FULLY_APPROVED = 5,   // 完全通过（所有层级都审批完成）
}

/**
 * 审批层级定义
 */
export interface ApprovalLevel {
  level: number;
  name: string;
  role: number; // 对应的角色枚举值
  required: boolean; // 是否必需审批
}

/**
 * 根据请假天数获取需要的审批层级
 * @param days 请假天数
 * @returns 需要的审批层级数组
 */
export function getRequiredApprovalLevels(days: number): ApprovalLevel[] {
  if (days <= 0) {
    throw new Error("请假天数必须大于0");
  }

  if (days === 1) {
    // 1天：只需要中心主任审批
    return [
      {
        level: 1,
        name: "中心主任审批",
        role: 1, // Role.CENTER_DIRECTOR
        required: true
      }
    ];
  } else if (days <= 3) {
    // 2-3天：中心主任 + 分管副主任
    return [
      {
        level: 1,
        name: "中心主任审批",
        role: 1, // Role.CENTER_DIRECTOR
        required: true
      },
      {
        level: 2,
        name: "分管副主任审批",
        role: 2, // Role.DEPUTY_DIRECTOR
        required: true
      }
    ];
  } else {
    // 4天以上：中心主任 + 分管副主任 + 部门正职
    return [
      {
        level: 1,
        name: "中心主任审批",
        role: 1, // Role.CENTER_DIRECTOR
        required: true
      },
      {
        level: 2,
        name: "分管副主任审批",
        role: 2, // Role.DEPUTY_DIRECTOR
        required: true
      },
      {
        level: 3,
        name: "部门正职审批",
        role: 3, // Role.DEPARTMENT_DIRECTOR
        required: true
      }
    ];
  }
}

/**
 * 获取下一个需要的审批角色
 * @param leaveRequest 请假申请
 * @param currentRole 当前用户角色
 * @returns 下一个审批角色，如果无需审批则返回null
 */
export function getNextApprovalRole(
  leaveRequest: FromVo,
  currentRole: number
): ApprovalLevel | null {
  const days = leaveRequest.day ?? 0;
  const requiredLevels = getRequiredApprovalLevels(days);

  // 根据当前状态判断已完成的审批层级
  let currentLevel = 0;
  switch (leaveRequest.status) {
    case LeaveStatus.CENTER_DIRECTOR_APPROVED:
      currentLevel = 1;
      break;
    case LeaveStatus.DEPUTY_DIRECTOR_APPROVED:
      currentLevel = 2;
      break;
    case LeaveStatus.FULLY_APPROVED:
    case LeaveStatus.APPROVED:
      currentLevel = requiredLevels.length;
      break;
    case LeaveStatus.REJECTED:
      return null; // 已拒绝，无需继续审批
    default:
      currentLevel = 0;
      break;
  }

  // 查找下一个需要审批的层级
  const nextLevel = requiredLevels.find(level =>
    level.level === currentLevel + 1 && level.role === currentRole
  );

  return nextLevel ?? null;
}

/**
 * 检查用户是否可以审批该申请
 * @param leaveRequest 请假申请
 * @param userRole 用户角色
 * @returns 是否可以审批
 */
export function canUserApprove(leaveRequest: FromVo, userRole: number): boolean {
  const nextRole = getNextApprovalRole(leaveRequest, userRole);
  return nextRole !== null;
}

/**
 * 审批申请后的状态更新
 * @param currentStatus 当前状态
 * @param days 请假天数
 * @param isApproved 是否批准
 * @returns 新的状态
 */
export function getUpdatedStatus(
  currentStatus: number,
  days: number,
  isApproved: boolean
): LeaveStatus {
  if (!isApproved) {
    return LeaveStatus.REJECTED;
  }

  const requiredLevels = getRequiredApprovalLevels(days);

  switch (currentStatus) {
    case LeaveStatus.PENDING:
      if (requiredLevels.length === 1) {
        return LeaveStatus.APPROVED; // 只需要一级审批
      }
      return LeaveStatus.CENTER_DIRECTOR_APPROVED;

    case LeaveStatus.CENTER_DIRECTOR_APPROVED:
      if (requiredLevels.length === 2) {
        return LeaveStatus.APPROVED; // 两级审批完成
      }
      return LeaveStatus.DEPUTY_DIRECTOR_APPROVED;

    case LeaveStatus.DEPUTY_DIRECTOR_APPROVED:
      return LeaveStatus.APPROVED; // 三级审批完成

    default:
      return LeaveStatus.APPROVED;
  }
}

/**
 * 审批进度信息接口
 */
export interface ApprovalProgress {
  total: number;
  completed: number;
  percentage: number;
  currentStatus: string;
  requiredLevels: ApprovalLevel[];
}

/**
 * 获取申请的审批进度信息
 * @param leaveRequest 请假申请
 * @returns 审批进度信息
 */
export function getApprovalProgress(leaveRequest: FromVo): ApprovalProgress {
  const days = leaveRequest.day ?? 0;
  const requiredLevels = getRequiredApprovalLevels(days);

  let completedLevels = 0;
  let currentStatusText = "待审批";

  switch (leaveRequest.status) {
    case LeaveStatus.APPROVED:
    case LeaveStatus.FULLY_APPROVED:
      completedLevels = requiredLevels.length;
      currentStatusText = "已通过";
      break;
    case LeaveStatus.REJECTED:
      currentStatusText = "已拒绝";
      break;
    case LeaveStatus.CENTER_DIRECTOR_APPROVED:
      completedLevels = 1;
      currentStatusText = "等待副主任审批";
      break;
    case LeaveStatus.DEPUTY_DIRECTOR_APPROVED:
      completedLevels = 2;
      currentStatusText = "等待部门正职审批";
      break;
    default:
      currentStatusText = "等待中心主任审批";
      break;
  }

  return {
    total: requiredLevels.length,
    completed: completedLevels,
    percentage: requiredLevels.length > 0 ? (completedLevels / requiredLevels.length) * 100 : 0,
    currentStatus: currentStatusText,
    requiredLevels: requiredLevels
  };
}