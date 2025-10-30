import { useQuery } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { computed, type Ref } from "vue";

export function useGetLeaveList({pageNum,pageSize}:{pageNum:Ref<number>,pageSize:Ref<number>}){
    return useQuery({
        queryKey: computed(() => ["leaveList", pageNum.value, pageSize.value]),
        queryFn: () => api.from.getFrom({ pageNum: pageNum.value, pageSize: pageSize.value }),
        select: (res) => res.data.data,
    });
}