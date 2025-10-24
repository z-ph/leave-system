<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useGetAdminList } from "./hooks/useGetAdminList";
import type { FormDO } from "@/api/axios/Api";
import { useUserInfo } from "./hooks/useUserInfo";
import { useSubmitForm } from "./hooks/useSubmitForm";
import { LeaveType } from "@/constants/formStatus";
import NavLayout from "@/components/NavLayout.vue";
interface LeaveForm extends FormDO {
  center: string;
  type: string;
  startTime: string;
  endTime: string;
  reason: string;
  day: number;
  adminId?: number;
}
const { data: adminList } = useGetAdminList();
const { data: userInfo } = useUserInfo();
const { mutate: submitForm } = useSubmitForm();
const username = computed(() => userInfo.value?.username);
const leaveTypeOptions: Array<{ label: LeaveType; value: LeaveType }> = [
  { label: LeaveType.Leave, value: LeaveType.Leave },
  { label: LeaveType.SickLeave, value: LeaveType.SickLeave },
  { label: LeaveType.AdjustLeave, value: LeaveType.AdjustLeave },
  { label: LeaveType.AnnualLeave, value: LeaveType.AnnualLeave },
  { label: LeaveType.Other, value: LeaveType.Other },
];

const formRef = ref<FormInstance>();
const form = reactive<LeaveForm>({
  center: "",
  type: "",
  startTime: "",
  endTime: "",
  reason: "",
  day: 0,
  adminId: undefined,
});

function calculateWorkdays(
  startTime: string | undefined,
  endTime: string | undefined
): number {
  if (!startTime || !endTime) return 0;
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (end < start) return 0;
  let workdayCount = 0;
  const cursor = new Date(start);
  // 逐日累加，包含起止当日
  while (cursor <= end) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      workdayCount += 1;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return workdayCount;
}

const workdayCount = computed(() =>
  calculateWorkdays(form.startTime, form.endTime)
);

const validateEndAfterStart = (
  _: unknown,
  value: string | undefined,
  callback: (err?: Error) => void
) => {
  if (!value || !form.startTime) return callback();
  if (new Date(value) < new Date(form.startTime)) {
    return callback(new Error("结束时间需不早于开始时间"));
  }
  callback();
};

const rules: FormRules<LeaveForm> = {
  center: [{ required: true, message: "请输入所在中心", trigger: "blur" }],
  type: [{ required: true, message: "请选择请假类别", trigger: "change" }],
  startTime: [{ required: true, message: "请选择开始时间", trigger: "change" }],
  endTime: [
    { required: true, message: "请选择结束时间", trigger: "change" },
    { validator: validateEndAfterStart, trigger: "change" },
  ],
  userId: [{ required: true, message: "请输入申请人", trigger: "blur" }],
  reason: [{ required: true, message: "请填写请假事由", trigger: "blur" }],
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    submitForm(form);
  });
};

const handleReset = () => {
  formRef.value?.resetFields();
  form.createTime = new Date().toISOString();
};
const handleAdminChange = (value: number) => {
  form.adminId = value;
};
</script>

<template>
  <NavLayout title="请假申请">
    <div style="padding: 16px">
      <h2 style="text-align: center; margin: 0 0 16px">
        实验教学部教职工请假申请表
      </h2>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="96px">
        <el-row :gutter="12">
          <el-col :span="24">
            <el-form-item label="所在中心" prop="center">
              <el-input v-model="form.center" placeholder="请输入所在中心" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="请假类别" prop="type">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="opt in leaveTypeOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择开始时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择结束时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="占用工作日">
              <el-input :model-value="workdayCount" disabled>
                <template #append>天</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="申请人" prop="applicant">
              <el-input :value="username" disabled />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.userId" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="审核人" prop="adminId">
              <el-select
                v-model="form.adminId"
                placeholder="请选择审核人"
                @change="handleAdminChange"
              >
                <el-option
                  v-for="admin in adminList"
                  :key="admin.id"
                  :label="admin.username"
                  :value="admin.id as number"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="请假事由" prop="reason">
              <el-input
                v-model="form.reason"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="请简要填写事由"
              />
            </el-form-item>
          </el-col>

          <el-col :span="24" style="text-align: center; margin-top: 8px">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </NavLayout>
</template>
