'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LoadingDemo() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    // 这里会触发loading.tsx的显示
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Next.js 加载状态</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">加载状态演示</h2>
        <p className="mb-6">
          Next.js提供了内置的加载状态处理机制，通过<code className="bg-gray-100 px-1">loading.js</code>文件创建加载UI。
          当页面或路由段加载时，会自动显示加载状态。
        </p>
        
        <div className="p-4 border rounded-lg bg-blue-50 mb-6">
          <h3 className="font-bold mb-2">如何工作</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>在路由段中创建<code className="bg-gray-100 px-1">loading.js|tsx</code>文件</li>
            <li>导出一个默认的React组件作为加载UI</li>
            <li>当路由内容加载时自动显示</li>
            <li>内容加载完成后自动隐藏</li>
          </ol>
        </div>
        
        <div className="p-4 border rounded-lg bg-green-50">
          <h3 className="font-bold mb-2">最佳实践</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>保持加载状态简洁明了</li>
            <li>使用动画提升用户体验</li>
            <li>避免复杂的计算或数据获取</li>
            <li>与错误处理结合使用</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">手动触发加载状态</h2>
        
        <div className="p-4 border rounded-lg">
          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 2000);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            点击重新加载
          </button>
          <p className="text-sm text-gray-500 mt-2">
            点击按钮手动触发加载状态
          </p>
        </div>
      </section>
      
      <div className="flex justify-center">
        <Link 
          href="/learning-path" 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          返回学习路径 →
        </Link>
      </div>
    </div>
  );
}