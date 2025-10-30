import { useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { computed, watch, type Ref } from "vue";
import type { FormStatus } from "@/constants/formStatus";
import type { Center } from "@/constants/center";
import { getRoleGrade, Role } from "@/constants/role";
import { usePersonalInfo } from "@/pages/common/hooks/usePersonalInfo";

export type RequestFilters = {
  center?: Center;
  pageNum?: number;
  pageSize?: number;
  status?: FormStatus[];
  type?: string;
  userId?: number;
  userName?: string;
  nextUserRole?: Role;
};

export function useRequestsQuery(params: Ref<RequestFilters>) {
  const { formattedInfo: userInfo } = usePersonalInfo();
  const userGrade = computed(() =>
    getRoleGrade(userInfo.value?.role as Role | undefined)
  );
  watch(userInfo, (newVal) => {
    if (newVal) {
      params.value.nextUserRole = newVal.role as Role;
      if (userGrade.value < getRoleGrade(Role.departmentDirector)) {
        params.value.center = newVal.manageCenter as Center;
        return;
      }
    }
  });
  return useQuery({
    queryKey: ["requests", params],
    queryFn: async () => {
      const res = await api.from.userFromCreate(params.value);
      return res.data.data;
    },
    placeholderData: (prev) => prev,
  });
}
