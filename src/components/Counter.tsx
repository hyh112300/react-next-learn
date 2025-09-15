'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-medium mb-4">计数器示例</h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        
        <span className="text-xl font-bold">{count}</span>
        
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
      
      <div className="mt-4">
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          重置
        </button>
      </div>
    </div>
  );
}