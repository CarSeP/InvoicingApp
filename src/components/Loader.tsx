function LoaderComponent() {
  return (
    <div className="flex justify-center items-center flex-row w-full gap-2 h-full">
      <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}

export default LoaderComponent;
