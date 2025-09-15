# React & Next.js 学习项目

这是一个专为学习React和Next.js设计的教程项目，采用了最新的Next.js 15.5.3版本和React 19。

## 项目概述

本项目是一个交互式学习平台，通过实际示例帮助你理解React和Next.js的核心概念。项目包含以下主要部分：

1. **React基础** - 学习组件、Props、状态管理和生命周期
2. **Next.js特性** - 探索服务器组件、路由系统和数据获取
3. **API路由演示** - 学习如何创建和使用Next.js API路由

## 系统要求

- Node.js 18.18.0或更高版本（推荐使用Node.js 20+）
- npm 9.0.0或更高版本

## 开始使用

1. 确保你的Node.js版本符合要求：

```bash
node -v
# 应该显示v18.18.0或更高版本
```

2. 安装依赖：

```bash
npm install
```

3. 启动开发服务器：

```bash
npm run dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看项目

## 项目结构

```
my-app/
├── src/
│   ├── app/                  # Next.js App Router目录
│   │   ├── page.tsx          # 主页
│   │   ├── react-basics/     # React基础页面
│   │   ├── nextjs-features/  # Next.js特性页面
│   │   ├── api-demo/         # API演示页面
│   │   └── api/              # API路由
│   ├── components/           # 可复用组件
│   │   ├── Counter.tsx       # 计数器组件示例
│   │   └── Navigation.tsx    # 导航组件
├── public/                   # 静态资源
└── package.json              # 项目依赖和脚本
```

## 学习路径

1. **开始于主页** - 了解项目概述和导航
2. **React基础** - 学习React的核心概念
3. **Next.js特性** - 探索Next.js的独特功能
4. **API路由演示** - 了解如何创建和使用API

## 技术栈

- **React 19** - 用于构建用户界面的JavaScript库
- **Next.js 15.5.3** - React框架，提供服务器渲染、路由等功能
- **TypeScript** - 类型安全的JavaScript超集
- **Tailwind CSS** - 实用优先的CSS框架

## 扩展学习

完成本项目后，你可以尝试以下扩展：

1. 添加数据库连接（如MongoDB或PostgreSQL）
2. 实现用户认证系统
3. 创建更复杂的表单和状态管理
4. 添加测试（使用Jest和React Testing Library）
5. 部署到Vercel或其他托管平台

## 资源链接

- [React官方文档](https://react.dev)
- [Next.js官方文档](https://nextjs.org/docs)
- [TypeScript文档](https://www.typescriptlang.org/docs)
- [Tailwind CSS文档](https://tailwindcss.com/docs)

## 注意事项

本项目使用了Next.js的App Router，这是Next.js的最新路由系统，与Pages Router有所不同。如果你之前使用的是Pages Router，请注意两者之间的区别。