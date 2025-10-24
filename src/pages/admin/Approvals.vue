<script setup lang="ts">
import { useApprovalsQuery, useApproveMutation } from "./hooks/useApprovals";
import type { FormDO } from "@/api/axios/Api";
import { ref, computed } from "vue";
import { ElMessageBox } from "element-plus";

const params = ref({ pageNum: 1, pageSize: 10 });
const { data, isLoading } = useApprovalsQuery(params);
const total = computed(() => data.value?.total ?? 0);
const { mutate: approve } = useApproveMutation();

function handleApprove(row: FormDO, status: number) {
  ElMessageBox.prompt("请输入审批备注", "审批确认", { inputPlaceholder: "备注(可选)" })
    .then(({ value }) => approve({ formID: Number(row.id), status, remark: value }))
    .catch(() => {});
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <span>待审批</span>
    </template>
    <el-skeleton v-if="isLoading" :rows="5" animated />
    <el-table v-else :data="(data?.records ?? [])">
      <el-table-column label="申请ID" prop="id" width="100" />
      <el-table-column label="申请人ID" prop="userId" width="120" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="中心" prop="center" />
      <el-table-column label="时间" min-width="220">
        <template #default="{ row }">
          {{ row.startTime }} ~ {{ row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template #default="{ row }">
          <el-space>
            <el-button type="success" size="small" @click="handleApprove(row, 1)">同意</el-button>
            <el-button type="danger" size="small" @click="handleApprove(row, 2)">拒绝</el-button>
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


