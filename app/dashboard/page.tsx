// src/app/dashboard/page.tsx
import AuthGuard from "@/components/AuthGuard";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="p-6">
        <h1>Dashboard</h1>
        <p>Only logged-in users can see this.</p>
        <LogoutButton />
      </div>
    </AuthGuard>
  );
}