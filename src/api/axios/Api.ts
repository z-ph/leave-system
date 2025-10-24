/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PageFormDO {
  records?: FormDO[];
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

export interface FormDO {
  /**
   * 申请ID
   * @format int64
   */
  id?: number;
  /**
   * 所在中心
   * 申请中心
   */
  center: string;
  /**
   * 申请类型
   * 申请类型
   */
  type: string;
  /**
   * 申请状态（0-未审批 1-已通过 2-已拒绝）
   * 申请状态
   */
  status?: number;
  /**
   * 开始时间（YYYY-MM-DD HH:MM:SS）
   * 申请开始时间
   */
  startTime: string;
  /**
   * 结束时间（YYYY-MM-DD HH:MM:SS）
   * 申请结束时间
   */
  endTime: string;
  /**
   * 创建时间（YYYY-MM-DD HH:MM:SS）
   * 创建时间
   */
  createTime?: string;
  /**
   * 请假事由
   * 申请原因
   */
  reason: string;
  /**
   * 请假天数
   * 申请天数
   */
  day?: number;
  /**
   * 用户ID
   * 用户openid
   * @format int64
   */
  userId?: number;
  /**
   * 用户名称
   */
  userName?: string;
  /**
   * 指定审核员ID
   * 审核员ID
   * @format int64
   */
  adminId?: number;

  /**
   * 审核员名称
   * 审核员名称
   */
  adminName?: string;
  /**
   * 联系电话
   * 联系电话
   */
  phone?: string;
}

export interface PageUserDO {
  records?: UserDO[];
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

export interface UserDO {
  /** @format int64 */
  id?: number;
  /** 微信openid */
  openid?: string;
  /**
   * 用户名
   * 用户名
   */
  username?: string;
  /**
   * 0-普通用户 1-审核人 2-管理员
   * 角色 0-普通用户 1-审核人 2-管理员
   */
  role?: number;
}

export interface ResultListUserDO {
  code?: number;
  msg?: string;
  data?: UserDO[];
}

export interface ResultPageFormDO {
  code?: number;
  msg?: string;
  data?: PageFormDO;
}

export interface ResultString {
  code?: number;
  msg?: string;
  data?: string;
}

export interface ResultUserDO {
  code?: number;
  msg?: string;
  /** com.csmht.sinin.DO.UserDO */
  data?: UserDO;
}

export interface ResultBoolean {
  code?: number;
  msg?: string;
  data?: boolean;
}

export interface ResultPageUserDO {
  code?: number;
  msg?: string;
  data?: PageUserDO;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";
import { TokenManager } from "../../auth/tokenManager";

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
    this.instance.interceptors.request.use((config) => {
      const token = TokenManager.getToken();
      console.log(token);
      if (token) {
        config.headers.token = token;
      }
      return config;
    });
    this.instance.interceptors.response.use((response) => {
      const data = response.data;
      if (data.code !== 1) {
        throw new Error(data.msg);
      }
      return response;
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
   * @name GetRoot
   * @summary 获取用户列表
   * @request GET:/
   */
  getRoot = (
    query?: {
      /** 页码 */
      pageNum?: number;
      /** 每页数量 */
      pageSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ResultPageUserDO, any>({
      path: `/`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @name PostRoot
   * @summary 更新当前用户名
   * @request POST:/
   */
  postRoot = (data: UserDO, params: RequestParams = {}) =>
    this.request<ResultBoolean, any>({
      path: `/`,
      method: "POST",
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
     * @summary 登录接口(自动注册)
     * @request POST:/login
     */
    loginCreate: (
      query?: {
        /**
         * 微信登录凭证（code）
         * @example "031SH81w3TnVR53QXZZv30EwNw2SH81o"
         */
        code?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultString, any>({
        path: `/login`,
        method: "POST",
        query: query,
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
      this.request<ResultUserDO, any>({
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
     * @summary 添加管理员
     * @request POST:/admin
     */
    adminCreate: (data: number, params: RequestParams = {}) =>
      this.request<ResultBoolean, any>({
        path: `/admin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
      this.request<ResultListUserDO, any>({
        path: `/admin`,
        method: "GET",
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
    leaveUpdate: (data: FormDO, params: RequestParams = {}) =>
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
     * @summary 批假
     * @request POST:/from/approve
     */
    approveCreate: (
      query: {
        /** 申请ID */
        formID: number;
        /** 0-未处理 1-已同意 2-未通过 */
        status: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultBoolean, any>({
        path: `/from/approve`,
        method: "POST",
        query: query,
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
        /** 页码 */
        pageNum: number;
        /** 页数 */
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultPageFormDO, any>({
        path: `/from/list`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UserFromList
     * @summary 条件查询用户请假申请列表(同时输入ID和用户名，优先查询ID)
     * @request GET:/from/userFrom
     */
    userFromList: (
      body: {
        /**
         * 用户ID（与用户名同时输入优先使用用户ID）
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
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultPageFormDO, any>({
        path: `/from/userFrom`,
        method: "POST",
        body: body,
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
        /** 页码 */
        pageNum: number;
        /** 页数 */
        pageSize: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultPageFormDO, any>({
        path: `/from/my`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
