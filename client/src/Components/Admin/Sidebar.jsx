import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Recent Activity", path: "/admin/activity" },
    { name: "Settings", path: "/admin/settings" }
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

      <ul className="space-y-4">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`p-2 rounded-md ${
              location.pathname === item.path
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-800 hover:text-white bg-gray-100"
            }`}
          >
            <Link to={item.path} className="block px-4 py-1">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanlasPgQjfGGU6anray6qKVVH-ZlTqmuTHw&s"
          className="w-10 h-10 rounded-full border"
        />

        <div>
          <p className="font-semibold text-gray-700">Jayveer</p>
          <p className="text-xs text-gray-500">admin@youremail.com</p>
        </div>
      </div>
    </div>
  );
}
