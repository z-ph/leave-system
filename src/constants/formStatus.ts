export enum FormStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export function getFormStatusLabel(status?: number): string {
  if (status === FormStatus.Approved) return "已通过";
  if (status === FormStatus.Rejected) return "已拒绝";
  return "未审批";
}

export function getFormStatusTagType(status?: number): "success" | "warning" | "danger" | "info" {
  if (status === FormStatus.Approved) return "success";
  if (status === FormStatus.Rejected) return "danger";
  return "warning";
}


