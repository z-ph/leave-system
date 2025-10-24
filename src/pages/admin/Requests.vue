<script setup lang="ts">
import { ref, computed } from "vue";
import { useRequestsQuery, type RequestFilters } from "@/pages/admin/hooks/useRequests";

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
    <template #header>申请管理</template>
    <el-form inline>
      <el-form-item label="用户ID">
        <el-input v-model.number="filters.userId" placeholder="用户ID" style="width: 160px" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="filters.userName" placeholder="用户名" style="width: 160px" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="filters.status" clearable placeholder="全部" style="width: 140px">
          <el-option :value="0" label="未审批" />
          <el-option :value="1" label="已通过" />
          <el-option :value="2" label="已拒绝" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="filters.type" placeholder="类型" style="width: 140px" />
      </el-form-item>
      <el-form-item label="中心">
        <el-input v-model="filters.center" placeholder="中心" style="width: 140px" />
      </el-form-item>
      <el-form-item>
        <el-space>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-space>
      </el-form-item>
    </el-form>
    <el-skeleton v-if="isLoading" :rows="5" animated />
    <el-table v-else :data="(data?.records ?? [])">
      <el-table-column label="申请ID" prop="id" width="100" />
      <el-table-column label="申请人ID" prop="userId" width="120" />
      <el-table-column label="类型" prop="type" />
      <el-table-column label="中心" prop="center" />
      <el-table-column label="状态">
        <template #default="{ row }">
          <el-tag :type="row.status===1?'success':row.status===2?'danger':'warning'">
            {{ row.status===1?'已通过':row.status===2?'已拒绝':'未审批' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="开始" prop="startTime" />
      <el-table-column label="结束" prop="endTime" />
      <el-table-column label="创建时间" prop="createTime" />
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


