// 这是一个服务器组件
// Next.js 默认所有组件都是服务器组件，除非使用'use client'指令

import Link from 'next/link';
import Image from 'next/image';

// 模拟从API获取数据的函数
async function getData() {
  // 在实际应用中，这里会调用真实的API
  // 由于这是服务器组件，这个函数在服务器端执行
  return {
    features: [
      {
        id: 1,
        title: '服务器组件',
        description: '默认情况下，Next.js中的组件都是React服务器组件，它们在服务器上渲染，减少了发送到客户端的JavaScript数量。'
      },
      {
        id: 2,
        title: '文件系统路由',
        description: 'Next.js使用基于文件系统的路由，app目录中的每个文件夹都代表一个路由段。'
      },
      {
        id: 3,
        title: '数据获取',
        description: 'Next.js简化了数据获取过程，支持服务器组件中的异步/await模式。'
      },
      {
        id: 4,
        title: '静态与动态渲染',
        description: 'Next.js支持静态渲染（构建时生成HTML）和动态渲染（请求时生成HTML）。'
      }
    ]
  };
}

export default async function NextjsFeatures() {
  // 获取数据
  const data = await getData();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Next.js 核心特性</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">服务器组件与客户端组件</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg bg-blue-50">
            <h3 className="font-bold text-lg mb-2">服务器组件</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>在服务器上渲染</li>
              <li>减少客户端JavaScript</li>
              <li>可以访问后端资源</li>
              <li>不能使用useState等客户端特性</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg bg-green-50">
            <h3 className="font-bold text-lg mb-2">客户端组件</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>使用'use client'指令</li>
              <li>可以使用浏览器API</li>
              <li>可以使用React hooks</li>
              <li>支持交互和事件处理</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Next.js 路由系统</h2>
        <div className="p-4 border rounded-lg">
          <p className="mb-4">Next.js使用基于文件系统的路由，app目录结构决定了应用的路由结构：</p>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto mb-4">
{`app/
├── page.tsx         # 主页 (/)
├── about/
│   └── page.tsx     # 关于页面 (/about)
└── blog/
    ├── page.tsx     # 博客列表页 (/blog)
    └── [slug]/
        └── page.tsx # 动态博客文章页 (/blog/:slug)`}
          </pre>
          <p>当前页面的路由是: <code className="bg-gray-100 px-2 py-1 rounded">/nextjs-features</code></p>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Next.js 特性列表</h2>
        <div className="space-y-4">
          {data.features.map(feature => (
            <div key={feature.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Next.js 内置组件</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">Link 组件</h3>
            <p className="mb-4">用于客户端导航，预加载页面：</p>
            <div className="flex space-x-4">
              <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                返回首页
              </Link>
              <Link href="/react-basics" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                React基础
              </Link>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">Image 组件</h3>
            <p className="mb-4">优化的图片组件，支持自动调整大小、懒加载等：</p>
            <div className="relative h-40 w-full">
              <Image 
                src="/vercel.svg" 
                alt="Vercel Logo" 
                fill
                style={{objectFit: 'contain'}}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}