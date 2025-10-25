import { useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import type { Ref } from "vue";
import type { FormStatus } from "@/constants/formStatus";

export type RequestFilters = {
  pageNum: number;
  pageSize: number;
  userId?: number;
  userName?: string;
  status?: FormStatus;
  type?: string;
  center?: string;
};

export function useRequestsQuery(params: Ref<RequestFilters>) {
  return useQuery({
    queryKey: ["requests", params],
    queryFn: async () => {
      // 只传递API期望的必需参数
      const apiParams = {
        pageNum: params.value.pageNum,
        pageSize: params.value.pageSize,
      };
      const res = await api.from.listList(apiParams);
      return res.data.data;
    },
    placeholderData: (prev) => prev,
  });
}


