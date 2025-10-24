<script setup lang="ts">
import NavLayout from "@/components/NavLayout.vue";
import { useGetLeaveList } from "./hooks/useUserInfo";
import { getFormStatusLabel, getFormStatusTagType } from "@/constants/formStatus";
import { ref, computed } from "vue";
const pageNum = ref(1);
const pageSize = ref(10);
const { data: leavePageData } = useGetLeaveList({pageNum: pageNum,pageSize: pageSize});
const total = computed(() => leavePageData.value?.total ?? 0);
const leaveList = computed(() => leavePageData.value?.records ?? []);
function statusType(status?: number) {
  return getFormStatusTagType(status);
}

function statusText(status?: number) {
  return getFormStatusLabel(status);
}
</script>
<template>
    <NavLayout title="请假记录">
        <div :style="{ padding: '12px' }">
            <el-card shadow="never">
                <template #header>
                    <el-space :size="8" alignment="center">
                        <span>共</span>
                        <el-tag type="info" effect="light">{{ total }}</el-tag>
                        <span>条记录</span>
                    </el-space>
                </template>

                <el-empty v-if="total === 0" description="暂无记录" />

                <el-table v-else :data="leaveList" border stripe>
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
                <el-pagination
                    v-model:current-page="pageNum"
                    v-model:page-size="pageSize"
                    :total="total"
                    layout="prev, pager, next, jumper"
                />
            </el-card>
        </div>
    </NavLayout>
</template>