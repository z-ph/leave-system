import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { ElMessage } from "element-plus";
import type { Ref } from "vue";
import { computed } from "vue";
import { FormStatus } from "@/constants/formStatus";
import type { FromVo } from "@/api/axios/Api";
import {
  getRequiredApprovalLevels,
  canUserApprove,
  getNextApprovalRole,
  getApprovalProgress
} from "@/utils/approvalWorkflow";

export function useApprovalsQuery(params: Ref<{ pageNum: number; pageSize: number }>) {
  return useQuery({
    queryKey: ["approvals", params],
    queryFn: async () => {
      const res = await api.from.listList(params.value);
      return res.data.data;
    },
    placeholderData: (prev) => prev,
    select: (data) => {
      // 为每个申请添加审批进度信息
      if (!data?.records) return data;

      return {
        ...data,
        records: data.records.map((request: FromVo) => ({
          ...request,
          approvalProgress: getApprovalProgress(request),
          requiredLevels: getRequiredApprovalLevels(request.day ?? 0)
        }))
      };
    }
  });
}

export function useApproveMutation(userRole: Ref<number>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      formID: number;
      status: FormStatus;
      remark?: string;
      leaveRequest: FromVo;
    }) => {
      // 验证用户是否有权限审批该申请
      if (!canUserApprove(payload.leaveRequest, userRole.value)) {
        throw new Error("您没有权限审批该申请");
      }

      // 转换FormStatus为API期望的boolean类型
      const isApproved = payload.status === FormStatus.Approved;

      const apiPayload: {
        formID?: number;
        status?: boolean;
        remark?: string;
      } = {
        formID: payload.formID,
        status: isApproved,
      };

      if (payload.remark !== undefined) {
        apiPayload.remark = payload.remark;
      }

      const res = await api.from.approveCreate(apiPayload);
      return res.data;
    },
    onSuccess: () => {
      ElMessage.success({ message: "审批操作成功" });
      qc.invalidateQueries({ queryKey: ["approvals"] });
      qc.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "审批失败";
      ElMessage.error({ message });
    },
  });
}

export function useApprovalWorkflow(leaveRequest: Ref<FromVo>, currentUserRole: Ref<number>) {
  return computed(() => {
    const request = leaveRequest.value;
    const role = currentUserRole.value;

    return {
      canApprove: canUserApprove(request, role),
      nextApprovalRole: getNextApprovalRole(request, role),
      approvalProgress: getApprovalProgress(request),
      requiredLevels: getRequiredApprovalLevels(request.day ?? 0)
    };
  });
}

// 导出类型供组件使用
export type { ApprovalProgress } from "@/utils/approvalWorkflow";


