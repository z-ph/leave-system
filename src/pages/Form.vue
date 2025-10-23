<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

type LeaveType = "事假" | "病假" | "调休" | "年休假" | "其他";

interface LeaveForm {
  center: string;
  leaveType: LeaveType | "";
  startAt: Date | null;
  endAt: Date | null;
  applicant: string;
  phone: string;
  applyAt: Date | null;
  reason: string;
}

const leaveTypeOptions: Array<{ label: LeaveType; value: LeaveType }> = [
  { label: "事假", value: "事假" },
  { label: "病假", value: "病假" },
  { label: "调休", value: "调休" },
  { label: "年休假", value: "年休假" },
  { label: "其他", value: "其他" },
];

const formRef = ref<FormInstance>();
const form = reactive<LeaveForm>({
  center: "",
  leaveType: "",
  startAt: null,
  endAt: null,
  applicant: "",
  phone: "",
  applyAt: new Date(),
  reason: "",
});

function calculateWorkdays(startAt: Date | null, endAt: Date | null): number {
  if (!startAt || !endAt) return 0;
  const start = new Date(startAt);
  const end = new Date(endAt);
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

const workdayCount = computed(() => calculateWorkdays(form.startAt, form.endAt));

const validateEndAfterStart = (_: unknown, value: Date | null, callback: (err?: Error) => void) => {
  if (!value || !form.startAt) return callback();
  if (value < form.startAt) {
    return callback(new Error("结束时间需不早于开始时间"));
  }
  callback();
};

const rules: FormRules<LeaveForm> = {
  center: [{ required: true, message: "请输入所在中心", trigger: "blur" }],
  leaveType: [{ required: true, message: "请选择请假类别", trigger: "change" }],
  startAt: [{ required: true, message: "请选择开始时间", trigger: "change" }],
  endAt: [
    { required: true, message: "请选择结束时间", trigger: "change" },
    { validator: validateEndAfterStart, trigger: "change" },
  ],
  applicant: [{ required: true, message: "请输入申请人", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入联系电话", trigger: "blur" },
    {
      validator: (_: unknown, value: string, callback: (err?: Error) => void) => {
        if (!value) return callback();
        const mobile = /^(\+?86)?1[3-9]\d{9}$/; // 大陆手机号
        const landline = /^(0\d{2,3}-)?\d{7,8}$/; // 座机
        if (!mobile.test(value) && !landline.test(value)) {
          return callback(new Error("电话格式不正确"));
        }
        callback();
      },
      trigger: "blur",
    },
  ],
  reason: [{ required: true, message: "请填写请假事由", trigger: "blur" }],
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (!valid) return;
    if (form.startAt && form.endAt && form.endAt < form.startAt) {
      ElMessage.error("结束时间需不早于开始时间");
      return;
    }
    ElMessage.success("提交成功（示例，无实际提交）");
  });
};

const handleReset = () => {
  formRef.value?.resetFields();
  form.applyAt = new Date();
};
</script>

<template>
  <div style="padding: 16px">
    <h2 style="text-align: center; margin: 0 0 16px">实验教学部教职工请假申请表</h2>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="96px">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-form-item label="所在中心" prop="center">
            <el-input v-model="form.center" placeholder="请输入所在中心" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="请假类别" prop="leaveType">
            <el-select v-model="form.leaveType" placeholder="请选择">
              <el-option v-for="opt in leaveTypeOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="请假开始时间" prop="startAt">
            <el-date-picker
              v-model="form.startAt"
              type="datetime"
              placeholder="选择开始时间"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="请假结束时间" prop="endAt">
            <el-date-picker
              v-model="form.endAt"
              type="datetime"
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
            <el-input v-model="form.applicant" placeholder="请输入申请人姓名" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入联系电话" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="申请时间">
            <el-date-picker v-model="form.applyAt" type="datetime" style="width: 100%" disabled />
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
  
</template>