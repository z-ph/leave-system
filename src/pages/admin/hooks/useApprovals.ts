import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import type { PageFormDO } from "@/api/axios/Api";
import { ElMessage } from "element-plus";
import type { Ref } from "vue";
import { FormStatus } from "@/constants/formStatus";

export function useApprovalsQuery(params: Ref<{ pageNum: number; pageSize: number }>) {
  return useQuery({
    queryKey: ["approvals", params],
    queryFn: async () => {
      const res = await api.from.listList(params.value);
      return res.data.data as PageFormDO;
    },
    placeholderData: (prev) => prev,
  });
}

export function useApproveMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { formID: number; status: FormStatus; remark?: string }) => {
      const res = await api.from.approveCreate(payload as any);
      return res.data;
    },
    onSuccess: () => {
      ElMessage.success("操作成功");
      qc.invalidateQueries({ queryKey: ["approvals"] });
      qc.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (e: any) => {
      ElMessage.error(e?.message ?? "请求失败");
    },
  });
}


