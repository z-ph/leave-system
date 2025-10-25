import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import { computed, type Ref } from "vue";
import { ElMessage } from "element-plus";

export function useUserInfo() {
    return useQuery({
        queryKey: ["userInfo"],
        queryFn: () => api.my.getMy(),
        select: (res) => res.data.data,
    });
}

export function useUpdateUsername(){
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (username: string) => api.postRoot({ username }),
        onSuccess: () => {
            ElMessage.success({ message: "用户名已更新" });
            qc.invalidateQueries({ queryKey: ["userInfo"] });
        },
        onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "更新失败";
            ElMessage.error({ message });
        }
    });
}
export function useGetLeaveList({pageNum,pageSize}:{pageNum:Ref<number>,pageSize:Ref<number>}){
    return useQuery({
        queryKey: computed(() => ["leaveList", pageNum.value, pageSize.value]),
        queryFn: () => api.from.getFrom({ pageNum: pageNum.value, pageSize: pageSize.value }),
        select: (res) => res.data.data,
    });
}