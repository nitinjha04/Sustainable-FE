import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-custom-bg text-center p-4">
      <div className="bg-custom-btn-2 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-lg mb-6">It might have been moved or deleted.</p>
        <a
          href="/"
          className="cursor-pointer bg-custom-btn text-white py-2 px-4 rounded hover:bg-custom-btn-3 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
