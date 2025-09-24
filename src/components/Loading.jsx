import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="text-center">
        <span className="loading loading-infinity loading-lg text-primary"></span>
        <p className="mt-4 text-lg font-semibold text-gray-600">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}

export default Loading;
