/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar"; // Pastikan path sesuai
import {
  fetchDisasters,
  createDisaster,
  updateDisaster,
  deleteDisaster,
} from "../redux/disasterSlice";
import DisasterRow from "../components/DisasterRow";
import DisasterForm from "../components/DisasterForm";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { list: disasters, loading, error } = useSelector((state) => state.disasters);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    status: "active",
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchDisasters()).catch((err) => console.error("Failed to fetch disasters:", err));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(updateDisaster({ id: currentId, ...formData }));
      setEditing(false);
      setCurrentId(null);
    } else {
      const newId = disasters.length > 0 ? Math.max(...disasters.map((d) => d.id)) + 1 : 1;
      dispatch(createDisaster({ id: newId, ...formData }));
    }
    setFormData({ name: "", description: "", location: "", date: "", status: "active" });
    setFormVisible(false);
  };

  const handleEdit = (disaster) => {
    setFormData(disaster);
    setEditing(true);
    setCurrentId(disaster.id);
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteDisaster(id));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-700 py-10 px-4 ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-yellow-400 mb-10">
            Kebencanaan Gunung Merapi
          </h1>

          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-600 mb-6">Error: {error}</p>}

          <div className="flex justify-end mb-6">
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              onClick={() => {
                setFormVisible(!isFormVisible);
                setFormData({ name: "", description: "", location: "", date: "", status: "active" });
                setEditing(false);
                setCurrentId(null);
              }}
            >
              {isFormVisible ? "Tutup Form" : "Tambah Data"}
            </button>
          </div>

          {isFormVisible && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-10">
              <DisasterForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                editing={editing}
              />
            </div>
          )}

          <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
            <table className="min-w-full border-collapse bg-white text-sm">
              <thead className="bg-yellow-400 text-black">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Nama</th>
                  <th className="p-4 text-left">Deskripsi</th>
                  <th className="p-4 text-left">Lokasi</th>
                  <th className="p-4 text-left">Tanggal</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {disasters.length > 0 ? (
                  disasters.map((disaster) => (
                    <DisasterRow
                      key={disaster.id}
                      disaster={disaster}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(disaster.id)}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-900 py-4">
                      Tidak ada data tersedia
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;