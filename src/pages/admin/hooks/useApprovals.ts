import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { ElMessage } from "element-plus";
import { FormStatus } from "@/constants/formStatus";
import type { FromVo } from "@/api/axios/Api";


export function useApproveMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      formID: number;
      status: FormStatus;
      remark?: string;
      leaveRequest: FromVo;
    }) => {

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


// 导出类型供组件使用
export type { ApprovalProgress } from "@/utils/approvalWorkflow";


