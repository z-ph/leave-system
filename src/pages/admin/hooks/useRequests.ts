import { useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import type { PageFormDO } from "@/api/axios/Api";
import type { Ref } from "vue";
import { FormStatus } from "@/constants/formStatus";

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
      const res = await api.from.userFromList(params.value as any);
      return res.data.data as PageFormDO;
    },
    placeholderData: (prev) => prev,
  });
}


