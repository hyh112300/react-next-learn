import Counter from '@/components/Counter';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">React & Next.js 学习</h1>
        <div className="relative h-10 w-24" style={{ position: 'relative' }}>
          <Image 
            src="/vercel.svg" 
            alt="Vercel Logo" 
            fill
            style={{objectFit: 'contain'}}
          />
        </div>
      </div>
      
      <p className="mb-8 text-lg">欢迎来到React和Next.js学习之旅！这个项目将帮助你从零开始学习现代前端开发。</p>
      
      <div className="mb-8">
        <Link href="/learning-path" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
          👉 查看完整学习路径
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href="/react-basics" className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-blue-50">
          <h2 className="text-2xl font-semibold mb-2">React基础</h2>
          <p className="text-gray-700">学习React的核心概念，包括组件、Props、状态管理和生命周期。</p>
          <p className="mt-4 text-blue-600 font-medium">开始学习 →</p>
        </Link>
        
        <Link href="/advanced-react" className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-indigo-50">
          <h2 className="text-2xl font-semibold mb-2">React高级</h2>
          <p className="text-gray-700">深入学习React高级特性，包括Hooks、性能优化和状态管理。</p>
          <p className="mt-4 text-indigo-600 font-medium">进阶学习 →</p>
        </Link>
        
        <Link href="/nextjs-features" className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-green-50">
          <h2 className="text-2xl font-semibold mb-2">Next.js特性</h2>
          <p className="text-gray-700">探索Next.js框架的强大功能，包括服务器组件、路由系统和数据获取。</p>
          <p className="mt-4 text-green-600 font-medium">开始探索 →</p>
        </Link>
        
        <Link href="/api-demo" className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-purple-50">
          <h2 className="text-2xl font-semibold mb-2">API路由</h2>
          <p className="text-gray-700">学习如何使用Next.js的API路由功能创建后端API端点。</p>
          <p className="mt-4 text-purple-600 font-medium">查看演示 →</p>
        </Link>
        
        <Link href="/loading-demo" className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-orange-50">
          <h2 className="text-2xl font-semibold mb-2">加载状态</h2>
          <p className="text-gray-700">学习如何优雅处理加载状态，提升用户体验。</p>
          <p className="mt-4 text-orange-600 font-medium">查看演示 →</p>
        </Link>
        
        <Link href="/error-demo" className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-red-50">
          <h2 className="text-2xl font-semibold mb-2">错误处理</h2>
          <p className="text-gray-700">学习Next.js的错误处理机制，包括错误边界和恢复。</p>
          <p className="mt-4 text-red-600 font-medium">查看演示 →</p>
        </Link>
        
        <Link href="/not-found" className="block p-6 border rounded-lg hover:shadow-md transition-shadow bg-yellow-50">
          <h2 className="text-2xl font-semibold mb-2">404页面</h2>
          <p className="text-gray-700">学习如何自定义404页面，提升用户体验。</p>
          <p className="mt-4 text-yellow-600 font-medium">查看演示 →</p>
        </Link>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">React状态管理示例</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">useState计数器</h3>
            <Counter />
          </div>
          
          <div className="p-6 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium mb-2">React状态管理</h3>
            <p className="text-gray-700 mb-4">
              这个计数器演示了React的基本状态管理功能。
              点击按钮可以增加、减少或重置计数器的值。
            </p>
            <Link 
              href="/react-basics"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              了解更多React基础 →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">学习资源</h2>
        <ul className="space-y-2">
          <li>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              React官方文档
            </a>
          </li>
          <li>
            <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Next.js官方文档
            </a>
          </li>
          <li>
            <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Tailwind CSS文档
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}