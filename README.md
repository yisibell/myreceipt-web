# myreceipt-web

MyReceipt 前端项目。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 数据请求 | @tanstack/react-query |
| 状态管理 | zustand |
| UI 组件库 | Shadcn UI（Radix UI） |
| HTTP 客户端 | ofetch |
| 文件上传 | react-dropzone |
| 样式方案 | Tailwind CSS、CSS Modules (sass) |
| 包管理器 | pnpm |

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 目录结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # 全局样式 + Shadcn CSS 变量
│   └── layout.tsx          # 根布局
├── components/
│   ├── providers.tsx       # QueryClientProvider
│   └── ui/                 # Shadcn UI 组件
├── hooks/                  # 自定义 hooks
├── lib/
│   ├── api.ts              # ofetch 实例
│   └── utils.ts            # cn() 工具函数
└── stores/                 # zustand stores
```
