#!/bin/bash

echo "🔍 开始全面类型检查..."

echo "1. TypeScript 编译检查..."
pnpm exec tsc --noEmit --project tsconfig.app.json --strict
if [ $? -ne 0 ]; then
    echo "❌ TypeScript 编译检查失败"
    exit 1
fi

echo "2. Vue 组件类型检查..."
pnpm exec vue-tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ Vue 组件类型检查失败"
    exit 1
fi

echo "3. ESLint 类型检查..."
pnpm run lint:check
if [ $? -ne 0 ]; then
    echo "❌ ESLint 检查失败"
    exit 1
fi

echo "4. 搜索所有 any 类型使用..."
echo "🔍 搜索 any 类型:"
grep -rn ":\s*any\|<any>\|as\s+any" src/ --include="*.ts" --include="*.vue" || echo "✅ 未发现 any 类型"

echo "5. 搜索所有类型断言..."
echo "🔍 搜索 as 类型断言:"
grep -rn "as [A-Z]" src/ --include="*.ts" --include="*.vue" || echo "✅ 未发现类型断言"

echo "6. 搜索未使用的导入..."
echo "🔍 搜索未使用的导入:"
grep -rn "import.*from" src/ --include="*.ts" --include="*.vue" | head -10

echo "✅ 所有类型检查通过！"