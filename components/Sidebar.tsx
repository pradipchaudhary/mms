import Link from "next/link";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Users", href: "/dashboard/users" },
  { name: "Projects", href: "/dashboard/projects" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">My App</h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-3 py-2 rounded hover:bg-gray-800 transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}