'use client';

import { useState, useEffect } from 'react';

// 定义用户类型
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function ApiDemo() {
  // 状态管理
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '用户'
  });
  
  // 获取用户数据
  const fetchUsers = async (roleFilter?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // 构建API URL
      let url = '/api/users';
      if (roleFilter && roleFilter !== 'all') {
        url += `?role=${encodeURIComponent(roleFilter)}`;
      }
      
      // 发送请求
      const response = await fetch(url);
      
      // 检查响应状态
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }
      
      // 解析响应数据
      const data = await response.json();
      setUsers(data.users || []);
      
      // 测试hello API
      const helloResponse = await fetch('/api/hello');
      const helloData = await helloResponse.json();
      console.log('Hello API响应:', helloData);
      
      // 测试hello API
      const helloResponse = await fetch('/api/hello');
      const helloData = await helloResponse.json();
      console.log('Hello API响应:', helloData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取用户数据失败');
    } finally {
      setLoading(false);
    }
  };
  
  // 创建新用户
  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.name || !formData.email) {
      setError('姓名和邮箱是必填字段');
      return;
    }
    
    try {
      // 发送POST请求
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // 检查响应状态
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '创建用户失败');
      }
      
      // 重置表单
      setFormData({
        name: '',
        email: '',
        role: '用户'
      });
      
      // 重新获取用户列表
      fetchUsers(filter !== 'all' ? filter : undefined);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建用户失败');
    }
  };
  
  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 处理过滤器变化
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    fetchUsers(newFilter !== 'all' ? newFilter : undefined);
  };
  
  // 组件挂载时获取数据
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Next.js API路由演示</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">API路由基础</h2>
        <div className="p-4 border rounded-lg bg-yellow-50">
          <p className="mb-4">Next.js允许你在<code className="bg-gray-100 px-1">app/api</code>目录下创建API端点。这些API路由在服务器上运行，可以安全地访问数据库和其他后端资源。</p>
          <p>本例中的API端点: <code className="bg-gray-100 px-1">/api/users</code></p>
        </div>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">用户列表</h2>
          
          <div className="mb-4">
            <label className="block mb-1">按角色筛选:</label>
            <select 
              value={filter}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="all">全部</option>
              <option value="用户">用户</option>
              <option value="管理员">管理员</option>
            </select>
          </div>
          
          {loading ? (
            <p className="text-center py-4">加载中...</p>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              <p>{error}</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">姓名</th>
                    <th className="p-2 text-left">邮箱</th>
                    <th className="p-2 text-left">角色</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
                        没有找到用户
                      </td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id} className="border-t">
                        <td className="p-2">{user.id}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.role}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">添加用户</h2>
          
          <form onSubmit={createUser} className="p-4 border rounded-lg">
            {error && (
              <div className="p-3 mb-4 bg-red-100 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block mb-1">姓名:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">邮箱:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">角色:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="用户">用户</option>
                <option value="管理员">管理员</option>
              </select>
            </div>
            
            <button 
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              创建用户
            </button>
          </form>
          
          <div className="mt-6 p-4 border rounded-lg bg-blue-50">
            <h3 className="font-bold mb-2">API调用说明</h3>
            <p className="mb-2">提交表单时，会向<code className="bg-gray-100 px-1">/api/users</code>发送POST请求。</p>
            <p>服务器端的API路由处理请求并返回响应。</p>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Hello API示例</h4>
              <pre className="p-2 rounded text-sm overflow-x-auto" style={{ backgroundColor: 'white' }}>
                {JSON.stringify({ message: 'Hello from Next.js API!', timestamp: new Date().toISOString() }, null, 2)}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}