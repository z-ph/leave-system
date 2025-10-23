import { useMutation, useQuery } from "@tanstack/vue-query";
import { api } from "../../api/axios";

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