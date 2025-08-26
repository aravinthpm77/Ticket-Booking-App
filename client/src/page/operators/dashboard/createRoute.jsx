import React from "react";
import { FaTimes } from "react-icons/fa";

const RouteModal = ({ open, onClose, onSubmit, routeForm, onChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl p-8 bg-white border border-gray-100 shadow-2xl rounded-2xl animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-lg text-red-500 transition top-4 right-4 hover:text-red-600"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h3 className="mb-6 text-2xl font-bold text-center text-sky-700">
          Add New Route
        </h3>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* From/To */}
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-600">Route</div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="from"
                placeholder="From"
                value={routeForm.from}
                onChange={onChange}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="text"
                name="to"
                placeholder="To"
                value={routeForm.to}
                onChange={onChange}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>
          </div>
          {/* Departure/Arrival */}
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-600">Departure & Arrival</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-xs text-gray-500">Departure Date</label>
                <input
                  type="date"
                  name="depDate"
                  value={routeForm.depDate || ""}
                  onChange={onChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                  required
                />
                <label className="block mt-2 mb-1 text-xs text-gray-500">Departure Time</label>
                <input
                  type="time"
                  name="depTime"
                  value={routeForm.depTime || ""}
                  onChange={onChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-xs text-gray-500">Arrival Date</label>
                <input
                  type="date"
                  name="arrDate"
                  value={routeForm.arrDate || ""}
                  onChange={onChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                  required
                />
                <label className="block mt-2 mb-1 text-xs text-gray-500">Arrival Time</label>
                <input
                  type="time"
                  name="arrTime"
                  value={routeForm.arrTime || ""}
                  onChange={onChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
            </div>
          </div>
          {/* Price */}
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-600">Price</div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={routeForm.price}
              onChange={onChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
              required
              min={0}
            />
          </div>
          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white transition rounded-lg shadow bg-sky-600 hover:bg-sky-700"
            >
              Add Route
            </button>
          </div>
        </form>
      </div>
      {/* Optional: Add a fade-in animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.25s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(40px) scale(0.98);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
      `}</style>
    </div>
  );
};

export default RouteModal;