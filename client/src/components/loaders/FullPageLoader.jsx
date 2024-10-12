const FullPageLoader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center backdrop-blur-sm bg-black/75 fixed top-0 left-0 z-30">
      <span className="text-2xl text-white animate-ping">Loading...</span>
    </div>
  );
};

export default FullPageLoader;
