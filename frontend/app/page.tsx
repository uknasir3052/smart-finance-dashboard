"use client";

import { useEffect, useState } from "react";

interface HealthResponse {
  status: string;
  service: string;
}

export default function Home() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to reach FastAPI backend");
        return res.json();
      })
      .then((data: HealthResponse) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen p-12 bg-slate-50 font-sans">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Smart Finance Dashboard
        </h1>
        <p className="text-slate-500 mb-6">Environment Verification Check</p>

        {loading && <p className="text-blue-600">Connecting to FastAPI...</p>}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800">
            <p className="font-semibold">Backend Connection Established</p>
            <p className="text-sm mt-1">Status: {data.status}</p>
            <p className="text-sm">Service: {data.service}</p>
          </div>
        )}
      </div>
    </main>
  );
}