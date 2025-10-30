import type { UserVo } from '@/api/axios/Api';
export interface UserInfo extends UserVo {
  /** 用户ID */
  id: number;
  /** 微信openid */
  openid: string;
  /** 用户名 */
  username: string;
  /** 角色 */
  role: string;
  /** 手机 */
  phone: string;
  /** 申请中心 */
  center: string;
  /** 工号 */
  number: string;
} 