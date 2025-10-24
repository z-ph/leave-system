<script setup lang="ts">
import { ref, computed } from "vue";
import {
  useRequestsQuery,
  type RequestFilters,
} from "@/pages/admin/hooks/useRequests";
import {
  FormStatus,
  getFormStatusLabel,
  getFormStatusTagType,
  LeaveType,
} from "@/constants/formStatus";

const filters = ref<RequestFilters>({ pageNum: 1, pageSize: 10 });
const { data, isLoading } = useRequestsQuery(filters);
const total = computed(() => data.value?.total ?? 0);

function onSearch() {
  filters.value.pageNum = 1;
}

function onReset() {
  filters.value = { pageNum: 1, pageSize: 10 };
}
</script>

<template>
  <el-card shadow="never">
    <template #header>申请历史</template>
    <el-form inline>
      <el-form-item label="申请人ID">
        <el-input
          v-model.number="filters.userId"
          placeholder="用户ID"
          style="width: 160px"
        />
      </el-form-item>
      <el-form-item label="申请人">
        <el-input
          v-model="filters.userName"
          placeholder="用户名"
          style="width: 160px"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="filters.status"
          clearable
          placeholder="全部"
          style="width: 140px"
        >
          <el-option
            :value="FormStatus.Pending"
            :label="getFormStatusLabel(FormStatus.Pending)"
          />
          <el-option
            :value="FormStatus.Approved"
            :label="getFormStatusLabel(FormStatus.Approved)"
          />
          <el-option
            :value="FormStatus.Rejected"
            :label="getFormStatusLabel(FormStatus.Rejected)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select
          v-model="filters.type"
          clearable
          placeholder="全部"
          style="width: 140px"
        >
          <el-option v-for="type in LeaveType" :value="type" :label="type" />
        </el-select>
      </el-form-item>
      <el-form-item label="中心">
        <el-input
          v-model="filters.center"
          placeholder="中心"
          style="width: 140px"
        />
      </el-form-item>
      <el-form-item>
        <el-space>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-space>
      </el-form-item>
    </el-form>
    <el-skeleton v-if="isLoading" :rows="5" animated />
    <el-table v-else :data="data?.records ?? []">
      <el-table-column label="申请人ID" prop="userId" width="120" />
      <el-table-column label="申请人" prop="userName" width="120" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="原因" prop="reason" />
      <el-table-column label="中心" prop="center" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-tag :type="getFormStatusTagType(row.status)">
            {{ getFormStatusLabel(row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="开始" prop="startTime" />
      <el-table-column label="结束" prop="endTime" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="审核员" prop="adminName" />
      <el-table-column label="审核意见" prop="remark" />
    </el-table>
    <el-pagination
      :current-page="filters.pageNum"
      :page-size="filters.pageSize"
      :total="total"
      layout="prev, pager, next, jumper"
      @current-change="(p:number)=> (filters.pageNum = p)"
    />
  </el-card>
</template>
