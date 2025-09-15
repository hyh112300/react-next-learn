import { NextRequest, NextResponse } from 'next/server';

// 模拟数据库中的用户数据
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '用户' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '管理员' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
];

export async function GET(request: NextRequest) {
  // 获取URL中的查询参数
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get('role');
  
  // 如果有role参数，则过滤用户
  let filteredUsers = users;
  if (role) {
    filteredUsers = users.filter(user => user.role === role);
  }
  
  // 返回JSON响应
  return NextResponse.json({
    users: filteredUsers,
    total: filteredUsers.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();
    
    // 验证必填字段
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: '姓名和邮箱是必填字段' },
        { status: 400 }
      );
    }
    
    // 创建新用户（模拟）
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
      role: body.role || '用户'
    };
    
    // 在实际应用中，这里会将用户保存到数据库
    users.push(newUser);
    
    // 返回成功响应
    return NextResponse.json({
      message: '用户创建成功',
      user: newUser
    }, { status: 201 });
    
  } catch (error) {
    // 处理错误
    return NextResponse.json(
      { error: '请求处理失败' },
      { status: 500 }
    );
  }
}