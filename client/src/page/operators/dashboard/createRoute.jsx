import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const initialForm = {
  busName: "",
  operatorName: "",
  from: "",
  to: "",
  departureTime: "",
  arrivalTime: "",
  price: "",
  totalSeats: "",
  busType: "",
};

const CreateRoute = () => {
  const { user } = useUser();
  const [form, setForm] = useState(initialForm);
  const [routes, setRoutes] = useState([]);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRoutes([...routes, { ...form, id: Date.now() }]);
    setForm(initialForm);
    setSuccess("Route created successfully!");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="max-w-4xl px-4 py-12 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-sky-700">Operator Dashboard</h1>
      <p className="mb-8 text-neutral-600">Create and manage your bus travels and routes below.</p>

      <form
        onSubmit={handleSubmit}
        className="p-6 mb-10 space-y-4 bg-white shadow-lg rounded-xl"
      >
        <h2 className="mb-2 text-xl font-semibold text-sky-600">Create New Bus Route</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            className="p-2 border rounded-lg"
            type="text"
            name="busName"
            placeholder="Bus Name"
            value={form.busName}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded-lg"
            type="text"
            name="operatorName"
            placeholder="Operator Name"
            value={form.operatorName}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded-lg"
            type="text"
            name="from"
            placeholder="From (City)"
            value={form.from}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded-lg"
            type="text"
            name="to"
            placeholder="To (City)"
            value={form.to}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded-lg"
            type="time"
            name="departureTime"
            placeholder="Departure Time"
            value={form.departureTime}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded-lg"
            type="time"
            name="arrivalTime"
            placeholder="Arrival Time"
            value={form.arrivalTime}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 border rounded-lg"
            type="number"
            name="price"
            placeholder="Ticket Price (₹)"
            value={form.price}
            onChange={handleChange}
            min={0}
            required
          />
          <input
            className="p-2 border rounded-lg"
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            value={form.totalSeats}
            onChange={handleChange}
            min={1}
            required
          />
          <select
            className="p-2 border rounded-lg md:col-span-2"
            name="busType"
            value={form.busType}
            onChange={handleChange}
            required
          >
            <option value="">Select Bus Type</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Sleeper">Sleeper</option>
            <option value="Seater">Seater</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 font-semibold text-white transition rounded-lg bg-sky-600 hover:bg-sky-700"
        >
          Create Route
        </button>
        {success && <div className="text-center text-green-600">{success}</div>}
      </form>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-sky-600">Your Created Routes</h2>
        {routes.length === 0 ? (
          <p className="text-neutral-500">No routes created yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-xl">
              <thead>
                <tr className="bg-sky-100 text-sky-700">
                  <th className="px-4 py-2">Bus Name</th>
                  <th className="px-4 py-2">Operator</th>
                  <th className="px-4 py-2">From</th>
                  <th className="px-4 py-2">To</th>
                  <th className="px-4 py-2">Departure</th>
                  <th className="px-4 py-2">Arrival</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Seats</th>
                  <th className="px-4 py-2">Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.id} className="text-center border-t">
                    <td className="px-4 py-2">{route.busName}</td>
                    <td className="px-4 py-2">{route.operatorName}</td>
                    <td className="px-4 py-2">{route.from}</td>
                    <td className="px-4 py-2">{route.to}</td>
                    <td className="px-4 py-2">{route.departureTime}</td>
                    <td className="px-4 py-2">{route.arrivalTime}</td>
                    <td className="px-4 py-2">{route.busType}</td>
                    <td className="px-4 py-2">{route.totalSeats}</td>
                    <td className="px-4 py-2">{route.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoute;