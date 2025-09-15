export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <h2 className="text-xl font-medium text-gray-900">加载中...</h2>
        <p className="text-gray-600 mt-2">请稍候，内容正在加载</p>
      </div>
    </div>
  );
}