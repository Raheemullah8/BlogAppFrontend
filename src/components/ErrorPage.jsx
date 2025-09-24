import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage({ message = "Something went wrong!", code = 500 }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-error">{code}</h1>
        <p className="mt-4 text-lg font-semibold">{message}</p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary mt-6"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
