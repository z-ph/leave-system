import {jwtDecode, type JwtPayload} from 'jwt-decode';

// 自定义JWT payload类型
interface CustomJwtPayload extends JwtPayload {
  userId?: number;
  username?: string;
  role?: number;
  center?: string;
  // 其他可能的用户信息字段
}

export class TokenManager {
  //存储在localStorage中 'token'
  static KEY = "leaveSystemToken";
  static PAYLOAD_KEY = "leaveSystemTokenPayload";
  static setToken(token: string) {
    localStorage.setItem(this.KEY, token);
  }
  static getToken() {
    return localStorage.getItem(this.KEY);
  }
  static removeToken() {
    localStorage.removeItem(this.KEY);
  }
  static getTokenExpireTime() {
    const token = this.getToken();
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.exp;
  }
  static isTokenExpired() {
    const expireTime = this.getTokenExpireTime();
    if (!expireTime) return true;
    return expireTime < Date.now() / 1000;
  }
  static getTokenPayload(): CustomJwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode(token);
  }
  static setTokenPayload(payload: CustomJwtPayload) {
    localStorage.setItem(this.PAYLOAD_KEY, JSON.stringify(payload));
  }
  static removeTokenPayload() {
    localStorage.removeItem(this.PAYLOAD_KEY);
  }
  static isAuthed() {
    return this.getToken() && !this.isTokenExpired();
  }
}
