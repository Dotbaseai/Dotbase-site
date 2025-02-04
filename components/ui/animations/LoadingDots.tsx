"use client";

const LoadingDots = () => {
    return (
      <span className="inline-flex items-center">
        <span className="animate-[loadingDot_1s_infinite] opacity-0">.</span>
        <span className="animate-[loadingDot_1s_0.2s_infinite] opacity-0">.</span>
        <span className="animate-[loadingDot_1s_0.4s_infinite] opacity-0">.</span>
      </span>
    );
  };
  
  export default LoadingDots;