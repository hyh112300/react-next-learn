'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  // 导航链接配置
  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/learning-path', label: '学习路径' },
    { href: '/react-basics', label: 'React基础' },
    { href: '/advanced-react', label: 'React高级' },
    { href: '/nextjs-features', label: 'Next.js特性' },
    { href: '/routing-guide', label: '路由指南' },
    { href: '/data-fetching', label: '数据获取' },
    { href: '/loading-demo', label: '加载状态' },
    { href: '/error-demo', label: '错误处理' },
    { href: '/not-found', label: '404页面' },
    { href: '/api-demo', label: 'API演示' },
  ];
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-blue-600">
                React学习
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* 移动端导航 */}
      <div className="sm:hidden border-t">
        <div className="flex justify-around py-2">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}