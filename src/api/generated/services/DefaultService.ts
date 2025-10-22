/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FormDO } from '../models/FormDO';
import type { ResultBoolean } from '../models/ResultBoolean';
import type { ResultPageFormDO } from '../models/ResultPageFormDO';
import type { ResultPageUserDO } from '../models/ResultPageUserDO';
import type { Result } from '../models/ResultString';
import type { ResultUserDO } from '../models/ResultUserDO';
import type { UserDO } from '../models/UserDO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * 登录接口(自动注册)
     * @param code 微信登录凭证（code）
     * @param token
     * @returns ResultString
     * @throws ApiError
     */
    public static postLogin(
        code?: string,
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
    ): CancelablePromise<Result> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            headers: {
                'token': token,
            },
            query: {
                'code': code,
            },
        });
    }
    /**
     * 获取用户列表
     * @param pageNum 页码
     * @param pageSize 每页数量
     * @param token
     * @returns ResultPageUserDO
     * @throws ApiError
     */
    public static get(
        pageNum?: number,
        pageSize?: number,
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
    ): CancelablePromise<ResultPageUserDO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
            headers: {
                'token': token,
            },
            query: {
                'pageNum': pageNum,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * 更新当前用户名
     * @param token
     * @param requestBody
     * @returns ResultBoolean
     * @throws ApiError
     */
    public static post(
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
        requestBody?: UserDO,
    ): CancelablePromise<ResultBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/',
            headers: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 获取当前登录用户信息
     * @param token
     * @returns ResultUserDO
     * @throws ApiError
     */
    public static getMy(
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
    ): CancelablePromise<ResultUserDO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/my',
            headers: {
                'token': token,
            },
        });
    }
    /**
     * 添加管理员
     * @param token
     * @param requestBody
     * @returns ResultBoolean
     * @throws ApiError
     */
    public static postAdmin(
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
        requestBody?: number,
    ): CancelablePromise<ResultBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin',
            headers: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * hello
     * @param token
     * @returns string
     * @throws ApiError
     */
    public static getHello(
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/hello',
            headers: {
                'token': token,
            },
        });
    }
    /**
     * 申请请假
     * @param token
     * @param requestBody
     * @returns ResultBoolean
     * @throws ApiError
     */
    public static putFromLeave(
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
        requestBody?: FormDO,
    ): CancelablePromise<ResultBoolean> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/from/leave',
            headers: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 批假
     * @param formId 申请ID
     * @param status 0-未处理 1-已同意 2-未通过
     * @param token
     * @returns ResultBoolean
     * @throws ApiError
     */
    public static postFromApprove(
        formId: number,
        status: number,
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
    ): CancelablePromise<ResultBoolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/from/approve',
            headers: {
                'token': token,
            },
            query: {
                'formID': formId,
                'status': status,
            },
        });
    }
    /**
     * 获取所有请假申请列表（未处理在前）
     * @param pageNum 页码
     * @param pageSize 页数
     * @param token
     * @returns ResultPageFormDO
     * @throws ApiError
     */
    public static getFromList(
        pageNum: number,
        pageSize: number,
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
    ): CancelablePromise<ResultPageFormDO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/from/list',
            headers: {
                'token': token,
            },
            query: {
                'pageNum': pageNum,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * 条件查询用户请假申请列表
     * @param userId 用户ID（与用户名同时输入优先使用用户ID）
     * @param userName 用户名
     * @param status 申请状态
     * @param type 申请类型
     * @param center 申请中心
     * @param pageNum
     * @param pageSize
     * @param token
     * @returns ResultPageFormDO
     * @throws ApiError
     */
    public static getFromUserFrom(
        userId?: number,
        userName?: string,
        status?: number,
        type?: string,
        center?: string,
        pageNum?: number,
        pageSize?: number,
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
    ): CancelablePromise<ResultPageFormDO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/from/userFrom',
            headers: {
                'token': token,
            },
            query: {
                'userId': userId,
                'userName': userName,
                'status': status,
                'type': type,
                'center': center,
                'pageNum': pageNum,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * 获取当前用户请假申请列表（未处理在前）
     * @param pageNum 页码
     * @param pageSize 页数
     * @param token
     * @returns ResultPageFormDO
     * @throws ApiError
     */
    public static getFromMy(
        pageNum: number,
        pageSize: number,
        token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjEwNDAxMTM1NDM1fQ.LUA1j7hpIcmlc337zKcNqfn4w4HFdBQfE9d4u8DJGzU',
    ): CancelablePromise<ResultPageFormDO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/from/my',
            headers: {
                'token': token,
            },
            query: {
                'pageNum': pageNum,
                'pageSize': pageSize,
            },
        });
    }
}
