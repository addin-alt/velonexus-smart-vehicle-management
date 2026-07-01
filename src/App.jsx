import { useMemo, useState } from "react";
import {
  Car,
  Fuel,
  Gauge,
  MapPin,
  ShieldCheck,
  Wrench,
  Building2,
  UserRound,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Bike,
  Truck,
  Users,
  Navigation,
  Wallet,
  CalendarClock,
  AlertTriangle,
} from "lucide-react";

const initialData = {
  users: [
    {
      id: "admin-1",
      name: "Platform Admin",
      email: "admin@velonexus.app",
      password: "admin123",
      role: "admin",
    },
  ],
  vehicles: [],
  fuelLogs: [],
  serviceRecords: [],
  insuranceRecords: [],
  locations: [],
  pumps: [
    {
      id: "pump-1",
      ownerId: "admin-1",
      name: "VeloFuel Central Pump",
      area: "Downtown",
      fuelPrice: 128,
      phone: "+880 1000 000000",
      lat: "23.8103",
      lng: "90.4125",
    },
  ],
  garages: [
    {
      id: "garage-1",
      ownerId: "admin-1",
      name: "VeloCare Auto Garage",
      area: "Main Road",
      serviceType: "Car and Bike Servicing",
      phone: "+880 1777 000000",
      lat: "23.7806",
      lng: "90.2794",
    },
  ],
};

const roleLabels = {
  owner: "Vehicle Owner",
  driver: "Driver",
  pump: "Petrol Pump Owner",
  garage: "Garage Owner",
  admin: "Admin",
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "vehicles", label: "Vehicles", icon: Car },
  { id: "fuel", label: "Fuel & Mileage", icon: Fuel },
  { id: "tracking", label: "Tracking", icon: MapPin },
  { id: "garage", label: "Garage Service", icon: Wrench },
  { id: "insurance", label: "Insurance", icon: ShieldCheck },
  { id: "directory", label: "Pump & Garage Directory", icon: Building2 },
  { id: "admin", label: "Admin Panel", icon: Users },
];

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function useLocalStore(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  });

  const update = (nextValue) => {
    setValue((oldValue) => {
      const finalValue =
        typeof nextValue === "function" ? nextValue(oldValue) : nextValue;
      localStorage.setItem(key, JSON.stringify(finalValue));
      return finalValue;
    });
  };

  return [value, update];
}

function money(value) {
  const number = Number(value || 0);
  return `৳${number.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function number(value) {
  return Number(value || 0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}

function daysUntil(date) {
  if (!date) return null;
  const today = new Date();
  const target = new Date(date);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function App() {
  const [data, setData] = useLocalStore("velonexus-data-v1", initialData);
  const [currentUser, setCurrentUser] = useLocalStore(
    "velonexus-session-v1",
    null
  );
  const [active, setActive] = useState("dashboard");
  const [notice, setNotice] = useState("");

  const showNotice = (message) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 2600);
  };

  const myVehicles = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === "admin") return data.vehicles;
    return data.vehicles.filter((vehicle) => vehicle.userId === currentUser.id);
  }, [data.vehicles, currentUser]);

  const myVehicleIds = myVehicles.map((vehicle) => vehicle.id);

  const visibleFuelLogs =
    currentUser?.role === "admin"
      ? data.fuelLogs
      : data.fuelLogs.filter((log) => myVehicleIds.includes(log.vehicleId));

  const visibleServiceRecords =
    currentUser?.role === "admin"
      ? data.serviceRecords
      : data.serviceRecords.filter((record) =>
          myVehicleIds.includes(record.vehicleId)
        );

  const visibleInsuranceRecords =
    currentUser?.role === "admin"
      ? data.insuranceRecords
      : data.insuranceRecords.filter((record) =>
          myVehicleIds.includes(record.vehicleId)
        );

  const visibleLocations =
    currentUser?.role === "admin"
      ? data.locations
      : data.locations.filter((item) => myVehicleIds.includes(item.vehicleId));

  const vehicleName = (id) => {
    const vehicle = data.vehicles.find((item) => item.id === id);
    return vehicle ? `${vehicle.name} — ${vehicle.plate}` : "Unknown vehicle";
  };

  const calculateMileageForLog = (log) => {
    const logs = data.fuelLogs
      .filter((item) => item.vehicleId === log.vehicleId)
      .sort((a, b) => Number(a.odometer) - Number(b.odometer));

    const index = logs.findIndex((item) => item.id === log.id);
    if (index <= 0) return null;

    const previous = logs[index - 1];
    const distance = Number(log.odometer) - Number(previous.odometer);
    const liters = Number(log.liters);

    if (distance <= 0 || liters <= 0) return null;
    return distance / liters;
  };

  const latestMileage = (vehicleId) => {
    const logs = data.fuelLogs
      .filter((item) => item.vehicleId === vehicleId)
      .sort((a, b) => Number(a.odometer) - Number(b.odometer));

    if (logs.length < 2) return null;

    const latest = logs[logs.length - 1];
    return calculateMileageForLog(latest);
  };

  if (!currentUser) {
    return (
      <AuthScreen data={data} setData={setData} setCurrentUser={setCurrentUser} />
    );
  }

  const availableNavItems = navItems.filter((item) => {
    if (item.id === "admin") return currentUser.role === "admin";
    return true;
  });

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <Navigation size={28} />
          </div>
          <div>
            <h1>VeloNexus</h1>
            <p>Smart Vehicle Hub</p>
          </div>
        </div>

        <div className="profile-card">
          <UserRound size={34} />
          <div>
            <strong>{currentUser.name}</strong>
            <span>{roleLabels[currentUser.role]}</span>
          </div>
        </div>

        <nav>
          {availableNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={active === item.id ? "nav active" : "nav"}
                onClick={() => setActive(item.id)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          className="logout"
          onClick={() => {
            localStorage.removeItem("velonexus-session-v1");
            setCurrentUser(null);
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>{navItems.find((item) => item.id === active)?.label}</h2>
            <p>
              All-in-one vehicle management for fuel, mileage, garage,
              insurance, and tracking.
            </p>
          </div>
          {notice && <div className="notice">{notice}</div>}
        </header>

        {active === "dashboard" && (
          <Dashboard
            data={data}
            currentUser={currentUser}
            vehicles={myVehicles}
            fuelLogs={visibleFuelLogs}
            serviceRecords={visibleServiceRecords}
            insuranceRecords={visibleInsuranceRecords}
            latestMileage={latestMileage}
          />
        )}

        {active === "vehicles" && (
          <Vehicles
            data={data}
            setData={setData}
            currentUser={currentUser}
            vehicles={myVehicles}
            showNotice={showNotice}
            latestMileage={latestMileage}
          />
        )}

        {active === "fuel" && (
          <FuelMileage
            data={data}
            setData={setData}
            vehicles={myVehicles}
            fuelLogs={visibleFuelLogs}
            vehicleName={vehicleName}
            showNotice={showNotice}
            calculateMileageForLog={calculateMileageForLog}
          />
        )}

        {active === "tracking" && (
          <Tracking
            data={data}
            setData={setData}
            vehicles={myVehicles}
            locations={visibleLocations}
            vehicleName={vehicleName}
            showNotice={showNotice}
          />
        )}

        {active === "garage" && (
          <GarageService
            data={data}
            setData={setData}
            vehicles={myVehicles}
            serviceRecords={visibleServiceRecords}
            vehicleName={vehicleName}
            showNotice={showNotice}
          />
        )}

        {active === "insurance" && (
          <Insurance
            data={data}
            setData={setData}
            vehicles={myVehicles}
            insuranceRecords={visibleInsuranceRecords}
            vehicleName={vehicleName}
            showNotice={showNotice}
          />
        )}

        {active === "directory" && (
          <Directory
            data={data}
            setData={setData}
            currentUser={currentUser}
            showNotice={showNotice}
          />
        )}

        {active === "admin" && currentUser.role === "admin" && (
          <AdminPanel data={data} />
        )}
      </main>
    </div>
  );
}

function AuthScreen({ data, setData, setCurrentUser }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "owner",
  });
  const [error, setError] = useState("");

  const update = (field, value) => setForm({ ...form, [field]: value });

  const login = (event) => {
    event.preventDefault();
    const user = data.users.find(
      (item) =>
        item.email.toLowerCase() === form.email.toLowerCase() &&
        item.password === form.password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("velonexus-session-v1", JSON.stringify(user));
    setCurrentUser(user);
  };

  const register = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }

    const exists = data.users.some(
      (item) => item.email.toLowerCase() === form.email.toLowerCase()
    );

    if (exists) {
      setError("This email is already registered.");
      return;
    }

    const user = {
      id: uid("user"),
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    setData((old) => ({ ...old, users: [...old.users, user] }));
    localStorage.setItem("velonexus-session-v1", JSON.stringify(user));
    setCurrentUser(user);
  };

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <div className="hero-badge">
          <Car size={20} />
          Future-ready vehicle platform
        </div>
        <h1>VeloNexus</h1>
        <h2>Smart Vehicle Tracking, Fuel, Garage & Insurance Management</h2>
        <p>
          A CV-ready web application for vehicle owners, drivers, petrol pump
          owners, garage owners, and admins.
        </p>

        <div className="hero-grid">
          <span>
            <Fuel size={18} /> Fuel log
          </span>
          <span>
            <Gauge size={18} /> Mileage finder
          </span>
          <span>
            <MapPin size={18} /> Vehicle tracking
          </span>
          <span>
            <Wrench size={18} /> Garage service
          </span>
          <span>
            <ShieldCheck size={18} /> Insurance record
          </span>
          <span>
            <Building2 size={18} /> Pump directory
          </span>
        </div>
      </section>

      <section className="auth-card">
        <div className="tabs">
          <button
            className={mode === "login" ? "tab active" : "tab"}
            onClick={() => {
              setMode("login");
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "tab active" : "tab"}
            onClick={() => {
              setMode("register");
              setError("");
            }}
          >
            Register
          </button>
        </div>

        <form onSubmit={mode === "login" ? login : register}>
          {mode === "register" && (
            <>
              <label>Full name</label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
              />

              <label>Account type</label>
              <select
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
              >
                <option value="owner">Vehicle Owner</option>
                <option value="driver">Driver</option>
                <option value="pump">Petrol Pump Owner</option>
                <option value="garage">Garage Owner</option>
              </select>
            </>
          )}

          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="example@email.com"
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="Enter password"
          />

          {error && <div className="error">{error}</div>}

          <button className="primary" type="submit">
            {mode === "login" ? "Login to Dashboard" : "Create Account"}
          </button>

          <div className="demo-box">
            <strong>Demo Admin Login</strong>
            <span>Email: admin@velonexus.app</span>
            <span>Password: admin123</span>
          </div>
        </form>
      </section>
    </div>
  );
}

function Dashboard({
  vehicles,
  fuelLogs,
  serviceRecords,
  insuranceRecords,
  latestMileage,
}) {
  const totalFuelCost = fuelLogs.reduce(
    (sum, item) => sum + Number(item.totalCost || 0),
    0
  );

  const mileageValues = vehicles
    .map((vehicle) => latestMileage(vehicle.id))
    .filter(Boolean);

  const averageMileage =
    mileageValues.length > 0
      ? mileageValues.reduce((sum, value) => sum + value, 0) /
        mileageValues.length
      : 0;

  const expiringInsurance = insuranceRecords.filter((item) => {
    const days = daysUntil(item.expiryDate);
    return days !== null && days <= 30;
  }).length;

  return (
    <div className="content-grid">
      <StatCard icon={Car} title="Total Vehicles" value={vehicles.length} />
      <StatCard icon={Wallet} title="Fuel Cost" value={money(totalFuelCost)} />
      <StatCard
        icon={Gauge}
        title="Average Mileage"
        value={`${number(averageMileage)} km/L`}
      />
      <StatCard
        icon={AlertTriangle}
        title="Insurance Alerts"
        value={expiringInsurance}
      />

      <section className="panel wide">
        <h3>Vehicle Summary</h3>
        {vehicles.length === 0 ? (
          <Empty text="No vehicles added yet. Add your first car or bike from the Vehicles section." />
        ) : (
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <div className="vehicle-card" key={vehicle.id}>
                <div className="vehicle-icon">
                  {vehicle.type === "Bike" ? <Bike /> : <Car />}
                </div>
                <div>
                  <h4>{vehicle.name}</h4>
                  <p>{vehicle.plate}</p>
                  <span>
                    Latest mileage:{" "}
                    {latestMileage(vehicle.id)
                      ? `${number(latestMileage(vehicle.id))} km/L`
                      : "Need 2 fuel logs"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="panel">
        <h3>Recent Fuel Logs</h3>
        <CompactList
          items={fuelLogs.slice(-5).reverse()}
          render={(item) => `${item.liters} L — ${money(item.totalCost)}`}
        />
      </section>

      <section className="panel">
        <h3>Upcoming Services</h3>
        <CompactList
          items={serviceRecords.slice(-5).reverse()}
          render={(item) => `${item.serviceType} — ${item.nextServiceDate}`}
        />
      </section>
    </div>
  );
}

function Vehicles({
  setData,
  currentUser,
  vehicles,
  showNotice,
  latestMileage,
}) {
  const [form, setForm] = useState({
    name: "",
    type: "Car",
    plate: "",
    brand: "",
    model: "",
    year: "",
    fuelType: "Petrol",
    odometer: "",
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const submit = (event) => {
    event.preventDefault();

    if (!form.name || !form.plate) {
      showNotice("Vehicle name and plate number are required.");
      return;
    }

    const vehicle = {
      id: uid("vehicle"),
      userId: currentUser.id,
      ...form,
      createdAt: new Date().toISOString(),
    };

    setData((old) => ({ ...old, vehicles: [...old.vehicles, vehicle] }));
    setForm({
      name: "",
      type: "Car",
      plate: "",
      brand: "",
      model: "",
      year: "",
      fuelType: "Petrol",
      odometer: "",
    });
    showNotice("Vehicle added successfully.");
  };

  return (
    <div className="two-column">
      <section className="panel">
        <h3>Add Vehicle</h3>
        <form className="form-grid" onSubmit={submit}>
          <input
            placeholder="Vehicle name, e.g. My Corolla"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
          <select value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option>Car</option>
            <option>Bike</option>
            <option>Truck</option>
            <option>Bus</option>
          </select>
          <input
            placeholder="Plate number"
            value={form.plate}
            onChange={(e) => update("plate", e.target.value)}
          />
          <input
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => update("brand", e.target.value)}
          />
          <input
            placeholder="Model"
            value={form.model}
            onChange={(e) => update("model", e.target.value)}
          />
          <input
            placeholder="Year"
            value={form.year}
            onChange={(e) => update("year", e.target.value)}
          />
          <select
            value={form.fuelType}
            onChange={(e) => update("fuelType", e.target.value)}
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Octane</option>
            <option>CNG</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </select>
          <input
            placeholder="Current odometer km"
            value={form.odometer}
            onChange={(e) => update("odometer", e.target.value)}
          />
          <button className="primary full" type="submit">
            <PlusCircle size={18} />
            Add Vehicle
          </button>
        </form>
      </section>

      <section className="panel">
        <h3>Your Vehicles</h3>
        {vehicles.length === 0 ? (
          <Empty text="No vehicle found." />
        ) : (
          <div className="stack">
            {vehicles.map((vehicle) => (
              <div className="list-card" key={vehicle.id}>
                <div className="row">
                  <strong>{vehicle.name}</strong>
                  <span>{vehicle.type}</span>
                </div>
                <p>
                  {vehicle.brand} {vehicle.model} • {vehicle.plate}
                </p>
                <p>
                  Fuel: {vehicle.fuelType} • Mileage:{" "}
                  {latestMileage(vehicle.id)
                    ? `${number(latestMileage(vehicle.id))} km/L`
                    : "Need 2 fuel logs"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FuelMileage({
  setData,
  vehicles,
  fuelLogs,
  vehicleName,
  showNotice,
  calculateMileageForLog,
}) {
  const [form, setForm] = useState({
    vehicleId: "",
    liters: "",
    pricePerLiter: "",
    odometer: "",
    pumpName: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const submit = (event) => {
    event.preventDefault();

    if (!form.vehicleId || !form.liters || !form.odometer) {
      showNotice("Vehicle, fuel amount, and odometer are required.");
      return;
    }

    const totalCost = Number(form.liters) * Number(form.pricePerLiter || 0);

    const log = {
      id: uid("fuel"),
      ...form,
      totalCost,
      createdAt: new Date().toISOString(),
    };

    setData((old) => ({ ...old, fuelLogs: [...old.fuelLogs, log] }));
    setForm({
      vehicleId: form.vehicleId,
      liters: "",
      pricePerLiter: "",
      odometer: "",
      pumpName: "",
      date: new Date().toISOString().slice(0, 10),
    });
    showNotice("Fuel log saved. Mileage will calculate after 2 fuel logs.");
  };

  return (
    <div className="two-column">
      <section className="panel">
        <h3>Add Fuel Fill-up</h3>
        <form className="form-grid" onSubmit={submit}>
          <select
            value={form.vehicleId}
            onChange={(e) => update("vehicleId", e.target.value)}
          >
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option value={vehicle.id} key={vehicle.id}>
                {vehicle.name} — {vehicle.plate}
              </option>
            ))}
          </select>
          <input
            placeholder="Fuel filled, e.g. 20 liters"
            value={form.liters}
            onChange={(e) => update("liters", e.target.value)}
          />
          <input
            placeholder="Price per liter"
            value={form.pricePerLiter}
            onChange={(e) => update("pricePerLiter", e.target.value)}
          />
          <input
            placeholder="Current odometer reading"
            value={form.odometer}
            onChange={(e) => update("odometer", e.target.value)}
          />
          <input
            placeholder="Petrol pump name"
            value={form.pumpName}
            onChange={(e) => update("pumpName", e.target.value)}
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
          <button className="primary full" type="submit">
            <Fuel size={18} />
            Save Fuel Log
          </button>
        </form>
      </section>

      <section className="panel">
        <h3>Mileage Finder</h3>
        {fuelLogs.length === 0 ? (
          <Empty text="Add fuel logs to calculate mileage." />
        ) : (
          <div className="stack">
            {fuelLogs
              .slice()
              .reverse()
              .map((log) => {
                const mileage = calculateMileageForLog(log);
                return (
                  <div className="list-card" key={log.id}>
                    <div className="row">
                      <strong>{vehicleName(log.vehicleId)}</strong>
                      <span>{log.date}</span>
                    </div>
                    <p>
                      Filled: {log.liters} L • Odometer: {log.odometer} km
                    </p>
                    <p>
                      Cost: {money(log.totalCost)} • Mileage:{" "}
                      {mileage ? `${number(mileage)} km/L` : "Need previous log"}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
}

function Tracking({ setData, vehicles, locations, vehicleName, showNotice }) {
  const [vehicleId, setVehicleId] = useState("");

  const saveLocation = () => {
    if (!vehicleId) {
      showNotice("Select a vehicle first.");
      return;
    }

    if (!navigator.geolocation) {
      showNotice("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const item = {
          id: uid("location"),
          vehicleId,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          date: new Date().toLocaleString(),
        };

        setData((old) => ({ ...old, locations: [...old.locations, item] }));
        showNotice("Location saved successfully.");
      },
      () => showNotice("Location permission denied or unavailable.")
    );
  };

  return (
    <div className="two-column">
      <section className="panel">
        <h3>Vehicle Location Tracking</h3>
        <p className="muted">
          Browser-based tracking works when the user allows location permission.
          Real 24/7 vehicle tracking can be added later using GPS hardware or a
          mobile app.
        </p>

        <div className="form-grid">
          <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option value={vehicle.id} key={vehicle.id}>
                {vehicle.name} — {vehicle.plate}
              </option>
            ))}
          </select>
          <button className="primary full" onClick={saveLocation}>
            <MapPin size={18} />
            Save Current Location
          </button>
        </div>
      </section>

      <section className="panel">
        <h3>Tracking History</h3>
        {locations.length === 0 ? (
          <Empty text="No tracking records yet." />
        ) : (
          <div className="stack">
            {locations
              .slice()
              .reverse()
              .map((item) => (
                <div className="list-card" key={item.id}>
                  <div className="row">
                    <strong>{vehicleName(item.vehicleId)}</strong>
                    <span>{item.date}</span>
                  </div>
                  <p>
                    Lat: {number(item.lat)} • Lng: {number(item.lng)}
                  </p>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.google.com/maps?q=${item.lat},${item.lng}`}
                  >
                    Open in Google Maps
                  </a>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

function GarageService({
  setData,
  vehicles,
  serviceRecords,
  vehicleName,
  showNotice,
}) {
  const [form, setForm] = useState({
    vehicleId: "",
    garageName: "",
    serviceType: "",
    cost: "",
    nextServiceDate: "",
    notes: "",
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const submit = (event) => {
    event.preventDefault();

    if (!form.vehicleId || !form.serviceType) {
      showNotice("Vehicle and service type are required.");
      return;
    }

    const record = {
      id: uid("service"),
      ...form,
      createdAt: new Date().toISOString(),
    };

    setData((old) => ({
      ...old,
      serviceRecords: [...old.serviceRecords, record],
    }));

    setForm({
      vehicleId: form.vehicleId,
      garageName: "",
      serviceType: "",
      cost: "",
      nextServiceDate: "",
      notes: "",
    });
    showNotice("Service record saved.");
  };

  return (
    <div className="two-column">
      <section className="panel">
        <h3>Add Garage Service Record</h3>
        <form className="form-grid" onSubmit={submit}>
          <select
            value={form.vehicleId}
            onChange={(e) => update("vehicleId", e.target.value)}
          >
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option value={vehicle.id} key={vehicle.id}>
                {vehicle.name} — {vehicle.plate}
              </option>
            ))}
          </select>
          <input
            placeholder="Garage name"
            value={form.garageName}
            onChange={(e) => update("garageName", e.target.value)}
          />
          <input
            placeholder="Service type, e.g. Engine oil change"
            value={form.serviceType}
            onChange={(e) => update("serviceType", e.target.value)}
          />
          <input
            placeholder="Service cost"
            value={form.cost}
            onChange={(e) => update("cost", e.target.value)}
          />
          <input
            type="date"
            value={form.nextServiceDate}
            onChange={(e) => update("nextServiceDate", e.target.value)}
          />
          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
          <button className="primary full" type="submit">
            <Wrench size={18} />
            Save Service Record
          </button>
        </form>
      </section>

      <section className="panel">
        <h3>Service History</h3>
        {serviceRecords.length === 0 ? (
          <Empty text="No service records yet." />
        ) : (
          <div className="stack">
            {serviceRecords
              .slice()
              .reverse()
              .map((record) => (
                <div className="list-card" key={record.id}>
                  <div className="row">
                    <strong>{record.serviceType}</strong>
                    <span>{money(record.cost)}</span>
                  </div>
                  <p>{vehicleName(record.vehicleId)}</p>
                  <p>
                    Garage: {record.garageName || "Not provided"} • Next:{" "}
                    {record.nextServiceDate || "Not set"}
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Insurance({
  setData,
  vehicles,
  insuranceRecords,
  vehicleName,
  showNotice,
}) {
  const [form, setForm] = useState({
    vehicleId: "",
    provider: "",
    policyNumber: "",
    expiryDate: "",
    premium: "",
  });

  const update = (field, value) => setForm({ ...form, [field]: value });

  const submit = (event) => {
    event.preventDefault();

    if (!form.vehicleId || !form.provider || !form.expiryDate) {
      showNotice("Vehicle, provider, and expiry date are required.");
      return;
    }

    const record = {
      id: uid("insurance"),
      ...form,
      createdAt: new Date().toISOString(),
    };

    setData((old) => ({
      ...old,
      insuranceRecords: [...old.insuranceRecords, record],
    }));

    setForm({
      vehicleId: form.vehicleId,
      provider: "",
      policyNumber: "",
      expiryDate: "",
      premium: "",
    });
    showNotice("Insurance record saved.");
  };

  return (
    <div className="two-column">
      <section className="panel">
        <h3>Add Insurance Record</h3>
        <form className="form-grid" onSubmit={submit}>
          <select
            value={form.vehicleId}
            onChange={(e) => update("vehicleId", e.target.value)}
          >
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option value={vehicle.id} key={vehicle.id}>
                {vehicle.name} — {vehicle.plate}
              </option>
            ))}
          </select>
          <input
            placeholder="Insurance provider"
            value={form.provider}
            onChange={(e) => update("provider", e.target.value)}
          />
          <input
            placeholder="Policy number"
            value={form.policyNumber}
            onChange={(e) => update("policyNumber", e.target.value)}
          />
          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) => update("expiryDate", e.target.value)}
          />
          <input
            placeholder="Premium amount"
            value={form.premium}
            onChange={(e) => update("premium", e.target.value)}
          />
          <button className="primary full" type="submit">
            <ShieldCheck size={18} />
            Save Insurance
          </button>
        </form>
      </section>

      <section className="panel">
        <h3>Insurance Status</h3>
        {insuranceRecords.length === 0 ? (
          <Empty text="No insurance records yet." />
        ) : (
          <div className="stack">
            {insuranceRecords
              .slice()
              .reverse()
              .map((record) => {
                const days = daysUntil(record.expiryDate);
                return (
                  <div
                    className={
                      days !== null && days <= 30
                        ? "list-card danger"
                        : "list-card"
                    }
                    key={record.id}
                  >
                    <div className="row">
                      <strong>{record.provider}</strong>
                      <span>{days} days left</span>
                    </div>
                    <p>{vehicleName(record.vehicleId)}</p>
                    <p>
                      Policy: {record.policyNumber || "N/A"} • Expiry:{" "}
                      {record.expiryDate}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
}

function Directory({ data, setData, currentUser, showNotice }) {
  const [pump, setPump] = useState({
    name: "",
    area: "",
    fuelPrice: "",
    phone: "",
    lat: "",
    lng: "",
  });

  const [garage, setGarage] = useState({
    name: "",
    area: "",
    serviceType: "",
    phone: "",
    lat: "",
    lng: "",
  });

  const addPump = (event) => {
    event.preventDefault();

    if (!pump.name || !pump.area) {
      showNotice("Pump name and area are required.");
      return;
    }

    setData((old) => ({
      ...old,
      pumps: [
        ...old.pumps,
        { id: uid("pump"), ownerId: currentUser.id, ...pump },
      ],
    }));

    setPump({ name: "", area: "", fuelPrice: "", phone: "", lat: "", lng: "" });
    showNotice("Petrol pump added.");
  };

  const addGarage = (event) => {
    event.preventDefault();

    if (!garage.name || !garage.area) {
      showNotice("Garage name and area are required.");
      return;
    }

    setData((old) => ({
      ...old,
      garages: [
        ...old.garages,
        { id: uid("garage"), ownerId: currentUser.id, ...garage },
      ],
    }));

    setGarage({
      name: "",
      area: "",
      serviceType: "",
      phone: "",
      lat: "",
      lng: "",
    });
    showNotice("Garage added.");
  };

  return (
    <div className="content-grid">
      <section className="panel">
        <h3>Petrol Pump Directory</h3>
        <DirectoryList items={data.pumps} type="pump" />
      </section>

      <section className="panel">
        <h3>Garage / Service Center Directory</h3>
        <DirectoryList items={data.garages} type="garage" />
      </section>

      <section className="panel">
        <h3>Add Petrol Pump</h3>
        <form className="form-grid" onSubmit={addPump}>
          <input
            placeholder="Pump name"
            value={pump.name}
            onChange={(e) => setPump({ ...pump, name: e.target.value })}
          />
          <input
            placeholder="Area"
            value={pump.area}
            onChange={(e) => setPump({ ...pump, area: e.target.value })}
          />
          <input
            placeholder="Fuel price per liter"
            value={pump.fuelPrice}
            onChange={(e) => setPump({ ...pump, fuelPrice: e.target.value })}
          />
          <input
            placeholder="Phone"
            value={pump.phone}
            onChange={(e) => setPump({ ...pump, phone: e.target.value })}
          />
          <input
            placeholder="Latitude"
            value={pump.lat}
            onChange={(e) => setPump({ ...pump, lat: e.target.value })}
          />
          <input
            placeholder="Longitude"
            value={pump.lng}
            onChange={(e) => setPump({ ...pump, lng: e.target.value })}
          />
          <button className="primary full" type="submit">
            Add Pump
          </button>
        </form>
      </section>

      <section className="panel">
        <h3>Add Garage</h3>
        <form className="form-grid" onSubmit={addGarage}>
          <input
            placeholder="Garage name"
            value={garage.name}
            onChange={(e) => setGarage({ ...garage, name: e.target.value })}
          />
          <input
            placeholder="Area"
            value={garage.area}
            onChange={(e) => setGarage({ ...garage, area: e.target.value })}
          />
          <input
            placeholder="Service type"
            value={garage.serviceType}
            onChange={(e) =>
              setGarage({ ...garage, serviceType: e.target.value })
            }
          />
          <input
            placeholder="Phone"
            value={garage.phone}
            onChange={(e) => setGarage({ ...garage, phone: e.target.value })}
          />
          <input
            placeholder="Latitude"
            value={garage.lat}
            onChange={(e) => setGarage({ ...garage, lat: e.target.value })}
          />
          <input
            placeholder="Longitude"
            value={garage.lng}
            onChange={(e) => setGarage({ ...garage, lng: e.target.value })}
          />
          <button className="primary full" type="submit">
            Add Garage
          </button>
        </form>
      </section>
    </div>
  );
}

function AdminPanel({ data }) {
  return (
    <div className="content-grid">
      <StatCard icon={Users} title="Users" value={data.users.length} />
      <StatCard icon={Car} title="Vehicles" value={data.vehicles.length} />
      <StatCard icon={Fuel} title="Fuel Logs" value={data.fuelLogs.length} />
      <StatCard icon={Building2} title="Pumps" value={data.pumps.length} />
      <section className="panel wide">
        <h3>Registered Users</h3>
        <div className="stack">
          {data.users.map((user) => (
            <div className="list-card" key={user.id}>
              <div className="row">
                <strong>{user.name}</strong>
                <span>{roleLabels[user.role]}</span>
              </div>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DirectoryList({ items, type }) {
  if (items.length === 0) return <Empty text="No records found." />;

  return (
    <div className="stack">
      {items.map((item) => (
        <div className="list-card" key={item.id}>
          <div className="row">
            <strong>{item.name}</strong>
            <span>{item.area}</span>
          </div>
          <p>
            {type === "pump"
              ? `Fuel price: ${item.fuelPrice || "N/A"}`
              : `Service: ${item.serviceType || "N/A"}`}
          </p>
          <p>Phone: {item.phone || "N/A"}</p>
          {item.lat && item.lng && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.google.com/maps?q=${item.lat},${item.lng}`}
            >
              Open in Google Maps
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <section className="stat-card">
      <div className="stat-icon">
        <Icon size={25} />
      </div>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
      </div>
    </section>
  );
}

function CompactList({ items, render }) {
  if (items.length === 0) return <Empty text="No records yet." />;

  return (
    <div className="compact-list">
      {items.map((item) => (
        <div key={item.id}>
          <CalendarClock size={16} />
          <span>{render(item)}</span>
        </div>
      ))}
    </div>
  );
}

function Empty({ text }) {
  return <div className="empty">{text}</div>;
}

export default App;
