import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const RouteModal = ({ open, onClose, onSave, route }) => {
  const [form, setForm] = useState({
    from_city: "",
    to_city: "",
    price: "",
    depTime: "",
    arrTime: "",
  });

  useEffect(() => {
    if (!route) {
      setForm({
        from_city: "",
        to_city: "",
        price: "",
        depTime: "",
        arrTime: "",
      });
      return;
    }

    const splitDateTime = (value) => {
      if (!value) return { date: "", time: "" };
      const parts = String(value).includes("T")
        ? String(value).split("T")
        : String(value).split(" ");
      const date = parts[0] || "";
      const time = parts[1] ? parts[1].slice(0, 5) : "";
      return { date, time };
    };

    const dep = splitDateTime(route.departure_time);
    const arr = splitDateTime(route.arrival_time);

    setForm({
      from_city: route.from_city || "",
      to_city: route.to_city || "",
      price: route.price || "",
      depTime: dep.time,
      arrTime: arr.time,
    });
  }, [route]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().slice(0, 10);
    const depDate = form.depDate || today;
    const arrDate = form.arrDate || depDate;

    const payload = {
      from_city: form.from_city,
      to_city: form.to_city,
      departure_time: `${depDate} ${form.depTime}`.trim(),
      arrival_time: `${arrDate} ${form.arrTime}`.trim(),
      price: form.price,
    };

    onSave(payload);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 transition-all bg-slate-900/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-3xl animate-fade-in">
        <div className="flex items-center justify-between px-8 py-6 border-b bg-gradient-to-r from-sky-50 to-indigo-50">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Create Route</h3>
            <p className="mt-1 text-sm text-slate-500">Define your journey details and pricing.</p>
          </div>
          <button
            onClick={onClose}
            className="grid w-10 h-10 text-red-500 transition bg-white rounded-full shadow place-items-center hover:text-red-600"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-5 border shadow-sm rounded-2xl bg-slate-50">
              <div className="text-sm font-semibold text-slate-700">Route</div>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500">From</label>
                  <input
                    type="text"
                    name="from_city"
                    placeholder="Starting city"
                    value={form.from_city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500">To</label>
                  <input
                    type="text"
                    name="to_city"
                    placeholder="Destination"
                    value={form.to_city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="p-5 border shadow-sm rounded-2xl bg-slate-50">
              <div className="text-sm font-semibold text-slate-700">Pricing</div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-slate-500">Fare</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                  required
                  min={0}
                />
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Tip: set competitive pricing for higher occupancy.
              </div>
            </div>
          </div>

          <div className="p-5 border shadow-sm rounded-2xl bg-slate-50">
            <div className="text-sm font-semibold text-slate-700">Schedule</div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
              <div>
                
                
                <label className="block mt-4 text-xs font-medium text-slate-500">Departure Time</label>
                <input
                  type="time"
                  name="depTime"
                  value={form.depTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
              <div>
                <label className="block mt-4 text-xs font-medium text-slate-500">Arrival Time</label>
                <input
                  type="time"
                  name="arrTime"
                  value={form.arrTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-2 border rounded-xl focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
            </div>
          </div>

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
              {route ? "Update Route" : "Add Route"}
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