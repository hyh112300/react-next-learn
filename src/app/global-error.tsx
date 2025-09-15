'use client';

import { useEffect } from 'react';
import Link from 'next/link';

// 定义全局错误组件的Props类型
interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error('全局错误:', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">严重错误</h1>
          <p className="text-gray-600 mb-6">
            应用程序发生严重错误，请尝试以下操作：
          </p>
          
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              重试
            </button>
            
            <Link 
              href="/"
              className="block w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              返回首页
            </Link>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-sm font-medium text-gray-900 mb-2">错误详情</h2>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">消息:</span> {error.message}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">错误ID:</span> {error.digest || '未知'}
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}