import { useUser } from "@clerk/clerk-react";
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
import BusModal from "./createBus";
import RouteModal from "./createRoute";
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
  console.log(user,"Dashboard Profile");
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
  const [, setShowTabsBar] = useState(true);
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
