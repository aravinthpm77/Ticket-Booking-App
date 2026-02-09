import { useUser , useAuth} from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import {
  FaBus,
  FaRoute,
  FaTachometerAlt,
  FaUserCircle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCalendarAlt,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import BusModal from "./createBus";
import RouteModal from "./createRoute";
import CreateTravels from "./createTravels";
import DashboardLoader from "./dashboardloader";


const DASHBOARD_TABS = [
  { label: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
  { label: "Buses", icon: <FaBus />, key: "buses" },
  { label: "Routes", icon: <FaRoute />, key: "routes" },
  { label: "Profile", icon: <FaUserCircle />, key: "profile" },
];

 
  
const initialBus = {
  bus_name: "",
  bus_number: "",
  bus_type: "seater",
  layout: "2+2",
  total_seats: "",
};

const OperatorDashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  
  const [travels, setTravels] = useState(null);
  const [loadingTravels, setLoadingTravels] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");


  const [routes, setRoutes] = useState([]);
  const [, setLoadingRoutes] = useState(true);
  const [editingRoute, setEditingRoute] = useState(null);

  const [buses, setBuses] = useState([]);





  const [busForm, setBusForm] = useState(initialBus);
  const [profileEdit, setProfileEdit] = useState(false);


  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Modal state
  const [showBusModal, setShowBusModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);

  // Hide top bar on scroll down, show on scroll up
  const [, setShowTabsBar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking= false;

    const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {

        if (window.scrollY < lastScrollY.current) {
          setShowTabsBar(true);
        } 
        else {
          setShowTabsBar(false);
        }

        lastScrollY.current = window.scrollY;
        ticking = false;
      });
      ticking = true;
    }};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const token = await getToken();

        const res = await fetch("https://ticket-booking-app-h1ws.onrender.com/api/travels/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTravels(data);
      } catch (err) {
        console.error("Failed to fetch travels", err);
      } finally {
        setLoadingTravels(false);
      }
    };

    if (user) fetchTravels();
  }, [user, getToken]);

  useEffect(() => {
    if (travels) {
      setProfile({
        name: travels.name || "",
        email: travels.email || "",
        phone: travels.phone || "",
        address: travels.address || "",
      });
    }
  }, [travels]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const token = await getToken();

        const res = await fetch("https://ticket-booking-app-h1ws.onrender.com/api/routes/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setRoutes(data || []);
      } catch (err) {
        console.error("Failed to fetch routes", err);
        toast.error("Failed to load routes");
      } finally {
        setLoadingRoutes(false);
      }
    };

    if (travels) fetchRoutes();
  }, [travels, getToken]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const token = await getToken();

        const res = await fetch("https://ticket-booking-app-h1ws.onrender.com/api/buses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setBuses(data || []);
      } catch (err) {
        console.error("Failed to fetch buses", err);
        toast.error("Failed to load buses");
      } finally {
        // No-op
      }
    };

    if (travels) fetchBuses();
  }, [travels, getToken]);



  const handleBusChange = (e) => {
    const { name, value } = e.target;
    const layoutByType = {
      sleeper: "1+1",
      "semi-sleeper": "2+1",
      seater: "2+2",
    };
    const seatsByLayout = {
      "1+1": 30,
      "2+1": 36,
      "2+2": 40,
    };

    if (name === "bus_type") {
      const suggestedLayout = layoutByType[value] || "2+2";
      setBusForm((prev) => ({
        ...prev,
        bus_type: value,
        layout: suggestedLayout,
        total_seats: prev.total_seats || seatsByLayout[suggestedLayout] || "",
      }));
      return;
    }

    if (name === "layout") {
      setBusForm((prev) => ({
        ...prev,
        layout: value,
        total_seats: prev.total_seats || seatsByLayout[value] || "",
      }));
      return;
    }

    setBusForm((prev) => ({ ...prev, [name]: value }));
  };

  const fetchBuses = async () => {
    try {
      const token = await getToken();

      const res = await fetch("https://ticket-booking-app-h1ws.onrender.com/api/buses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBuses(data || []);
    } catch (err) {
      console.error("Failed to fetch buses", err);
      toast.error("Failed to load buses");
    }
  };

  const handleBusSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();

      const res = await fetch("https://ticket-booking-app-h1ws.onrender.com/api/buses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(busForm),
      });

      if (!res.ok) {
        throw new Error("Failed to create bus");
      }

      toast.success("Bus added successfully");
      setShowBusModal(false);
      setBusForm(initialBus);
      fetchBuses();
    } catch (err) {
      toast.error(err.message || "Failed to create bus");
    }
  };
  const handleSaveRoute = async (data) => {
    try {
      const token = await getToken();
      const isEdit = !!editingRoute;
      const url = isEdit
        ? `https://ticket-booking-app-h1ws.onrender.com/api/routes/${editingRoute.id}`
        : "https://ticket-booking-app-h1ws.onrender.com/api/routes";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        const message = isJson
          ? payload?.message
          : "Server returned an unexpected response";
        throw new Error(message || "Failed to save route");
      }

      const saved = payload;

      if (isEdit) {
        setRoutes((prev) => prev.map((r) => (r.id === saved.id ? saved : r)));
      } else {
        setRoutes((prev) => [saved, ...prev]);
      }

      toast.success(isEdit ? "Route updated" : "Route created");
      setEditingRoute(null);
      setShowRouteModal(false);
    } catch (err) {
      console.error("Failed to save route", err);
      toast.error(err.message || "Failed to save route");
    }
  };

  const handleDeleteRoute = async (route) => {
    if (!route?.id) return;

    const confirmed = window.confirm(
      `Delete route ${route.from_city} to ${route.to_city}?`
    );
    if (!confirmed) return;

    try {
      const token = await getToken();
      const res = await fetch(`https://ticket-booking-app-h1ws.onrender.com/api/routes/${route.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        const message = isJson
          ? payload?.message
          : "Server returned an unexpected response";
        throw new Error(message || "Failed to delete route");
      }

      setRoutes((prev) => prev.filter((r) => r.id !== route.id));
      toast.success("Route deleted");
    } catch (err) {
      console.error("Failed to delete route", err);
      toast.error(err.message || "Failed to delete route");
    }
  };

  const getTimeLabel = (value) => {
    if (!value) return "-";
    const parts = String(value).includes("T")
      ? String(value).split("T")
      : String(value).split(" ");
    const time = parts[1] || "";
    return time ? time.slice(0, 5) : String(value);
  };

  const getBusTypeLabel = (value) => {
    if (!value) return "-";
    return String(value).replace(/-/g, " ");
  };

  // Profile edit handlers
  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleProfileSave = async () => {
    try {
      const token = await getToken();
      const res = await fetch("https://ticket-booking-app-h1ws.onrender.com/api/travels/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update profile");
      }

      const updated = await res.json();
      setTravels(updated);
      setProfile({
        name: updated?.name || "",
        email: updated?.email || "",
        phone: updated?.phone || "",
        address: updated?.address || "",
      });
      toast.success("Profile updated");
      setProfileEdit(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      toast.error(err.message || "Failed to update profile");
    }
  };

  if (loadingTravels) {
    return <DashboardLoader />;
  }

  if (!travels) {
    return <CreateTravels />;
  }



  return (
    <div className="h-screen bg-white">
      <div className="flex h-screen mx-auto shadow-2xl bg-indigo-50 rounded-3xl">
        {/* Sidebar Nav - ~10% */}
        <nav className="basis-[10%] min-w-[250px] border-r bg-white backdrop-blur p-6 overflow-y-auto">
          <div className="mb-16">
            
            <span className="block mt-4 text-lg font-bold text-gray-700">Operator</span>
          </div>
          <div className="flex flex-col w-full gap-2 ">
            {DASHBOARD_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
                    : "hover:bg-indigo-50 text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-4 mt-10 shadow-md bg-indigo-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600/20" >
                <img src={user?.imageUrl} alt="Profile" className="object-cover w-full h-full rounded-full" />
              </div>
              <div>
                <div className="text-base font-semibold ">{user.firstName}</div>
                <button className="px-2 py-1 mt-1 text-xs text-white bg-pink-500 rounded">UPGRADE</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content - center (~65%) */}
        <main className="basis-[65%] p-8 overflow-y-auto mt-24">
        <AnimatePresence>
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">Business Dashboard</h1>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 bg-white shadow rounded-xl hover:text-indigo-700"><FaSearch /></button>
                    <button className="p-2 text-gray-600 bg-white shadow rounded-xl hover:text-indigo-700"><FaCalendarAlt /></button>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
                  <div className="p-6 text-white shadow rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600">
                    <div className="text-sm opacity-90">Total Passengers</div>
                    <div className="mt-2 text-2xl font-semibold">54,235</div>
                  </div>
                  <div className="p-6 text-white shadow rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600">
                    <div className="text-sm opacity-90">Total Revenue</div>
                    <div className="mt-2 text-2xl font-semibold">₹ 980,632</div>
                  </div>
                  <div className="p-6 text-white shadow rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600">
                    <div className="text-sm opacity-90">Tickets Sold</div>
                    <div className="mt-2 text-2xl font-semibold">5,490</div>      
                  </div>
                </div>

                {/* Marketplace */}
                <div className="mb-4 text-lg font-semibold text-gray-700">Marketplace</div>
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                  <div className="p-6 bg-white shadow rounded-2xl">
                    <div className="text-base font-semibold text-gray-700">Data Analytics Overview</div>
                    <p className="mt-2 text-sm text-gray-500">Track your fleet performance, occupancy rate, and revenue trends.</p>
                    <div className="flex items-center justify-end mt-6">
                      <div className="grid w-20 h-20 duration-200 border-2 border-indigo-600 rounded-full cursor-pointer place-items-center hover:bg-indigo-50">
                        <button className="font-semibold text-indigo-700">START</button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white shadow rounded-2xl">
                    <div className="text-xs font-bold text-gray-500">UPGRADE TO PRO</div>
                    <div className="grid mt-6 place-items-center">
                      <div className="grid w-24 h-24 rounded-full bg-indigo-50 place-items-center">
                        <FaWallet className="text-2xl text-indigo-600" />
                      </div>
                      <div className="mt-4 text-xl font-semibold text-gray-800">₹29 / month</div>
                      <div className="text-sm text-gray-500">Performance insights | Route revenue | Seat utilization</div>
                    </div>
                  </div>
                </div>

                {/* Finance Flow */}
                <div className="p-6 mb-8 bg-white shadow rounded-2xl">
                  <div className="text-base font-semibold text-gray-700">Finance Flow</div>
                  <div className="mt-2 text-sm text-gray-500">₹253,000 <span className="ml-2">Monthly Overview</span></div>
                  <div className="flex items-end justify-start h-32 gap-6 mt-6">
                    {[
                      { week: "Week 1", amount: 52000, value: 52 },
                      { week: "Week 2", amount: 61000, value: 61 },
                      { week: "Week 3", amount: 74000, value: 74 },
                      { week: "Week 4", amount: 66000, value: 66 },
                    ].map((data, i) => (
                      <div key={i} className="flex flex-col items-center flex-2">
                        <div className="w-full rounded-lg bg-gradient-to-t from-indigo-500 to-indigo-400" style={{height: `${data.value * 0.8}px`}} />
                        <div className="mt-2 text-xs font-semibold text-gray-700">{data.week}</div>
                        <div className="mt-1 text-xs text-indigo-600">₹{(data.amount / 1000).toFixed(0)}k</div>
                      </div>
                    ))}
                  </div>  
                </div>

                
                <div className="p-6 bg-white shadow rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-semibold text-gray-700">Recent Orders</div>
                    <button className="text-xs font-semibold text-indigo-600">SEE ALL</button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      {id: '#1235465', item: 'DJI Mavic Pro 2', date: 'Sep 16, 2021', price: '₹42.00', status: 'Delivered'},
                      {id: '#1235468', item: 'iPad Pro 2017 Model', date: 'Sep 15, 2021', price: '₹932.00', status: 'Canceled'},
                    ].map((o) => (
                      <div key={o.id} className="grid grid-cols-5 text-sm text-gray-600">
                        <div>{o.id}</div>
                        <div>{o.item}</div>
                        <div>{o.date}</div>
                        <div>{o.price}</div>
                        <div className={`${o.status === 'Delivered' ? 'text-emerald-600' : 'text-red-500'}`}>{o.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
            </motion.div>
          )}

          {/* Buses Tab */}
          {activeTab === "buses" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Bus Management</h2>
                  <p className="mt-1 text-sm text-gray-500">Track fleet health, capacity, and availability.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border shadow-sm rounded-xl">
                    <FaSearch className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search buses"
                      className="text-sm bg-transparent outline-none w-44"
                    />
                  </div>
                  <button
                    onClick={() => setShowBusModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-xl bg-sky-600 hover:bg-sky-700"
                  >
                    <FaPlus /> Add Bus
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                <div className="p-4 bg-white shadow rounded-2xl">
                  <div className="text-xs text-gray-500">Total Buses</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-800">{buses.length}</div>
                </div>
                <div className="p-4 bg-white shadow rounded-2xl">
                  <div className="text-xs text-gray-500">Avg Seats</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-800">
                    {Math.round(buses.reduce((sum, b) => sum + Number(b.total_seats || 0), 0) / (buses.length || 1))}
                  </div>
                </div>
                <div className="p-4 text-white shadow rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500">
                  <div className="text-xs opacity-90">Sleeper Fleet</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {buses.filter((b) => String(b.bus_type).toLowerCase().includes("sleeper")).length} Active
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {buses.map((bus) => (
                  <div key={bus.id} className="p-5 bg-white shadow rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-gray-800">{bus.bus_name}</div>
                        <div className="mt-1 text-xs text-gray-500">{bus.bus_number}</div>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          String(bus.bus_type).toLowerCase().includes("sleeper")
                            ? "text-emerald-700 bg-emerald-100"
                            : "text-amber-700 bg-amber-100"
                        }`}
                      >
                        {getBusTypeLabel(bus.bus_type)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="p-3 rounded-xl bg-slate-50">
                        <div className="text-xs text-gray-500">Layout</div>
                        <div className="mt-1 text-sm font-semibold text-gray-800">{bus.layout}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50">
                        <div className="text-xs text-gray-500">Seats</div>
                        <div className="mt-1 text-sm font-semibold text-gray-800">{bus.total_seats}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50">
                        <div className="text-xs text-gray-500">Type</div>
                        <div className="mt-1 text-sm font-semibold text-gray-800">{getBusTypeLabel(bus.bus_type)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                      <button className="px-4 py-2 text-blue-700 rounded-xl bg-blue-50 hover:bg-blue-100" aria-label="Edit bus">
                        <FaEdit className="inline" />
                        <span className="ml-2 text-sm">Edit</span>
                      </button>
                      <button className="px-4 py-2 text-red-700 rounded-xl bg-red-50 hover:bg-red-100" aria-label="Delete bus">
                        <FaTrash className="inline" />
                        <span className="ml-2 text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Routes Tab */}
          {activeTab === "routes" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Route Management</h2>
                  <p className="mt-1 text-sm text-gray-500">Manage schedules, fares, and timing at a glance.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white border shadow-sm rounded-xl">
                    <FaSearch className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search routes"
                      className="text-sm bg-transparent outline-none w-44"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setEditingRoute(null);
                      setShowRouteModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-xl bg-sky-600 hover:bg-sky-700"
                  >
                    <FaPlus /> Add Route
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                <div className="p-4 bg-white shadow rounded-2xl">
                  <div className="text-xs text-gray-500">Active Routes</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-800">{routes.length}</div>
                </div>
                <div className="p-4 bg-white shadow rounded-2xl">
                  <div className="text-xs text-gray-500">Avg Fare</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-800">
                    ₹{Math.round(routes.reduce((sum, r) => sum + Number(r.price || 0), 0) / (routes.length || 1))}
                  </div>
                </div>
                <div className="p-4 text-white shadow rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500">
                  <div className="text-xs opacity-90">Peak Window</div>
                  <div className="mt-1 text-2xl font-semibold">20:00 - 23:59</div>
                </div>
              </div>

              <div className="overflow-hidden bg-white shadow rounded-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <div className="text-base font-semibold text-gray-700">All Routes</div>
                  <div className="text-xs text-gray-400">Updated just now</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-500 bg-slate-50">
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Departure</th>
                        <th className="px-6 py-3">Arrival</th>
                        <th className="px-6 py-3">Fare</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routes.map((route, index) => (
                        <tr
                          key={route.id}
                          className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                        >
                          <td className="px-6 py-4 font-medium text-gray-800">{route.from_city}</td>
                          <td className="px-6 py-4 text-gray-700">{route.to_city}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs rounded-lg text-sky-700 bg-sky-100">
                              {getTimeLabel(route.departure_time)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs text-indigo-700 bg-indigo-100 rounded-lg">
                              {getTimeLabel(route.arrival_time)}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-800">₹{route.price}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                className="p-2 text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100"
                                aria-label="Edit route"
                                onClick={() => {
                                  setEditingRoute(route);
                                  setShowRouteModal(true);
                                }}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="p-2 text-red-600 rounded-lg bg-red-50 hover:bg-red-100"
                                aria-label="Delete route"
                                onClick={() => handleDeleteRoute(route)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl p-6 mx-auto"
            >
              <div className="p-6 bg-white shadow rounded-2xl">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="grid w-16 h-16 rounded-2xl bg-sky-100 place-items-center">
                      {user?.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt="Profile"
                          className="object-cover w-full h-full rounded-2xl"
                        />
                      ) : (
                        <FaUserCircle className="text-4xl text-sky-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-800">{profile.name}</div>
                      <div className="text-sm text-gray-500">{profile.email}</div>
                    </div>
                  </div>
                  {!profileEdit && (
                    <button
                      onClick={() => setProfileEdit(true)}
                      className="px-4 py-2 text-white rounded-xl bg-sky-600 hover:bg-sky-700"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                  <div className="p-4 border rounded-2xl bg-slate-50">
                    <div className="text-xs text-gray-500">Primary Email</div>
                    <div className="mt-1 text-sm font-semibold text-gray-800">{profile.email || "-"}</div>
                  </div>
                  <div className="p-4 border rounded-2xl bg-slate-50">
                    <div className="text-xs text-gray-500">Phone</div>
                    <div className="mt-1 text-sm font-semibold text-gray-800">{profile.phone || "-"}</div>
                  </div>
                  <div className="p-4 border rounded-2xl bg-slate-50">
                    <div className="text-xs text-gray-500">Address</div>
                    <div className="mt-1 text-sm font-semibold text-gray-800">{profile.address || "-"}</div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="text-sm font-semibold text-gray-700">Profile Details</div>
                  <div className="mt-4">
                    {profileEdit ? (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Travels Name</label>
                          <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Name"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Email"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Phone"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleProfileChange}
                            className="w-full px-3 py-2 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                            placeholder="Address"
                          />
                        </div>
                        <div className="flex items-center gap-3 md:col-span-2">
                          <button
                            onClick={handleProfileSave}
                            className="px-5 py-2 text-white rounded-xl bg-sky-600 hover:bg-sky-700"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => setProfileEdit(false)}
                            className="px-5 py-2 text-gray-700 border rounded-xl hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-2xl">
                          <div className="text-xs text-gray-500">Travels Name</div>
                          <div className="mt-1 text-sm font-semibold text-gray-800">{profile.name || "-"}</div>
                        </div>
                        <div className="p-4 border rounded-2xl">
                          <div className="text-xs text-gray-500">Email</div>
                          <div className="mt-1 text-sm font-semibold text-gray-800">{profile.email || "-"}</div>
                        </div>
                        <div className="p-4 border rounded-2xl">
                          <div className="text-xs text-gray-500">Phone</div>
                          <div className="mt-1 text-sm font-semibold text-gray-800">{profile.phone || "-"}</div>
                        </div>
                        <div className="p-4 border rounded-2xl">
                          <div className="text-xs text-gray-500">Address</div>
                          <div className="mt-1 text-sm font-semibold text-gray-800">{profile.address || "-"}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
        </AnimatePresence>

        {/* Modals */}
        <BusModal
          open={showBusModal}
          onClose={() => setShowBusModal(false)}
          onSubmit={handleBusSubmit}
          busForm={busForm}
          onChange={handleBusChange}
        />
        <RouteModal
          open={showRouteModal}
          onClose={() => {
            setShowRouteModal(false);
            setEditingRoute(null);
          }}
          onSave={handleSaveRoute}
          route={editingRoute}
        />
        </main>

        {/* Right Summary Panel (~25%) */}
        <aside className="basis-[25%] p-8 bg-white/80 border-l mt-24 overflow-y-auto rounded-tr-3xl rounded-br-3xl">
          <div className="text-2xl font-bold text-gray-800">Summary</div>
          {/* Balance */}
          <div className="p-5 mt-6 bg-white shadow rounded-2xl">
            <div className="text-sm text-gray-500">Your Balance</div>
            <div className="flex items-center justify-between mt-3">
              <div className="text-3xl font-bold text-gray-800">₹ 10,632.00</div>
              <button className="grid w-8 h-8 text-white bg-pink-500 rounded-full place-items-center">+</button>
            </div>
            <div className="flex items-center gap-6 mt-3 text-sm">
              <div className="flex items-center gap-2 text-emerald-600"><FaArrowUp /> ₹3,250.07</div>
              <div className="flex items-center gap-2 text-red-500"><FaArrowDown /> ₹1,062.90</div>
            </div>
          </div>

          {/* Activity */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold text-gray-700">Activity</div>
              <button className="text-xs font-semibold text-indigo-600">SEE ALL</button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid w-10 h-10 text-indigo-600 bg-indigo-100 rounded-xl place-items-center">💾</div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Tickets Revenue</div>
                    <div className="text-xs text-gray-500">12:40 am</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700">₹4,120</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid w-10 h-10 text-indigo-600 bg-indigo-100 rounded-xl place-items-center">🧾</div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Fuel Expense</div>
                    <div className="text-xs text-gray-500">10:20 am</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-red-500">- ₹230</div>
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="mt-8">
            <div className="text-base font-semibold text-gray-700">Top Categories</div>
            <p className="mt-2 text-xs text-gray-500">Explore your top categories and keep shopping with cashback</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-yellow-100 rounded-xl">
                <div className="text-sm font-semibold text-gray-700">Footwear</div>
                <div className="text-xs text-gray-600">18 941 units</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-100">
                <div className="text-sm font-semibold text-gray-700">Accessories</div>
                <div className="text-xs text-gray-600">26 061 units</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OperatorDashboard;
