<script setup lang="ts">
import {  useApproveMutation } from "./hooks/useApprovals";
import type { FromVo } from "@/api/axios/Api";
import { ref, computed, watch } from "vue";
import { ElMessageBox } from "element-plus";
import { FormStatus } from "@/constants/formStatus";
import { useCurrentUserRole } from "@/auth/useCurrentUserRole";
import { canUserApprove } from "@/utils/approvalWorkflow";
import { useRequestsQuery, type RequestFilters } from "./hooks/useRequests";
import {usePersonalInfo} from "../common/hooks/usePersonalInfo";
import type { Center } from "@/constants/center";
const { formattedInfo: userInfo,isLoadingUser } = usePersonalInfo();
const params = ref<RequestFilters>({ pageNum: 1, pageSize: 10, center: undefined });
watch(userInfo, (newVal) => {
  if (newVal) {
    params.value.center = newVal.manageCenter as Center;
  }
});
const { data, isLoading } = useRequestsQuery(params);
const total = computed(() => data.value?.total ?? 0);
const { role: currentUserRole } = useCurrentUserRole();
const { mutate: approve, isPending: isApproving } = useApproveMutation(computed(() => currentUserRole.value ?? 0));

function handleApprove(row: FromVo, status: FormStatus) {
  ElMessageBox.prompt("请输入审批备注", "审批确认", { inputPlaceholder: "备注(可选)" })
    .then(({ value }) => approve({
      formID: Number(row.id),
      status,
      remark: value,
      leaveRequest: row
    }))
    .catch(() => {});
}

function canUserApproveRequest(row: FromVo) {
  return canUserApprove(row, currentUserRole.value ?? 0);
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <span>待审批</span>
    </template>
    <el-skeleton v-if="isLoading||isLoadingUser" :rows="5" animated />
    <el-table v-else :data="(data?.records?.filter((item) => item.status === FormStatus.Pending) ?? [])">
      <el-table-column label="申请人" prop="userName" width="120" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="原因" prop="reason" />
      <el-table-column label="中心" prop="center" />
      <el-table-column label="时间" min-width="220">
        <template #default="{ row }">
          {{ row.startTime }} ~ {{ row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="天数" prop="day" width="80" />
      <el-table-column label="审批进度" width="150">
        <template #default="{ row }">
          <div v-if="row.approvalProgress">
            <el-progress
              :percentage="row.approvalProgress.percentage"
              :stroke-width="6"
              status="success"
            />
            <div class="mt-1 text-xs text-gray-500">
              {{ row.approvalProgress.currentStatus }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-space>
            <el-button
              type="success"
              :loading="isApproving"
              :disabled="!canUserApproveRequest(row)"
              @click="handleApprove(row, FormStatus.Approved)"
            >
              同意
            </el-button>
            <el-button
              type="danger"
              :loading="isApproving"
              :disabled="!canUserApproveRequest(row)"
              @click="handleApprove(row, FormStatus.Rejected)"
            >
              拒绝
            </el-button>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="params.pageNum"
      :page-size="params.pageSize"
      :total="total"
      layout="prev, pager, next, jumper"
      @current-change="(p:number)=> (params.pageNum = p)"
    />
  </el-card>
</template>


