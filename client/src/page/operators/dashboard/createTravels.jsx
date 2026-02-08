import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";
const CreateTravels = () => {
const { getToken } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) {
      toast.error("Travels name and phone are required");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      const res = await fetch("http://localhost:5000/api/travels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create travels");
      }

      toast.success("Travels profile created");

      // Reload dashboard → it will now pass the travels check
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid h-screen place-items-center bg-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[420px] bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Create Your Travels
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Before managing buses & routes, create your travels profile
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Travels Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            name="email"
            placeholder="Business Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <textarea
            name="address"
            placeholder="Office Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Travels"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateTravels;
