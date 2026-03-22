export default function Header() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Welcome, User</span>
      </div>
    </header>
  );
}