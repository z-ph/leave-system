/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PageUserVo {
  records?: UserVo[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  orders?: OrderItem[];
  optimizeCountSql?: boolean;
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /** @format int64 */
  maxLimit?: number;
  countId?: string;
}

export interface OrderItem {
  column?: string;
  asc?: boolean;
}

export interface UserVo {
  /** @format int64 */
  id?: number;
  /** 微信openid */
  openid?: string;
  /** 用户名 */
  username?: string;
  /** 角色 */
  role?: string;
  /** 手机 */
  phone?: string;
  /** 申请中心 */
  center?: string;
  /** 工号 */
  number?: string;
}

export interface FromDTO {
  /** @format int64 */
  id?: number;
  /** 申请中心 */
  center?: string;
  /** 电话 */
  phone?: string;
  /** 申请类型 */
  type?: string;
  /** 申请状态 */
  status?: number;
  /** 申请开始时间 */
  startTime?: string;
  /** 申请结束时间 */
  endTime?: string;
  /** 创建时间 */
  createTime?: string;
  /** 申请原因 */
  reason?: string;
  /** 申请天数 */
  day?: number;
  /**
   * 用户ID
   * @format int64
   */
  userId?: number;
  /** 用户名 */
  userName?: string;
  /**
   * 审核员ID
   * @format int64
   */
  adminId?: number;
  /** 审核员姓名 */
  adminName?: string;
  /** 审核备注 */
  remark?: string;
}

export interface PageFromDTO {
  records?: FromDTO[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  orders?: OrderItem[];
  optimizeCountSql?: boolean;
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /** @format int64 */
  maxLimit?: number;
  countId?: string;
}

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
  /**
   * 修改用户id
   * @format int64
   */
  userId: number;
  /**
   * 新密码
   * @minLength 6
   * @maxLength 20
   * @pattern ^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,20}$
   */
  newPassword?: string;
}

export interface ChangePasswordDTO {
  /** 旧密码 */
  oldPassword: string;
  /**
   * 新密码
   * @minLength 6
   * @maxLength 20
   * @pattern ^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,20}$
   */
  newPassword: string;
  /** 确认密码 */
  confirmPassword: string;
}

export interface ResultPutUserVo {
  code?: number;
  msg?: string;
  data?: PutUserVo;
}

export interface PutUserVo {
  /** @format int64 */
  id?: number;
  /** 用户名 */
  username?: string;
  /** 角色 */
  role?: string;
  /** 手机 */
  phone?: string;
  /** 申请中心 */
  center?: string;
  /** 工号 */
  number?: string;
  /** 密码 */
  password?: string;
}

export interface UserInfoDTO {
  /** 用户名 */
  username?: string;
  /** 角色 */
  role?: string;
  /** 申请中心 */
  center?: string;
  /** 手机 */
  phone?: string;
  /** 工号 */
  number?: string;
  pageNum?: number;
  pageSize?: number;
}

export interface ResultPageUserVo {
  code?: number;
  msg?: string;
  data?: PageUserVo;
}

export interface UpdateUserDTO {
  username?: string;
  phone?: string;
  center?: string;
  number?: string;
}

export interface UserFromDTO {
  /**
   * 用户ID
   * @format int64
   */
  userId?: number;
  /** 用户名 */
  userName?: string;
  /** 申请状态 */
  status?: number;
  /** 申请类型 */
  type?: string;
  /** 申请中心 */
  center?: string;
  pageNum?: number;
  pageSize?: number;
}

export interface ResultListUserVo {
  code?: number;
  msg?: string;
  data?: UserVo[];
}

export interface ResultPageFromDTO {
  code?: number;
  msg?: string;
  data?: PageFromDTO;
}

export interface ResultBoolean {
  code?: number;
  msg?: string;
  data?: boolean;
}

export interface ApproveDTO {
  /**
   * 申请ID
   * @format int64
   */
  formID?: number;
  /** 是否通过 */
  status?: boolean;
  /** 备注 */
  remark?: string;
  /**
   * 下一个审核用户id(0为最终审批)
   * @format int64
   */
  nextUserId?: number;
}

export interface FromVo {
  /** @format int64 */
  id?: number;
  /** 申请类型 */
  type?: string;
  /** 申请状态 */
  status?: number;
  /** 申请开始时间 */
  startTime?: string;
  /** 申请结束时间 */
  endTime?: string;
  /** 申请原因 */
  reason?: string;
  /** 申请天数 */
  day?: number;
}

export interface ResultUserVo {
  code?: number;
  msg?: string;
  /** com.csmht.sinin.DO.UserVo */
  data?: UserVo;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Sinin
 * @version 1.0.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name PostRoot
   * @summary 更新当前消息
   * @request POST:/
   */
  postRoot = (data: UpdateUserDTO, params: RequestParams = {}) =>
    this.request<ResultBoolean, any>({
      path: `/`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @name PutRoot
   * @summary 添加用户
   * @request PUT:/
   */
  putRoot = (data: PutUserVo, params: RequestParams = {}) =>
    this.request<ResultPutUserVo, any>({
      path: `/`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });

  login = {
    /**
     * No description
     *
     * @name LoginCreate
     * @summary 登录
     * @request POST:/login
     */
    loginCreate: (data: LoginDTO, params: RequestParams = {}) =>
      this.request<ResultString, any>({
        path: `/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  my = {
    /**
     * No description
     *
     * @name GetMy
     * @summary 获取当前登录用户信息
     * @request GET:/my
     */
    getMy: (params: RequestParams = {}) =>
      this.request<ResultUserVo, any>({
        path: `/my`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  admin = {
    /**
     * No description
     *
     * @name AdminCreate
     * @summary 修改用户角色
     * @request POST:/admin
     */
    adminCreate: (
      query: {
        /**
         * 用户id
         * @example 2
         */
        id: number;
        /**
         * 角色（中心主任 等）
         * @example "中心主任"
         */
        role: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultBoolean, any>({
        path: `/admin`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name AdminList
     * @summary 获取审核员列表
     * @request GET:/admin
     */
    adminList: (params: RequestParams = {}) =>
      this.request<ResultListUserVo, any>({
        path: `/admin`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ResetPasswordCreate
     * @summary 管理员重置用户密码
     * @request POST:/admin/reset-password
     */
    resetPasswordCreate: (data: ResetPasswordDTO, params: RequestParams = {}) =>
      this.request<ResultString, any>({
        path: `/admin/reset-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  all = {
    /**
     * No description
     *
     * @name GetAll
     * @summary 获取所有用户列表
     * @request GET:/all
     */
    getAll: (
      query?: {
        /** 页码 */
        pageNum?: number;
        /** 每页数量 */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultPageUserVo, any>({
        path: `/all`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  info = {
    /**
     * No description
     *
     * @name InfoCreate
     * @summary 获取用户消息（支持筛选）
     * @request POST:/info
     */
    infoCreate: (data: UserInfoDTO, params: RequestParams = {}) =>
      this.request<ResultPageUserVo, any>({
        path: `/info`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  excel = {
    /**
     * No description
     *
     * @name ExcelUpdate
     * @summary 从Excel导入用户
     * @request PUT:/excel
     */
    excelUpdate: (
      data: {
        /**
         * Excel文件
         * @format binary
         */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<object, any>({
        path: `/excel`,
        method: "PUT",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  wx = {
    /**
     * No description
     *
     * @name PostWx
     * @summary 绑定微信openid
     * @request POST:/wx
     */
    postWx: (
      query?: {
        /** 微信登录凭证（code） */
        code?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultBoolean, any>({
        path: `/wx`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),
  };
  template = {
    /**
     * No description
     *
     * @name TemplateList
     * @summary 获取用户导入模板
     * @request GET:/template
     */
    templateList: (params: RequestParams = {}) =>
      this.request<object, any>({
        path: `/template`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  changePassword = {
    /**
     * No description
     *
     * @name ChangePasswordCreate
     * @summary 修改当前用户密码
     * @request POST:/change-password
     */
    changePasswordCreate: (
      data: ChangePasswordDTO,
      params: RequestParams = {},
    ) =>
      this.request<ResultBoolean, any>({
        path: `/change-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  hello = {
    /**
     * No description
     *
     * @name HelloList
     * @summary hello
     * @request GET:/hello
     */
    helloList: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/hello`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  from = {
    /**
     * No description
     *
     * @name LeaveUpdate
     * @summary 申请请假
     * @request PUT:/from/leave
     */
    leaveUpdate: (data: FromVo, params: RequestParams = {}) =>
      this.request<ResultBoolean, any>({
        path: `/from/leave`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ApproveCreate
     * @summary todo批假
     * @request POST:/from/approve
     */
    approveCreate: (
      data: {
        /**
         * 申请ID
         * @format int64
         */
        formID?: number;
        /** 是否通过 */
        status?: boolean;
        /** 备注 */
        remark?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultBoolean, any>({
        path: `/from/approve`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name ListList
     * @summary 获取所有请假申请列表（未处理在前）
     * @request GET:/from/list
     */
    listList: (
      query: {
        /**
         * 页码
         * @example 1
         */
        pageNum: number;
        /**
         * 页数
         * @example 10
         */
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultPageFromDTO, any>({
        path: `/from/list`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name GetFrom
     * @summary 获取当前用户请假申请列表（时间排序）
     * @request GET:/from/my
     */
    getFrom: (
      query: {
        /**
         * 页码
         * @example 1
         */
        pageNum: number;
        /**
         * 页数
         * @example 10
         */
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultPageFromDTO, any>({
        path: `/from/my`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UserFromCreate
     * @summary 条件查询用户请假申请列表(同时输入ID和用户名，优先查询ID)
     * @request POST:/from/userFrom
     */
    userFromCreate: (data: UserFromDTO, params: RequestParams = {}) =>
      this.request<ResultPageFromDTO, any>({
        path: `/from/userFrom`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
