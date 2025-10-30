<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import type { FromVo } from "@/api/axios/Api";
import { useSubmitForm } from "./hooks/useSubmitForm";
import { LeaveType } from "@/constants/formStatus";
import NavLayout from "@/components/NavLayout.vue";
import { Loading } from "@element-plus/icons-vue";
import { usePersonalInfo } from "./hooks/usePersonalInfo";
interface LeaveForm extends FromVo {
  type: string;
  startTime: string;
  endTime: string;
  reason: string;
  day?: number;
}
const { formattedInfo: userInfo } = usePersonalInfo();
const { mutate: submitForm, isPending: isSubmitting } = useSubmitForm({
  onSuccess: () => handleReset(),
});
const username = computed(() => userInfo.value?.username);
const center = computed(() => userInfo.value?.center);
const phone = computed(() => userInfo.value?.phone);
const leaveTypeOptions: Array<{ label: LeaveType; value: LeaveType }> = [
  { label: LeaveType.Leave, value: LeaveType.Leave },
  { label: LeaveType.SickLeave, value: LeaveType.SickLeave },
  { label: LeaveType.AdjustLeave, value: LeaveType.AdjustLeave },
  { label: LeaveType.AnnualLeave, value: LeaveType.AnnualLeave },
  { label: LeaveType.Other, value: LeaveType.Other },
];

const formRef = ref<FormInstance>();
const form = reactive<LeaveForm>({
  type: "",
  startTime: "",
  endTime: "",
  reason: "",
});

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
  type: [{ required: true, message: "请选择请假类别", trigger: "change" }],
  startTime: [{ required: true, message: "请选择开始时间", trigger: "change" }],
  endTime: [
    { required: true, message: "请选择结束时间", trigger: "change" },
    { validator: validateEndAfterStart, trigger: "change" },
  ],
  // userId 不存在于 FromVo 接口中，移除此规则
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
  // FromVo 接口中没有 createTime 属性，如果需要时���戳可以使用其他属性
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
              <el-input :value="center" placeholder="请输入所在中心" disabled />
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
                :editable="false"
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
            <!-- 不要触发输入法，只允许点击弹出的框进行选择时间-->
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
              :editable="false"
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
            <el-form-item label="申请人" prop="applicant">
              <el-input :value="username" readonly v-if="username" disabled/>
              <el-icon v-else>
                <Loading />
              </el-icon>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="联系电话" prop="phone">
              <el-input :value="phone" placeholder="请输入联系电话" disabled/>
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
            <el-button
              type="primary"
              @click="handleSubmit"
              :loading="isSubmitting"
              >提交</el-button
            >
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </NavLayout>
</template>
