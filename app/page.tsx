"use client";
import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("@/components/dashboard-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  ),
});

export default function Home() {
  return <DashboardPage />;
}
