'use client';

import { useState, useEffect, useReducer, useCallback, useMemo, useRef } from 'react';

// 定义reducer函数和初始状态
type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoState = {
  todos: TodoType[];
  filter: 'all' | 'active' | 'completed';
};

type TodoAction = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' };

const initialState: TodoState = {
  todos: [],
  filter: 'all'
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

// 自定义Hook示例
function useLocalStorage<T>(key: string, initialValue: T) {
  // 状态初始化函数
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // 返回包装版的useState的setter函数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 允许函数式更新
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

// 性能优化组件示例
type TodoItemProps = {
  todo: TodoType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  console.log(`Rendering TodoItem: ${todo.text}`);
  
  return (
    <li className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mr-3 h-5 w-5"
        />
        <span className={todo.completed ? 'line-through text-gray-400' : ''}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        删除
      </button>
    </li>
  );
};

// 使用React.memo优化组件
const MemoizedTodoItem = React.memo(TodoItem);

export default function AdvancedReact() {
  // 使用useReducer管理复杂状态
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  // 使用自定义Hook
  const [savedTodos, setSavedTodos] = useLocalStorage<TodoType[]>('todos', []);
  
  // 使用useRef获取DOM元素和保存值
  const inputRef = useRef<HTMLInputElement>(null);
  const prevTodoCountRef = useRef<number>(0);
  
  // 使用useState管理简单状态
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  
  // 使用useCallback优化函数
  const handleToggle = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);
  
  const handleDelete = useCallback((id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);
  
  // 使用useMemo优化计算
  const filteredTodos = useMemo(() => {
    console.log('Filtering todos');
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);
  
  const stats = useMemo(() => {
    const total = state.todos.length;
    const completed = state.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const percentCompleted = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    return { total, completed, active, percentCompleted };
  }, [state.todos]);
  
  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo.trim() });
      setNewTodo('');
      // 使用ref聚焦输入框
      inputRef.current?.focus();
    }
  };
  
  // 使用useEffect处理副作用
  useEffect(() => {
    // 从localStorage加载todos
    if (savedTodos.length > 0 && state.todos.length === 0) {
      savedTodos.forEach(todo => {
        dispatch({ type: 'ADD_TODO', payload: todo.text });
        if (todo.completed) {
          dispatch({ type: 'TOGGLE_TODO', payload: todo.id });
        }
      });
    }
  }, [savedTodos]);
  
  useEffect(() => {
    // 保存todos到localStorage
    setSavedTodos(state.todos);
    
    // 记录前一个todo数量
    prevTodoCountRef.current = state.todos.length;
    
    // 清理函数示例
    return () => {
      console.log('Component will unmount or dependencies changed');
    };
  }, [state.todos, setSavedTodos]);
  
  // 暗黑模式效果
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    
    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, [darkMode]);
  
  return (
    <div className={`max-w-4xl mx-auto p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">React 高级特性</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded ${
            darkMode 
              ? 'bg-yellow-400 text-gray-900' 
              : 'bg-gray-800 text-white'
          }`}
        >
          {darkMode ? '🌞 亮色模式' : '🌙 暗色模式'}
        </button>
      </div>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">高级Hooks使用</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600' : ''}`}>
            <h3 className="font-bold text-lg mb-2">useReducer</h3>
            <p className="mb-2">用于管理复杂状态逻辑</p>
            <pre className={`text-xs p-2 rounded overflow-x-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {`const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'ACTION_TYPE', payload: data });`}
            </pre>
          </div>
          
          <div className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600' : ''}`}>
            <h3 className="font-bold text-lg mb-2">useMemo & useCallback</h3>
            <p className="mb-2">用于性能优化，避免不必要的重新计算和渲染</p>
            <pre className={`text-xs p-2 rounded overflow-x-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {`// 缓存计算结果
const value = useMemo(() => computeValue(a, b), [a, b]);
// 缓存函数引用
const handler = useCallback(() => doSomething(a, b), [a, b]);`}
            </pre>
          </div>
        </div>
        
        <div className={`p-4 border rounded-lg mb-6 ${darkMode ? 'border-gray-600' : ''}`}>
          <h3 className="font-bold text-lg mb-2">自定义Hook</h3>
          <p className="mb-2">将组件逻辑提取到可重用的函数中</p>
          <pre className={`text-xs p-2 rounded overflow-x-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            {`function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    // 初始化逻辑...
  });
  
  const setValue = value => {
    // 设置值逻辑...
  };
  
  return [storedValue, setValue];
}`}
          </pre>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Todo应用示例</h2>
        
        <div className={`mb-6 p-4 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700' : 'bg-blue-50'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">任务统计</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
                className={`px-3 py-1 rounded ${
                  state.filter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                全部 ({stats.total})
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
                className={`px-3 py-1 rounded ${
                  state.filter === 'active' 
                    ? 'bg-blue-500 text-white' 
                    : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                未完成 ({stats.active})
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
                className={`px-3 py-1 rounded ${
                  state.filter === 'completed' 
                    ? 'bg-blue-500 text-white' 
                    : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}
              >
                已完成 ({stats.completed})
              </button>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${stats.percentCompleted}%` }}
            ></div>
          </div>
          <p className="text-sm text-right">
            完成率: {stats.percentCompleted}%
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex">
            <input
              ref={inputRef}
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="添加新任务..."
              className={`flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600' : ''
              }`}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              添加
            </button>
          </div>
        </form>
        
        <div className={`border rounded-lg overflow-hidden ${darkMode ? 'border-gray-600' : ''}`}>
          {filteredTodos.length === 0 ? (
            <p className="p-4 text-center text-gray-500">
              {state.filter === 'all' 
                ? '没有任务，请添加新任务' 
                : state.filter === 'active'
                  ? '没有未完成的任务'
                  : '没有已完成的任务'
              }
            </p>
          ) : (
            <ul>
              {filteredTodos.map(todo => (
                <MemoizedTodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">React性能优化技巧</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600' : ''}`}>
            <h3 className="font-bold text-lg mb-2">React.memo</h3>
            <p>当props不变时，阻止组件重新渲染</p>
            <pre className={`text-xs p-2 mt-2 rounded overflow-x-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {`const MemoizedComponent = React.memo(Component);`}
            </pre>
          </div>
          
          <div className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600' : ''}`}>
            <h3 className="font-bold text-lg mb-2">列表渲染优化</h3>
            <p>使用稳定的key和虚拟化技术</p>
            <pre className={`text-xs p-2 mt-2 rounded overflow-x-auto ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {`{items.map(item => (
  <Component key={item.id} {...item} />
))}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}