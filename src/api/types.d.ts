// 重新导出API类型，避免直接引用@ts-nocheck文件
export interface LoginDTO {
  number?: string;
  password?: string;
}

export interface ResultString {
  code?: number;
  msg?: string;
  data?: string;
}

export interface ResetPasswordDTO {
  userId: number;
  newPassword?: string;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResultBoolean {
  code?: number;
  msg?: string;
  data?: boolean;
}

export interface UpdateUserDTO {
  username?: string;
  phone?: string;
  center?: string;
  number?: string;
}

export interface UserInfoDTO {
  username?: string;
  role?: string;
  center?: string;
  phone?: string;
  number?: string;
  pageNum?: number;
  pageSize?: number;
}

export interface ResultPageUserVo {
  code?: number;
  msg?: string;
  data?: PageUserVo;
}

export interface PageUserVo {
  records?: UserVo[];
  total?: number;
  size?: number;
  current?: number;
  orders?: OrderItem[];
  optimizeCountSql?: boolean;
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  maxLimit?: number;
  countId?: string;
}

export interface OrderItem {
  column?: string;
  asc?: boolean;
}

export interface UserVo {
  id?: number;
  openid?: string;
  username?: string;
  role?: string;
  phone?: string;
  center?: string;
  number?: string;
}

export interface FromDTO {
  id?: number;
  center?: string;
  phone?: string;
  type?: string;
  status?: number;
  startTime?: string;
  endTime?: string;
  createTime?: string;
  reason?: string;
  day?: number;
  userId?: number;
  userName?: string;
  adminId?: number;
  adminName?: string;
  remark?: string;
}

export interface PageFromDTO {
  records?: FromDTO[];
  total?: number;
  size?: number;
  current?: number;
  orders?: OrderItem[];
  optimizeCountSql?: boolean;
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  maxLimit?: number;
  countId?: string;
}

export interface ApproveDTO {
  formID?: number;
  status?: boolean;
  remark?: string;
}

export interface FromVo {
  id?: number;
  type?: string;
  status?: number;
  startTime?: string;
  endTime?: string;
  reason?: string;
  day?: number;
}

export interface ResultUserVo {
  code?: number;
  msg?: string;
  data?: UserVo;
}

export interface UserFromDTO {
  userId?: number;
  userName?: string;
  status?: number;
  type?: string;
  center?: string;
  pageNum?: number;
  pageSize?: number;
}

export interface ResultPageFromDTO {
  code?: number;
  msg?: string;
  data?: PageFromDTO;
}

export interface ResultListUserVo {
  code?: number;
  msg?: string;
  data?: UserVo[];
}