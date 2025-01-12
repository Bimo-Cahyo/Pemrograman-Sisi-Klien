/* eslint-disable react/prop-types */
import React from "react";

const DisasterForm = ({ formData, onInputChange, onSubmit, editing }) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className="bg-white shadow-lg rounded-xl p-8 border border-gray-900"
    >
      <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
        {editing ? "Edit Disaster" : "Tambah Data"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-900 font-medium mb-2">Nama</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          placeholder="masukan nama"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Deskripsi</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          className="w-full p-3 border border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none transition h-32"
          placeholder="Masukkan deskripsi bencana"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Lokasi</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={onInputChange}
          className="w-full p-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          placeholder="Masukkan lokasi bencana"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Tanggal</label>
        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={onInputChange}
          className="w-full p-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={onInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          required
        >
          <option value="active">Aktif</option>
          <option value="resolved">Terselesaikan</option>
          <option value="inactive">Tidak Aktif</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-yellow-300 text-black py-3 rounded-lg shadow-md hover:bg-yellow-600 hover:shadow-lg transition duration-300 font-semibold"
      >
        {editing ? "Update Disaster" : "Tambah Data"}
      </button>
    </form>
  );
};

export default DisasterForm;
