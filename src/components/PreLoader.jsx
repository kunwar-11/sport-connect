import React from "react";

export const PreLoader = () => {
  let circleCommonClasses =
    "h-2.5 w-2.5 sm:h-4 sm:w-4 bg-purple-500   rounded-full";

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
};
