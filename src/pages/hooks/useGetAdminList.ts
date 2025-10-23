import { useQuery } from "@tanstack/vue-query";
import { api } from "../../api/axios";

export const useGetAdminList = () => {
  return useQuery({
    queryKey: ["adminList"],
    queryFn: () => api.admin.adminList(),
    select: (res) => res.data.data,
  });
};