import Link from 'next/link';

export default function RoutingGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Next.js 路由系统详解</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">App Router 基础</h2>
        <div className="p-4 border rounded-lg bg-blue-50 mb-6">
          <p className="mb-4">
            Next.js 13引入了全新的<strong>App Router</strong>，基于React服务器组件构建，
            提供了更强大的路由功能和更好的性能。
          </p>
          <p>
            App Router使用<strong>基于文件系统的路由</strong>，通过目录结构和特殊文件名定义路由。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">特殊文件</h3>
            <ul className="space-y-2">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">page.tsx</code>
                <p className="text-sm text-gray-600 mt-1">定义路由的UI，可以访问的页面</p>
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">layout.tsx</code>
                <p className="text-sm text-gray-600 mt-1">定义共享UI，包裹子路由</p>
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">loading.tsx</code>
                <p className="text-sm text-gray-600 mt-1">加载状态UI</p>
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">error.tsx</code>
                <p className="text-sm text-gray-600 mt-1">错误处理UI</p>
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">not-found.tsx</code>
                <p className="text-sm text-gray-600 mt-1">404页面</p>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">目录结构示例</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`app/
├── page.tsx           # 首页 (/)
├── layout.tsx         # 根布局
├── about/
│   └── page.tsx       # 关于页面 (/about)
├── blog/
│   ├── page.tsx       # 博客列表页 (/blog)
│   └── [slug]/
│       └── page.tsx   # 动态博客文章页 (/blog/:slug)`}
            </pre>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">路由类型</h2>
        
        <div className="space-y-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">1. 静态路由</h3>
            <p className="mb-2">预定义的固定路径</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">目录结构:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
{`app/about/page.tsx`}
                </pre>
              </div>
              <div>
                <p className="font-medium">访问URL:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
{`/about`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">2. 动态路由</h3>
            <p className="mb-2">使用方括号[param]定义动态路径段</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">目录结构:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
{`app/blog/[slug]/page.tsx`}
                </pre>
              </div>
              <div>
                <p className="font-medium">访问URL:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
{`/blog/my-first-post
/blog/learn-nextjs`}
                </pre>
              </div>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm">在页面组件中获取参数:</p>
              <pre className="bg-gray-100 p-2 rounded text-sm mt-1">
{`export default function Page({ params }: { 
  params: { slug: string } 
}) {
  return <h1>文章: {params.slug}</h1>
}`}
              </pre>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">3. 捕获所有路由</h3>
            <p className="mb-2">使用[...slug]捕获多个路径段</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">目录结构:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
{`app/docs/[...slug]/page.tsx`}
                </pre>
              </div>
              <div>
                <p className="font-medium">访问URL:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
{`/docs/feature/intro
/docs/api/auth/oauth`}
                </pre>
              </div>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm">在页面组件中获取参数:</p>
              <pre className="bg-gray-100 p-2 rounded text-sm mt-1">
{`export default function Page({ params }: {
  params: { slug: string[] }
}) {
  // /docs/feature/intro -> ['feature', 'intro']
  return <h1>文档: {params.slug.join('/')}</h1>
}`}
              </pre>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">4. 可选捕获路由</h3>
            <p className="mb-2">使用[[...slug]]定义可选的捕获路由</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">目录结构:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
{`app/shop/[[...slug]]/page.tsx`}
                </pre>
              </div>
              <div>
                <p className="font-medium">访问URL:</p>
                <pre className="bg-gray-100 p-2 rounded text-sm">
{`/shop
/shop/clothes
/shop/clothes/shirts`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">导航</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">Link组件</h3>
            <p className="mb-3">用于客户端导航，自动预取链接</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">首页</Link>
      <Link href="/about">关于</Link>
      <Link 
        href="/blog/hello-world"
        prefetch={false} // 禁用预取
      >
        博客文章
      </Link>
    </nav>
  );
}`}
            </pre>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">useRouter Hook</h3>
            <p className="mb-3">用于编程式导航（仅客户端组件）</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`'use client';

import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 处理登录逻辑...
    
    // 登录成功后导航
    router.push('/dashboard');
    
    // 其他方法:
    // router.back(); // 返回上一页
    // router.forward(); // 前进到下一页
    // router.refresh(); // 刷新当前页面
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
    </form>
  );
}`}
            </pre>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">路由组和并行路由</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">路由组</h3>
            <p className="mb-3">使用(folderName)创建不影响URL路径的组织结构</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx    # /about
│   └── contact/
│       └── page.tsx    # /contact
└── (shop)/
    ├── products/
    │   └── page.tsx    # /products
    └── cart/
        └── page.tsx    # /cart`}
            </pre>
            <p className="text-sm text-gray-600 mt-2">
              路由组允许你将相关路由分组，并为每个组创建独立的布局。
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">并行路由</h3>
            <p className="mb-3">使用@folderName创建可以同时渲染的路由</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`app/
├── page.tsx
├── layout.tsx
├── @modal/
│   └── login/
│       └── page.tsx
└── @sidebar/
    └── notifications/
        └── page.tsx`}
            </pre>
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm">在布局中使用:</p>
              <pre className="bg-gray-100 p-2 rounded text-sm mt-1">
{`export default function Layout({ 
  children, 
  modal, 
  sidebar 
}) {
  return (
    <div>
      {children}
      {modal}
      {sidebar}
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">路由处理器</h2>
        
        <div className="p-4 border rounded-lg mb-6">
          <h3 className="font-bold text-lg mb-2">API路由</h3>
          <p className="mb-3">
            在app目录中创建route.js|ts文件来定义API端点，支持各种HTTP方法
          </p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = [/* 用户数据 */];
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // 创建新用户...
  return NextResponse.json({ success: true }, { status: 201 });
}`}
          </pre>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/data-fetching" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            查看数据获取示例 →
          </Link>
        </div>
      </section>
    </div>
  );
}