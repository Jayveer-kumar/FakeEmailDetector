import { useEffect, useState } from "react";

import Sidebar from "../../Components/Admin/Sidebar";
import AdminCard from "../../Components/Admin/AdminCard";
import SkeletonCard from "./SkeletonCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);  
  const [stats, setStats] = useState({
    totalEmail: 0,
    legitCount: 0,
    suspiciousCount: 0,
    todayCount: 0,
    recentRequests: [],
    dailyStats: [],
  });

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    startDate: "",
    endDate: "",
  });

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [stats, filters]);

  async function fetchAdminData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://fakeemaildetector.onrender.com/admin/adminRoute/adminPannel?key=jayveer7248060696"
      );

      const data = await res.json();
      console.log(data);
      setStats(data);
    } catch (error) {
      console.log("Error fetching admin data:", error);
    } finally{
        setIsLoading(false);
    }
  }

  // ---------------- Filters ----------------
  function applyFilters() {
    let data = [...stats.recentRequests];

    // Search
    if (filters.search.trim()) {
      data = data.filter((item) =>
        item.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status Filter
    if (filters.status !== "all") {
      const isSusp = filters.status === "suspicious";
      data = data.filter((item) => item.isSuspicious === isSusp);
    }

    // Date Filter
    if (filters.startDate) {
      data = data.filter(
        (item) =>
          new Date(item.timestamp) >= new Date(filters.startDate + "T00:00:00")
      );
    }

    if (filters.endDate) {
      data = data.filter(
        (item) =>
          new Date(item.timestamp) <= new Date(filters.endDate + "T23:59:59")
      );
    }

    setFilteredData(data);
  }

  function resetFilters() {
    setFilters({
      search: "",
      status: "all",
      startDate: "",
      endDate: "",
    });
  }

  const pieData = [
    { name: "Legit", value: stats.legitCount },
    { name: "Suspicious", value: stats.suspiciousCount },
  ];

  // ---------------- UI ----------------

  return (
    <div className="flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8 h-screen overflow-y-auto ml-64">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <AdminCard
                title="Total Emails Checked"
                value={stats.totalEmail}
              />
              <AdminCard title="Legit Emails" value={stats.legitCount} />
              <AdminCard
                title="Suspicious Emails"
                value={stats.suspiciousCount}
              />
              <AdminCard title="Today (24 hrs)" value={stats.todayCount} />
            </>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            {isLoading ? (
              <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-xl"></div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Daily Usage</h3>
                <LineChart width={500} height={300} data={stats.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </>
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow p-6">
            {isLoading ? (
              <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-xl"></div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-4">Legit vs Suspicious</h3>
                <PieChart width={400} height={300}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </>
            )}
          </div>
        </div>

        {/* ---------------- Recent Activity ---------------- */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold">Recent Activity</h3>

            {/* Filters */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search email..."
                className="border p-2 rounded-md"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />

              <select
                className="border p-2 rounded-md"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="all">All</option>
                <option value="legit">Legit</option>
                <option value="suspicious">Suspicious</option>
              </select>

              <input
                type="date"
                className="border p-2 rounded-md"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
              />

              <input
                type="date"
                className="border p-2 rounded-md"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
              />

              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left">
            <thead>
              <tr className="border-b hover:bg-gray-50 ripple-hover  ">
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <>
                  {/* Skeleton Row 1 */}
                  <tr className="animate-pulse border-b hover:bg-gray-50 ripple-hover">
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                  </tr>

                  {/* Skeleton Row 2 */}
                  <tr className="animate-pulse border-b hover:bg-gray-50 ripple-hover">
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                  </tr>
                </>
              ) : (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 ripple-hover"
                  >
                    <td className="p-3">{item.email}</td>

                    <td className="p-3">
                      {item.isSuspicious ? (
                        <span className="text-red-600 font-bold">
                          Suspicious
                        </span>
                      ) : (
                        <span className="text-green-600 font-bold">Legit</span>
                      )}
                    </td>

                    <td className="p-3">{item.confidence || 100}%</td>

                    <td className="p-3">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <p className="text-center py-5 text-gray-500">No records found</p>
          )}
        </div>
      </div>
    </div>
  );
}
