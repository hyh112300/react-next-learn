'use client';

import { useState } from 'react';
import Link from 'next/link';

// 模拟可能会抛出错误的组件
function ErrorProne({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    // 故意抛出错误
    throw new Error('这是一个故意抛出的错误，用于演示错误边界');
  }
  
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <p className="text-green-700">组件正常渲染，没有错误！</p>
    </div>
  );
}

export default function ErrorDemo() {
  const [shouldError, setShouldError] = useState(false);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Next.js 错误处理</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">错误边界演示</h2>
        <p className="mb-6">
          Next.js提供了内置的错误处理机制，通过<code className="bg-gray-100 px-1">error.js</code>文件创建错误边界。
          当组件抛出错误时，最近的错误边界会捕获它并显示备用UI。
        </p>
        
        <div className="mb-6 p-4 border rounded-lg bg-yellow-50">
          <h3 className="font-bold mb-2">如何工作</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>在路由段中创建<code className="bg-gray-100 px-1">error.js|tsx</code>文件</li>
            <li>导出一个默认的React组件作为错误UI</li>
            <li>错误组件接收<code className="bg-gray-100 px-1">error</code>和<code className="bg-gray-100 px-1">reset</code>属性</li>
            <li>使用<code className="bg-gray-100 px-1">reset()</code>函数尝试恢复错误</li>
          </ol>
        </div>
        
        <div className="mb-6">
          <button
            onClick={() => setShouldError(!shouldError)}
            className={`px-4 py-2 rounded ${
              shouldError 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            {shouldError ? '修复错误' : '触发错误'}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            点击按钮来触发或修复错误
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-3">组件状态:</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <code>{'<ErrorProne shouldError={' + shouldError + '} />'}</code>
            </div>
            <div className="p-4">
              {/* 这里会触发错误边界 */}
              <ErrorProne shouldError={shouldError} />
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">错误处理最佳实践</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">错误边界嵌套</h3>
            <p>
              可以在不同级别创建错误边界，以便更精细地控制错误处理范围。
              子路由的错误不会影响父路由的UI。
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">错误恢复</h3>
            <p>
              使用<code className="bg-gray-100 px-1">reset()</code>函数尝试恢复，
              它会重新渲染错误边界的内容。
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">错误日志</h3>
            <p>
              在错误组件中使用<code className="bg-gray-100 px-1">useEffect</code>
              将错误发送到日志服务或分析工具。
            </p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">全局错误处理</h3>
            <p>
              在根布局中创建<code className="bg-gray-100 px-1">error.js</code>
              可以捕获整个应用的错误。
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">其他错误处理机制</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">not-found.js</h3>
            <p className="mb-3">
              处理404错误，当调用<code className="bg-gray-100 px-1">notFound()</code>
              函数或访问不存在的路由时显示。
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`// app/not-found.tsx
export default function NotFound() {
  return <h1>页面未找到</h1>
}`}
            </pre>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">global-error.js</h3>
            <p className="mb-3">
              处理根布局中的错误，替换整个页面，包括根布局。
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm">
{`// app/global-error.tsx
'use client'
 
export default function GlobalError({
  error,
  reset,
}) {
  return (
    <html>
      <body>
        <h1>严重错误!</h1>
        <button onClick={reset}>
          重试
        </button>
      </body>
    </html>
  )
}`}
            </pre>
          </div>
        </div>
      </section>
      
      <div className="mt-10 flex justify-center">
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