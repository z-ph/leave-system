import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { ElMessage } from "element-plus";
import type { Ref } from "vue";
import { FormStatus } from "@/constants/formStatus";

export function useApprovalsQuery(params: Ref<{ pageNum: number; pageSize: number }>) {
  return useQuery({
    queryKey: ["approvals", params],
    queryFn: async () => {
      const res = await api.from.listList(params.value);
      return res.data.data;
    },
    placeholderData: (prev) => prev,
  });
}

export function useApproveMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { formID: number; status: FormStatus; remark?: string }) => {
      // 转换FormStatus为API期望的boolean类型
      const apiPayload: {
        formID?: number;
        status?: boolean;
        remark?: string;
      } = {
        formID: payload.formID,
        status: payload.status === FormStatus.Approved,
      };

      if (payload.remark !== undefined) {
        apiPayload.remark = payload.remark;
      }
      const res = await api.from.approveCreate(apiPayload);
      return res.data;
    },
    onSuccess: () => {
      ElMessage.success({ message: "操作成功" });
      qc.invalidateQueries({ queryKey: ["approvals"] });
      qc.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "请求失败";
      ElMessage.error({ message });
    },
  });
}


