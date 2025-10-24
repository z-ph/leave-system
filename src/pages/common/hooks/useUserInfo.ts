import { useMutation, useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import type {  PageFormDO } from "@/api/axios/Api";
import { computed, type Ref } from "vue";

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
export function useGetLeaveList({pageNum,pageSize}:{pageNum:Ref<number>,pageSize:Ref<number>}){
    return useQuery({
        queryKey: computed(() => ["leaveList", pageNum.value, pageSize.value]),
        queryFn: () => api.from.getFrom({ pageNum: pageNum.value, pageSize: pageSize.value }),
        select: (res) => res.data.data as PageFormDO,
    });
}