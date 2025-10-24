理解。基于你当前的接口与技术栈（Vue 3 + Vue Router + Element Plus + @tanstack/vue-query + swagger-typescript-api/axios），下面是一套“角色清晰、易扩展、可维护”的代码规范与工程约定。你可以按此落地管理端与通用页面，保证后期快速迭代。

### 角色与权限约定
- 角色常量
  - 普通用户：user
  - 审核人：auditor
  - 超级管理员：superAdmin
- 统一角色类型与工具
```ts
// src/auth/roles.ts
export enum Role {
  User = "user",
  Auditor = "auditor",
  SuperAdmin = "superAdmin",
}

export function hasRole(userRole: Role | undefined, allowed: Role[]) {
  return !!userRole && allowed.includes(userRole);
}
```
- 路由 meta 强类型：以 meta.roles 限制访问
```ts
// src/router/types.ts
import type { Role } from "@/auth/roles";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    roles?: Role[];
    pageTitle?: string;
  }
}
```
- 路由守卫（合并登录鉴权与角色鉴权）
```ts
// src/router/index.ts（示意）
router.beforeEach((to, _from, next) => {
  const requiresAuth = to.meta?.requiresAuth;
  if (!requiresAuth) return next();

  if (!TokenManager.isAuthed()) {
    next({ path: "/login", query: { redirect: to.fullPath } });
    return;
  }

  const current = TokenManager.getRole(); // 建议在 tokenManager 里暴露
  const allowed = to.meta?.roles;
  if (allowed && !hasRole(current, allowed)) {
    ElMessage.error("无权限访问");
    next({ path: "/" });
    return;
  }

  next();
});
```

### 路由结构与命名
- 管理端统一挂载在 `/admin`
  - `/admin/dashboard` 仪表盘（所有角色可见，但内容按角色裁剪）
  - `/admin/approvals` 待审批（auditor、superAdmin）
  - `/admin/requests` 申请管理（auditor、superAdmin）
  - `/admin/users` 用户管理（superAdmin）
  - `/admin/admins` 审核员管理（superAdmin）
  - `/admin/audit` 审计日志（superAdmin）
  - `/admin/settings` 配置（superAdmin）
- 每个路由定义 meta：
```ts
// src/router/adminRoutes.ts（示意）
{
  path: "/admin/approvals",
  component: () => import("@/pages/admin/Approvals.vue"),
  meta: { requiresAuth: true, roles: [Role.Auditor, Role.SuperAdmin], pageTitle: "待审批" }
}
```

### API 层规范
- 基于 swagger-typescript-api 生成的 `Api` 使用 axios；统一一个 `api` 实例并接入 Authorization
```ts
// src/api/axios/index.ts
import { Api } from "./Api";
import { TokenManager } from "@/auth/tokenManager";

export const api = new Api({
  baseURL: import.meta.env.DEV ? "/api" : "https://csmht.xin/sinin",
  securityWorker: () => {
    const token = TokenManager.getToken();
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  },
  // format: "json" // 如需统一响应格式
});
```
- 不直接在组件里拼装请求，全部通过“可复用 Hook”暴露：
  - 查询：`useLeaveListQuery(params)`、`useUsersQuery(params)`
  - 变更：`useApproveMutation()`、`useAddAdminMutation()`
- 统一错误处理：封装错误解析器，hook 内部使用 `onError` 调 `ElMessage`
```ts
// src/api/error.ts
export function getErrorMessage(e: unknown) {
  if (typeof e === "string") return e;
  const any = e as any;
  return any?.message || any?.response?.data?.msg || "请求失败";
}
```

### 数据层（vue-query）约定
- QueryKey 必须包含筛选条件，避免数据串台。例如：
```ts
// src/pages/admin/hooks/useApprovals.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { api } from "@/api/axios";

export function useApprovalsQuery(params: { pageNum: number; pageSize: number }) {
  return useQuery({
    queryKey: ["approvals", params],
    queryFn: () => api.from.listList(params).then(r => r.data.data),
    keepPreviousData: true,
  });
}

export function useApproveMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { formID: number; status: number; remark?: string }) =>
      api.from.approveCreate(payload as any).then(r => r.data),
    onSuccess: () => {
      ElMessage.success("操作成功");
      qc.invalidateQueries({ queryKey: ["approvals"] });
      qc.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: (e) => ElMessage.error(getErrorMessage(e)),
  });
}
```
- 分页、筛选、状态统一使用组合式函数管理，组件只负责渲染。

### 组件与页面规范
- UI 统一使用 Element Plus，不混用原生样式；通用容器组件化：
  - `PageContainer`：标题/操作区/内容区
  - `FilterBar`：行内表单（slots: filters, actions）
  - `DataTable`：统一表格（分页、空态、加载态）
  - `NavLayout`：顶部返回与标题
  - `BottomNav`：底部导航（针对移动端/通用端）
- 审批交互
  - 列表行支持“快速审批”按钮（弹出 `el-dialog` 收集备注）
  - 详情抽屉 `el-drawer` 展示申请信息与审批流时间线 `el-timeline`
- 命名规范
  - 页面组件：`PascalCase.vue`，放于 `src/pages/admin/*`
  - 原子/复用组件：`src/components/*`
  - Hook/组合式：`useXxx.ts`，动词开头，放于 `src/composables` 或页面下 `hooks/`
  - 类型：从生成代码导入，禁止重复定义（`FormDO`, `UserDO`, ...）

### 表单与校验
- 使用 `el-form` + `schema`/`rules`，规则统一提取到同文件顶部或 `src/validators/*`
- 提交使用 mutation，成功后统一 `ElMessage.success`，失败统一 `onError` -> `ElMessage.error`

### 目录组织
- `src/pages/admin/*` 管理端页面
- `src/pages/common/*` 通用端页面
- `src/components/*` 通用组件
- `src/composables/*` 跨页面的 Hook
- `src/api/axios/*` 生成与实例封装
- `src/auth/*` token 与角色工具
- `src/router/*` 路由与类型
- `src/types/*` 如果有自定义扩展类型（尽量复用 OpenAPI）

### 配置与环境
- 别名：`@ -> src`（vite.config.ts 与 tsconfig.app.json 已配置）
- 环境变量：`VITE_API_BASE` 可选；当前已根据 DEV/PROD 自动切换

### 代码质量与提交
- ESLint + Prettier：保持统一格式，禁止 any（除极端场景）
- 严格类型：避免 `as any`，对接口不确定字段创建细化类型
- Git 提交信息：`feat(admin): approvals 列表与审批弹窗` 等约定式提交
- 单测（可选）：对关键 hooks（审批、查询）做最小单元测试

### 性能与可维护性
- 避免全局状态滥用：只在 `auth`、全局 UI 状态使用（例如主题）
- 列表分页保留数据：`keepPreviousData: true`
- 正交设计：查询、渲染、交互分层，组件只处理 UI；数据逻辑在 hooks

如你认可以上规范，我可以按本规范快速生成管理端基础骨架（路由 + 页面空壳 + hooks 模板 + 审批弹窗），并先接通“待审批”与“申请管理”两个核心页面。





我将完善管理端“待审批/申请管理”页面：加上分页与筛选，并改造 hooks 支持响应式参数；同时给 `/admin` 增加重定向到仪表盘。接着我会直接进行这些文件的编辑。

[5 tools called]

我先检查并修正 hooks 与页面的实现，确保分页筛选生效，并确认路由已添加 /admin 重定向。随后我会更新相关文件。

[4 tools called]

我先把“待审批/申请管理”两处未完成项补齐：让 hooks 支持响应式参数，页面增加筛选与分页。完成后我会检查语法并勾选已完成任务。

[12 tools called]

我已经开始完善“待审批/申请管理”分页筛选，并修复类型错误。现在我会修正 `total` 计算的类型用法，然后再次检查 lints，最后勾选已完成的待办。

[3 tools called]

- 已完成
  - 引入角色体系与路由权限
    - `src/auth/roles.ts` 数字枚举：0-普通用户、1-审核人、2-管理员；`hasRole`。
    - `src/auth/userSession.ts` 基于 `getMy` 缓存用户角色，路由守卫用它鉴权。
    - `src/router/index.ts` 路由守卫改为 async，按 meta.roles 校验。
  - 管理端骨架
    - 布局与菜单：`src/pages/admin/AdminLayout.vue`
    - 页面：`Dashboard.vue`、`Approvals.vue`、`Requests.vue`、`Users.vue`、`Admins.vue`、`Audit.vue`、`Settings.vue`
    - 路由：`/admin` 下子路由，`/admin` 重定向到 `dashboard`，meta.roles 使用数字枚举。
  - 数据 hooks
    - `useApprovalsQuery`、`useApproveMutation`
    - `useRequestsQuery` 与筛选类型 `RequestFilters`
  - 页面完善
    - 待审批：分页、行内同意/拒绝对话框、类型修正
    - 申请管理：筛选（用户ID/用户名/状态/类型/中心）、分页、状态标签

- 待完成
  - 可选增强：审批备注必填/校验、审批历史时间线、请求错误统一提示、筛选项持久化、导出 CSV、用户/审核员管理对接接口、审计日志页实现。

是否继续补上以下增强？
- 在“待审批”中增加详情抽屉与审批流时间线
- “申请管理”支持时间范围筛选与导出按钮
- 接通“用户/审核员管理”与“审计日志”接口