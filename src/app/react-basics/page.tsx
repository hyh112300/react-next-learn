'use client';

import { useState, useEffect } from 'react';

// 定义一个简单的Props接口
interface UserCardProps {
  name: string;
  email: string;
  role?: string; // 可选属性
}

// 创建一个接收props的组件
function UserCard({ name, email, role = '用户' }: UserCardProps) {
  return (
    <div className="border p-4 rounded-lg mb-4 bg-white shadow-sm">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600">{email}</p>
      <p className="text-sm text-gray-500">角色: {role}</p>
    </div>
  );
}

// 创建一个使用useEffect的组件
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // 组件挂载时启动计时器
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // 组件卸载时清除计时器
    return () => clearInterval(timer);
  }, []); // 空依赖数组表示只在组件挂载和卸载时执行
  
  return (
    <div className="mb-6 p-4 border rounded-lg bg-blue-50">
      <h3 className="font-bold mb-2">useEffect示例：计时器</h3>
      <p>页面已加载 {seconds} 秒</p>
    </div>
  );
}

// 创建一个表单组件
function UserForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [users, setUsers] = useState<Array<{username: string, email: string}>>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.email) {
      setUsers(prev => [...prev, formData]);
      setFormData({ username: '', email: '' });
    }
  };
  
  return (
    <div className="mb-8">
      <h3 className="font-bold text-xl mb-4">表单处理</h3>
      
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg">
        <div className="mb-4">
          <label className="block mb-1">用户名:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">邮箱:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button 
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          添加用户
        </button>
      </form>
      
      <div>
        <h4 className="font-semibold mb-2">用户列表:</h4>
        {users.length === 0 ? (
          <p className="text-gray-500">暂无用户</p>
        ) : (
          users.map((user, index) => (
            <UserCard 
              key={index} 
              name={user.username} 
              email={user.email} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function ReactBasics() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">React基础概念</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">组件 & Props</h2>
        <p className="mb-4">React组件可以接收参数，称为props：</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserCard name="张三" email="zhangsan@example.com" />
          <UserCard name="李四" email="lisi@example.com" role="管理员" />
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Hooks: useState & useEffect</h2>
        <p className="mb-4">React Hooks让函数组件可以使用状态和其他React特性：</p>
        
        <Timer />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">表单处理 & 列表渲染</h2>
        <UserForm />
      </section>
    </div>
  );
}