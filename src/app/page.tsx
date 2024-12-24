"use client";

import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });
      const data = await res.json();
      setResponse(data.message);
    } catch {
      setResponse("Failed to fetch data");
    }
  };

  return (
    // TODO: handle light dark mode correctly
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Fire Truck Invoice Generator</h1>
      <div className="flex gap-4 items-center mb-4 w-full max-w-md">
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste a link"
          className="flex-grow border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
      {response && (
        <p className="mt-4 text-green-600 font-medium">Response: {response}</p>
      )}
    </div>
  );
}
