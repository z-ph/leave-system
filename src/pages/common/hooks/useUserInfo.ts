import { useMutation, useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import type { FormDO } from "@/api/axios/Api";

export function useUserInfo() {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: () => api.my.getMy(),
        select: (res) => res.data.data,
    });
}

export function useUpdateUsername(){
    return useMutation({
        mutationFn: (username: string) => api.postRoot({ username }),
    });
}
export function useGetLeaveList(){
    return useQuery({
        queryKey: ["leaveList"],
        queryFn: () => api.from.getFrom({ pageNum: 1, pageSize: 9999999 }),
        select: (res) => res.data.data?.records ?? [] as FormDO[],
    });
}