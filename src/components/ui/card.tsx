import React from "react";

export const Card = ({ className = "", children }: any) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 shadow-sm bg-white p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ className = "", children }: any) => {
  return <div className={`p-2 ${className}`}>{children}</div>;
};
