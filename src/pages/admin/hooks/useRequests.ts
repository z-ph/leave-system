import { useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import type { Ref } from "vue";
import type { FormStatus } from "@/constants/formStatus";
import type { Center } from "@/constants/center";

export type RequestFilters = {
    center?: Center;
    pageNum?: number;
    pageSize?: number;
    status?: FormStatus[];
    type?: string;
    userId?: number;
    userName?: string;
};

export function useRequestsQuery(params: Ref<RequestFilters>) {
  return useQuery({
    queryKey: ["requests", params],
    queryFn: async () => {
      const res = await api.from.userFromCreate(params.value);
      return res.data.data;
    },
    placeholderData: (prev) => prev,
  });
}


