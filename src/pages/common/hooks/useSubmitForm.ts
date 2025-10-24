import { useMutation } from "@tanstack/vue-query";
import { api } from "@/api/axios";
import type { FormDO, ResultBoolean } from "@/api/axios/Api";
import { ElMessage } from "element-plus";
import type { MutationOptions } from "@tanstack/vue-query";
import type { AxiosResponse } from "node_modules/axios/index.d.cts";

export function useSubmitForm(options?: MutationOptions<AxiosResponse<ResultBoolean>, Error, FormDO>) {
  return useMutation({
    mutationFn: (form: FormDO) => api.from.leaveUpdate(form),
    ...options,
    onSuccess: (...args) => {
      ElMessage.success("提交成功");
      options?.onSuccess?.(...args);
    },
    onError: (error, ...args) => {
      ElMessage.error(error.message);
      options?.onError?.(error, ...args);
    },
  });
}