import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import { FaBus, FaRoute, FaTachometerAlt, FaUserCircle, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Toppage from "../../../layout/toppage/toppage";
import img from "../../../assets/bg-seat.avif";
import BusModal from "./createBus";
import RouteModal from "./createRoute";
import Footer from "../../../components/footer/footer";
const DASHBOARD_TABS = [
  { label: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
  { label: "Buses", icon: <FaBus />, key: "buses" },
  { label: "Routes", icon: <FaRoute />, key: "routes" },
  { label: "Profile", icon: <FaUserCircle />, key: "profile" },
];

const initialBus = { name: "", type: "", seats: "" };
const initialRoute = { from: "", to: "", dep: "", arr: "", price: "" };

const OperatorDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [buses, setBuses] = useState([
    { id: 1, name: "KMRL Express", type: "AC", seats: 40 },
    { id: 2, name: "City Rider", type: "Non-AC", seats: 30 },
  ]);
  const [routes, setRoutes] = useState([
    { id: 1, from: "Hosur", to: "Chennai", dep: "23:45", arr: "5:45", price: 850 },
    { id: 2, from: "Bangalore", to: "Salem", dep: "21:00", arr: "2:00", price: 700 },
  ]);
  const [busForm, setBusForm] = useState(initialBus);
  const [routeForm, setRouteForm] = useState(initialRoute);
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.firstName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    company: "KMRL Travels",
  });

  // Modal state
  const [showBusModal, setShowBusModal] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);

  // Hide top bar on scroll down, show on scroll up
  const [showTabsBar, setShowTabsBar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking= false;

    const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Scroll up → show navbar
        if (window.scrollY < lastScrollY.current) {
          setShowTabsBar(true);
        } 
        // Scroll down → hide navbar
        else {
          setShowTabsBar(false);
        }

        lastScrollY.current = window.scrollY;
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // Handlers for bus and route creation
  const handleBusChange = (e) => setBusForm({ ...busForm, [e.target.name]: e.target.value });
  const handleRouteChange = (e) => setRouteForm({ ...routeForm, [e.target.name]: e.target.value });

  const handleBusSubmit = (e) => {
    e.preventDefault();
    setBuses([...buses, { ...busForm, id: Date.now() }]);
    setBusForm(initialBus);
  };
  const handleRouteSubmit = (e) => {
    e.preventDefault();
    setRoutes([...routes, { ...routeForm, id: Date.now() }]);
    setRouteForm(initialRoute);
  };

  // Profile edit handlers
  const handleProfileChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleProfileSave = () => setProfileEdit(false);

  return (
    <div>
    <div className="min-h-screen bg-[#f3fffe] flex">
      {/* Sidebar Nav - 10% */}
      <nav className="sticky pt-32 top-0 z-30 flex flex-col items-start justify-start basis-[18%] w-[10%] min-w-[10%] h-screen border-r shadow-lg backdrop-blur-md bg-black/10 px-4 py-6">
        <span className="mb-4 text-xl font-bold text-gray-600">Operator Dashboard</span>
        <div className="flex flex-col w-full gap-2">
          {DASHBOARD_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full text-left px-4 py-2 rounded-full text-base font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-sky-200 text-sky-700 font-semibold shadow-sm"
                  : "hover:bg-sky-100 text-gray-500 hover:text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content - 90% */}
      <main className="relative  pt-32 min-h-screen p-6 basis-[90%] w-[90%]">
        <AnimatePresence>
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between mb-5">
                <h1 className="text-3xl font-bold text-gray-800 ">Dashboard</h1>
                <div className="text-lg text-gray-800">{profile.company}</div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
                <div className="flex flex-col items-center p-6 bg-white rounded-sm shadow">
                  <FaBus className="mb-2 text-2xl text-gray-700" />
                  <div className="text-gray-500">Total Buses</div>
                  <div className="text-2xl font-bold text-gray-800">{buses.length}</div>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-sm shadow">
                  <FaRoute className="mb-2 text-2xl text-gray-700" />
                  <div className="text-gray-500">Total Routes</div>
                  <div className="text-2xl font-bold text-gray-800">{routes.length}</div>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-sm shadow">
                  <span className="mb-2 text-2xl text-gray-700">₹</span>
                  <div className="text-gray-500">Revenue</div>
                  <div className="text-2xl font-bold text-gray-800">--</div>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-sm shadow">
                  <FaUserCircle className="mb-2 text-2xl text-gray-700" />
                  <div className="text-gray-500">Operator</div>
                  <div className="text-lg font-semibold text-gray-800">{profile.name}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Recent Buses */}
                <div className="p-6 bg-white rounded-sm shadow">
                  <div className="mb-4 font-bold text-gray-700">Recent Buses</div>
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-sm text-gray-500">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Seats</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buses.slice(-3).map((bus) => (
                        <tr key={bus.id} className="text-center border-t">
                          <td className="px-4 py-2">{bus.name}</td>
                          <td className="px-4 py-2">{bus.type}</td>
                          <td className="px-4 py-2">{bus.seats}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Recent Routes */}
                <div className="p-6 bg-white rounded-sm shadow">
                  <div className="mb-4 font-bold text-gray-700">Recent Routes</div>
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-sm text-gray-500">
                        <th className="px-4 py-2">From</th>
                        <th className="px-4 py-2">To</th>
                        <th className="px-4 py-2">Dep</th>
                        <th className="px-4 py-2">Arr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routes.slice(-3).map((route) => (
                        <tr key={route.id} className="text-center border-t">
                          <td className="px-4 py-2">{route.from}</td>
                          <td className="px-4 py-2">{route.to}</td>
                          <td className="px-4 py-2">{route.dep}</td>
                          <td className="px-4 py-2">{route.arr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Bus Management</h2>
                <button
                  onClick={() => setShowBusModal(true)}
                  className="flex items-center gap-1 px-3 py-1 text-white rounded bg-sky-600"
                >
                  <FaPlus /> Add Bus
                </button>
              </div>
              <div className="p-6 bg-white shadow rounded-xl">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-sky-100 text-sky-700">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Type</th>
                      <th className="px-4 py-2">Seats</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buses.map((bus) => (
                      <tr key={bus.id} className="text-center border-t">
                        <td className="px-4 py-2">{bus.name}</td>
                        <td className="px-4 py-2">{bus.type}</td>
                        <td className="px-4 py-2">{bus.seats}</td>
                        <td className="flex justify-center gap-2 px-4 py-2">
                          <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                          <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <div className="flex items-center justify-between max-w-full mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Route Management</h2>
                <button
                  onClick={() => setShowRouteModal(true)}
                  className="flex items-center gap-1 px-3 py-1 text-white rounded bg-sky-600"
                >
                  <FaPlus /> Add Route
                </button>
              </div>
              <div className="p-6 bg-white shadow rounded-xl">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-sky-100 text-sky-700">
                      <th className="px-4 py-2">From</th>
                      <th className="px-4 py-2">To</th>
                      <th className="px-4 py-2">Dep</th>
                      <th className="px-4 py-2">Arr</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.map((route) => (
                      <tr key={route.id} className="text-center border-t">
                        <td className="px-4 py-2">{route.from}</td>
                        <td className="px-4 py-2">{route.to}</td>
                        <td className="px-4 py-2">{route.dep}</td>
                        <td className="px-4 py-2">{route.arr}</td>
                        <td className="px-4 py-2">{route.price}</td>
                        <td className="flex justify-center gap-2 px-4 py-2">
                          <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                          <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl p-8 mx-auto bg-white shadow rounded-xl"
            >
              <h2 className="mb-6 text-2xl font-bold text-gray-800">Operator Profile</h2>
              <div className="flex items-center gap-4 mb-6">
                <FaUserCircle className="text-5xl text-sky-500" />
                <div>
                  <div className="text-lg font-semibold">{profile.name}</div>
                  <div className="text-gray-500">{profile.email}</div>
                  <div className="text-gray-500">{profile.company}</div>
                </div>
              </div>
              {profileEdit ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="company"
                    value={profile.company}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Company"
                  />
                  <button
                    onClick={handleProfileSave}
                    className="px-4 py-2 text-white rounded bg-sky-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setProfileEdit(true)}
                  className="px-4 py-2 text-white rounded bg-sky-600"
                >
                  Edit Profile
                </button>
              )}
            </motion.div>
          )}
          
        </AnimatePresence>

        {/* Modals */}
        <BusModal
          open={showBusModal}
          onClose={() => setShowBusModal(false)}
          onSubmit={(e) => { handleBusSubmit(e); setShowBusModal(false); }}
          busForm={busForm}
          onChange={handleBusChange}
        />
        <RouteModal
          open={showRouteModal}
          onClose={() => setShowRouteModal(false)}
          onSubmit={(e) => { handleRouteSubmit(e); setShowRouteModal(false); }}
          routeForm={routeForm}
          onChange={handleRouteChange}
        />
      </main>
      
    </div>
    
    </div>
  );
};

export default OperatorDashboard;
