const BusModal = ({ open, onClose, onSubmit, busForm, onChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="w-full max-w-2xl p-8 bg-white shadow-2xl rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Add New Bus</h3>
            <p className="mt-1 text-sm text-gray-500">Register a new vehicle in your fleet.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-gray-500">Bus Name</label>
            <input
              type="text"
              name="bus_name"
              placeholder="KMRL Express"
              value={busForm.bus_name}
              onChange={onChange}
              className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500">Bus Number</label>
            <input
              type="text"
              name="bus_number"
              placeholder="TN 01 AB 1234"
              value={busForm.bus_number}
              onChange={onChange}
              className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500">Bus Type</label>
            <select
              name="bus_type"
              value={busForm.bus_type}
              onChange={onChange}
              className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
            >
              <option value="seater">Seater</option>
              <option value="sleeper">Sleeper</option>
              <option value="semi-sleeper">Semi Sleeper</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500">Layout</label>
            <select
              name="layout"
              value={busForm.layout}
              onChange={onChange}
              className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
            >
              {busForm.bus_type === "sleeper" ? (
                <>
                  <option value="1+1">1+1</option>
                  <option value="2+1">2+1</option>
                </>
              ) : (
                <>
                  <option value="2+2">2+2</option>
                  <option value="2+1">2+1</option>
                </>
              )}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500">Total Seats</label>
            <input
              type="number"
              name="total_seats"
              placeholder="40"
              value={busForm.total_seats}
              onChange={onChange}
              className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
              required
              min={1}
            />
            <div className="mt-2 text-xs text-gray-400">Auto-suggested based on type and layout.</div>
          </div>
          <div className="flex items-end justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200">Cancel</button>
            <button type="submit" className="px-5 py-2 text-white rounded-xl bg-sky-600 hover:bg-sky-700">Add Bus</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusModal;