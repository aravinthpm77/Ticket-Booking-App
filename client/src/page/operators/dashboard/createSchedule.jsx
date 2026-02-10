import { FaTimes } from "react-icons/fa";

const CreateScheduleModal = ({
  open,
  onClose,
  onSubmit,
  form,
  onChange,
  routes,
  buses,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 transition-all bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-3xl animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-gradient-to-r from-sky-50 to-indigo-50">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Create Schedule</h3>
            <p className="mt-1 text-sm text-slate-500">Assign buses to routes with date & time</p>
          </div>
          <button
            onClick={onClose}
            className="grid w-10 h-10 text-red-500 transition bg-white rounded-full shadow place-items-center hover:text-red-600"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={onSubmit} className="px-8 py-6 space-y-6">
          {/* Route & Bus Selection */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-5 border shadow-sm rounded-2xl bg-slate-50">
              <div className="text-sm font-semibold text-slate-700">Route Selection</div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-slate-500">Select Route</label>
                <select
                  name="routeId"
                  value={form.routeId}
                  onChange={onChange}
                  className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                  required
                >
                  <option value="">Choose a route...</option>
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.from_city} → {r.to_city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-5 border shadow-sm rounded-2xl bg-slate-50">
              <div className="text-sm font-semibold text-slate-700">Vehicle Selection</div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-slate-500">Select Bus</label>
                <select
                  name="busId"
                  value={form.busId}
                  onChange={onChange}
                  className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                  required
                >
                  <option value="">Choose a bus...</option>
                  {buses.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.bus_name} • {b.layout} Layout
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Travel Date */}
          <div className="p-5 border shadow-sm rounded-2xl bg-slate-50">
            <div className="text-sm font-semibold text-slate-700">Travel Date</div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-500">Date</label>
              <input
                type="date"
                name="travelDate"
                value={form.travelDate}
                onChange={onChange}
                className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>
          </div>

          {/* Times & Price */}
          <div className="p-5 border shadow-sm rounded-2xl bg-slate-50">
            <div className="text-sm font-semibold text-slate-700">Schedule & Pricing</div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-slate-500">Departure Time</label>
                <input
                  type="time"
                  name="departureTime"
                  value={form.departureTime}
                  onChange={onChange}
                  className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500">Arrival Time</label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={form.arrivalTime}
                  onChange={onChange}
                  className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500">Fare (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={onChange}
                  placeholder="Enter fare"
                  className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                  required
                  min={0}
                />
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-500">
              Tip: competitive pricing increases passenger bookings. Consider peak hours and demand.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 transition text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 font-semibold text-white transition shadow rounded-xl bg-sky-600 hover:bg-sky-700"
            >
              Create Schedule
            </button>
          </div>
        </form>
      </div>
      {/* Fade-in animation */}
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

export default CreateScheduleModal;
