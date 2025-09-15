import Link from 'next/link';

export default function LearningPath() {
  // 学习路径数据
  const learningPaths = [
    {
      id: 1,
      title: '第1步：React基础',
      description: '学习React的核心概念和基本用法',
      link: '/react-basics',
      topics: [
        '组件与Props',
        '状态管理（useState）',
        '生命周期与副作用（useEffect）',
        '表单处理',
        '列表渲染'
      ]
    },
    {
      id: 2,
      title: '第2步：React高级特性',
      description: '深入学习React的高级概念和性能优化',
      link: '/advanced-react',
      topics: [
        '高级Hooks使用',
        '性能优化技巧',
        '自定义Hook',
        'useReducer状态管理',
        'React.memo与记忆化'
      ]
    },
    {
      id: 3,
      title: '第3步：Next.js特性',
      description: '探索Next.js框架的独特功能',
      link: '/nextjs-features',
      topics: [
        '服务器组件与客户端组件',
        '文件系统路由',
        '数据获取',
        '静态与动态渲染',
        'Next.js内置组件'
      ]
    },
    {
      id: 4,
      title: '第4步：Next.js路由系统',
      description: '深入了解Next.js的App Router路由系统',
      link: '/routing-guide',
      topics: [
        '文件系统路由基础',
        '动态路由与参数',
        '路由组与并行路由',
        '特殊文件（layout, loading, error）',
        '导航与链接'
      ]
    },
    {
      id: 5,
      title: '第5步：数据获取',
      description: '学习Next.js中的数据获取方式',
      link: '/data-fetching',
      topics: [
        '服务器组件数据获取',
        '客户端组件数据获取',
        '数据缓存与重新验证',
        '并行数据获取',
        '数据获取模式'
      ]
    },
    {
      id: 6,
      title: '第6步：错误处理',
      description: '学习Next.js的错误处理机制',
      link: '/error-demo',
      topics: [
        '错误边界',
        'error.js特殊文件',
        '错误恢复',
        'not-found处理',
        '全局错误处理'
      ]
    },
    {
      id: 7,
      title: '第7步：API路由',
      description: '学习如何创建和使用Next.js API路由',
      link: '/api-demo',
      topics: [
        'API路由基础',
        'GET请求处理',
        'POST请求处理',
        '前端与API交互',
        '错误处理'
      ]
    },
    {
      id: 8,
      title: '第8步：404处理',
      description: '学习如何自定义404页面',
      link: '/not-found',
      topics: [
        'not-found.js特殊文件',
        '自定义404页面',
        '手动触发404',
        '404页面设计',
        '用户体验优化'
      ]
    },
    {
      id: 9,
      title: '第9步：加载状态',
      description: '学习如何优雅处理加载状态',
      link: '/loading-demo',
      topics: [
        'loading.js特殊文件',
        '加载动画设计',
        '骨架屏实现',
        '加载状态优化',
        '用户体验提升'
      ]
    },
    {
      id: 10,
      title: '第10步：进阶项目',
      description: '构建更复杂的应用（即将推出）',
      link: '#',
      topics: [
        '全局状态管理',
        '认证与授权',
        '数据库集成',
        '部署与优化',
        '测试'
      ],
      comingSoon: true
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">React & Next.js 学习路径</h1>
      
      <p className="text-lg mb-8">
        欢迎开始你的React和Next.js学习之旅！本学习路径将引导你从基础概念到高级特性，
        通过实际示例帮助你掌握现代前端开发技术。按照以下步骤进行学习，每完成一步，
        你将获得更深入的理解和实践经验。
      </p>
      
      <div className="space-y-12 mb-12">
        {learningPaths.map((path) => (
          <div key={path.id} className="border rounded-lg overflow-hidden">
            <div className={`p-6 ${path.comingSoon ? 'bg-gray-100' : 'bg-blue-50'}`}>
              <h2 className="text-2xl font-bold mb-2">{path.title}</h2>
              <p className="text-gray-700 mb-4">{path.description}</p>
              
              {path.comingSoon ? (
                <span className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded">
                  即将推出
                </span>
              ) : (
                <Link 
                  href={path.link}
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  开始学习
                </Link>
              )}
            </div>
            
            <div className="p-6 border-t">
              <h3 className="font-semibold mb-3">你将学习：</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {path.topics.map((topic, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block mr-2 text-green-500">✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">学习建议</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="inline-block mr-2 text-yellow-500">•</span>
            <span>每个主题完成后，尝试修改代码并观察结果</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block mr-2 text-yellow-500">•</span>
            <span>参考官方文档深入学习感兴趣的主题</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block mr-2 text-yellow-500">•</span>
            <span>尝试创建自己的小项目来巩固所学知识</span>
          </li>
          <li className="flex items-start">
            <span className="inline-block mr-2 text-yellow-500">•</span>
            <span>加入React和Next.js社区，与其他开发者交流</span>
          </li>
        </ul>
      </div>
    </div>
  );
}