import { useMutation } from "@tanstack/vue-query";
import { api } from "../../api/axios";
import type { FormDO } from "../../api/axios/Api";
import { ElMessage } from "element-plus";


export function useSubmitForm() {
  return useMutation({
    mutationFn: (form: FormDO) => api.from.leaveUpdate(form),
    onSuccess: () => {
      ElMessage.success("提交成功");
    },
    onError: (error) => {
      ElMessage.error(error.message);
    },
    
  });
}