type LoadingProps = {
  progress?: number;
};

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <div className="w-64 h-4 bg-gray-200 rounded">
        <div
          className="h-4 bg-yellow-500 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {progress && progress < 100 ? `Processing... (${progress}%)` : "Routing..."}
      </p>
    </div>
  );
};

export default Loading;
