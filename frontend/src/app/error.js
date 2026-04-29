"use client";

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Next.js Error Boundary Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <div className="bg-black/50 p-6 rounded-lg max-w-2xl w-full border border-red-900/30">
        <p className="text-red-400 font-mono text-sm break-words">
          {error.message || "Unknown Error"}
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="mt-8 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
      >
        Try again
      </button>
    </div>
  );
}
