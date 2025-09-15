// 这是一个服务器组件，展示Next.js的数据获取方式

import Link from 'next/link';

// 模拟从外部API获取数据的函数
async function fetchPosts() {
  // 在实际应用中，这里会调用真实的API
  // 由于这是服务器组件，这个函数在服务器端执行
  // 使用延时模拟网络请求
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 1,
      title: '理解React服务器组件',
      excerpt: 'React服务器组件是React的新特性，允许组件在服务器上渲染，减少客户端JavaScript的大小。',
      author: '张三',
      date: '2025-09-10'
    },
    {
      id: 2,
      title: 'Next.js App Router详解',
      excerpt: 'App Router是Next.js的新路由系统，基于React服务器组件和嵌套路由。',
      author: '李四',
      date: '2025-09-12'
    },
    {
      id: 3,
      title: '使用Next.js构建高性能Web应用',
      excerpt: '本文探讨如何利用Next.js的各种优化功能来构建快速、可靠的Web应用。',
      author: '王五',
      date: '2025-09-14'
    }
  ];
}

// 模拟获取用户数据
async function fetchUser() {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    name: '访客用户',
    role: '读者',
    joinDate: '2025-01-01'
  };
}

export default async function DataFetching() {
  // 并行数据获取
  const postsPromise = fetchPosts();
  const userPromise = fetchUser();
  
  // 等待所有数据
  const [posts, user] = await Promise.all([postsPromise, userPromise]);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Next.js 数据获取</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">服务器组件中的数据获取</h2>
        <div className="p-4 border rounded-lg bg-yellow-50 mb-6">
          <p className="mb-2">在Next.js的服务器组件中，你可以直接使用async/await获取数据：</p>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// 服务器组件
export default async function Page() {
  // 直接使用async/await获取数据
  const data = await fetchData();
  
  return <div>{data.title}</div>;
}`}
          </pre>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">优点</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>无需客户端状态管理</li>
              <li>无需加载状态处理</li>
              <li>减少客户端JavaScript</li>
              <li>直接访问后端资源</li>
              <li>改进SEO（搜索引擎优化）</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">注意事项</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>不能使用浏览器API</li>
              <li>不能使用事件处理程序</li>
              <li>不能使用React状态和效果</li>
              <li>需要处理数据刷新策略</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">数据获取示例</h2>
        
        <div className="p-4 border rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">当前用户</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {user.role}
            </span>
          </div>
          <p>欢迎, <strong>{user.name}</strong></p>
          <p className="text-sm text-gray-500">加入日期: {user.joinDate}</p>
        </div>
        
        <h3 className="font-bold text-xl mb-4">博客文章</h3>
        <div className="space-y-6">
          {posts.map(post => (
            <article key={post.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold mb-2">{post.title}</h4>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>作者: {post.author}</span>
                <span>发布于: {post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">数据获取方法</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">1. 服务器组件</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto mb-2">
{`// 直接在服务器组件中获取数据
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return <div>{json.title}</div>;
}`}
            </pre>
            <p className="text-sm text-gray-600">适用于：初始页面加载的数据</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">2. 客户端组件</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto mb-2">
{`'use client';

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    }
    
    fetchData();
  }, []);
  
  if (!data) return <div>加载中...</div>;
  
  return <div>{data.title}</div>;
}`}
            </pre>
            <p className="text-sm text-gray-600">适用于：用户交互后需要的数据</p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">数据缓存与重新验证</h2>
        
        <div className="p-4 border rounded-lg bg-green-50 mb-6">
          <h3 className="font-bold text-lg mb-2">Next.js数据缓存</h3>
          <p className="mb-4">Next.js提供了多种数据缓存和重新验证策略：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>默认缓存：</strong> 
              <code className="bg-gray-100 px-1">fetch()</code> 请求默认被缓存
            </li>
            <li>
              <strong>重新验证策略：</strong>
              <ul className="list-circle pl-5 mt-1 space-y-1">
                <li>基于时间: <code className="bg-gray-100 px-1">{ "{ next: { revalidate: 60 } }" }</code></li>
                <li>按需: <code className="bg-gray-100 px-1">revalidatePath('/blog')</code></li>
              </ul>
            </li>
            <li>
              <strong>禁用缓存：</strong> 
              <code className="bg-gray-100 px-1">{ "{ cache: 'no-store' }" }</code>
            </li>
          </ul>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/api-demo" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            查看API路由示例 →
          </Link>
        </div>
      </section>
    </div>
  );
}