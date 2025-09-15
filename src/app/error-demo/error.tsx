'use client';

import { useEffect } from 'react';

// 定义错误组件的Props类型
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 可以在这里记录错误到错误报告服务
    console.error('页面错误:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">出错了！</h2>
          <p className="text-gray-600 mb-6">
            {error.message || '发生了意外错误，请稍后再试。'}
          </p>
          
          <div className="mb-6">
            <button
              onClick={reset}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              重试
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            错误ID: {error.digest || '未知'}
          </p>
        </div>
      </div>
    </div>
  );
}