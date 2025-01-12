/* eslint-disable react/prop-types */
import React from "react";

const DisasterRow = ({ disaster, onEdit, onDelete }) => {
  // Fungsi untuk mengonfirmasi penghapusan
  const handleDelete = () => {
    const confirmed = window.confirm(
      'Serius Mau di hapus?'
    );
    if (confirmed) {
      onDelete(disaster.id); // Memanggil fungsi onDelete jika konfirmasi OK
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{disaster.id}</td>
      <td className="p-4">{disaster.name}</td>
      <td className="p-4">{disaster.description}</td>
      <td className="p-4">{disaster.location}</td>
      <td className="p-4">{new Date(disaster.date).toLocaleString()}</td>
      <td className="p-4">{disaster.status}</td>
      <td className="p-4">
        <button
          onClick={() => onEdit(disaster)}
          className="bg-yellow-400 text-white py-1 px-3 rounded-md mr-2 hover:bg-yellow-500 transition"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DisasterRow;

