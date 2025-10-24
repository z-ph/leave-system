<script setup lang="ts">
import NavLayout from "@/components/NavLayout.vue";
import { useGetLeaveList } from "./hooks/useUserInfo";
import type { FormDO } from "@/api/axios/Api";
const { data: leaveList } = useGetLeaveList();

function statusType(status?: number) {
  if (status === 1) return "success"; // 已通过
  if (status === 2) return "danger";  // 已拒绝
  return "warning"; // 未审批 or 其他
}

function statusText(status?: number) {
  if (status === 1) return "已通过";
  if (status === 2) return "已拒绝";
  return "未审批";
}
</script>
<template>
    <NavLayout title="请假记录">
        <div :style="{ padding: '12px' }">
            <el-card shadow="never">
                <template #header>
                    <el-space :size="8" alignment="center">
                        <span>共</span>
                        <el-tag type="info" effect="light">{{ (leaveList ?? []).length }}</el-tag>
                        <span>条记录</span>
                    </el-space>
                </template>

                <el-empty v-if="(leaveList ?? []).length === 0" description="暂无记录" />

                <el-table v-else :data="(leaveList as FormDO[])" border stripe>
                    <el-table-column label="申请ID" prop="id" width="100" />
                    <el-table-column label="中心" prop="center" min-width="120" />
                    <el-table-column label="类型" prop="type" min-width="120" />
                    <el-table-column label="状态" min-width="120">
                        <template #default="{ row }">
                            <el-tag :type="statusType(row.status)">{{ statusText(row.status) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" prop="startTime" min-width="160" />
                    <el-table-column label="结束时间" prop="endTime" min-width="160" />
                    <el-table-column label="天数" prop="day" width="80" />
                    <el-table-column label="创建时间" prop="createTime" min-width="160" />
                </el-table>
            </el-card>
        </div>
    </NavLayout>
</template>