import React from "react";

const BusModal = ({ open, onClose, onSubmit, busForm, onChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h3 className="mb-4 text-xl font-bold text-gray-800">Add New Bus</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Bus Name"
            value={busForm.name}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={busForm.type}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="number"
            name="seats"
            placeholder="Seats"
            value={busForm.seats}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded"
            required
            min={1}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 text-white rounded bg-sky-600">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusModal;