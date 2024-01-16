const PageLoader = () => {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 h-12 w-12"></div>
      </div>
    );
  };
  
  export default PageLoader;