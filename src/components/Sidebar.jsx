import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login"); // Arahkan ke halaman login saat logout
  };

  return (
    <div className="fixed h-screen w-64 bg-gray-800 text-white flex flex-col justify-between p-4">
      {/* Bagian atas Sidebar */}
      <div>
        <h1 className="text-2xl font-bold text-center py-4">Menu</h1>
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer rounded">
            Dashboard
          </li>
        </ul>
      </div>

      {/* Tombol Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
