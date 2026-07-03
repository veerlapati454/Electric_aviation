import { useState, useRef, useEffect } from "react";
import {
  LayoutGrid,
  Users,
  Plane,
  BarChart3,
  MessageCircle,
  Settings as SettingsIcon,
  HelpCircle,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  FilePlus,
  UserPlus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Inbox,
  Star,
  Globe2,
  Download,
  Truck,
  MoreHorizontal,
  BatteryCharging,
  ClipboardList,
  Sun,
  MapPin,
  Sparkles,
  CloudUpload,
  Banknote,
  Scale,
  Filter,
  Database,
  RefreshCw,
  Phone,
  Mail,
  Tag,
  Send,
  ChevronRight,
  PlusCircle,
  CreditCard,
  UserCircle,
  Lock,
  Languages,
  BookOpen,
  MessageSquare,
  Video,
  ExternalLink,
  Zap,
  PlaneTakeoff,
} from "lucide-react";
import "./UserDashboard.css";
import logo from "../../assets/stackly_logo.webp"
import { useNavigate, useParams } from "react-router-dom";

/* ── Logo ── same footprint/placement as the reference, reskinned for electric aviation ── */
function VoltAirLogo() {
  return (
    <svg viewBox="0 0 220 58" height="58" width="auto" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VoltAir">
      <defs>
        <linearGradient id="vaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <g transform="translate(0,4)">
        <path d="M25 2 L4 27 L18 27 L11 50 L38 21 L23 21 Z" fill="url(#vaGrad)" />
      </g>
      <text x="46" y="37" fontFamily="Sora, sans-serif" fontSize="24" fontWeight="700" fill="#e8f2fb">
        Volt<tspan fill="#22d3ee">Air</tspan>
      </text>
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, view: "dashboard" },
  { label: "Pilots", icon: Users, view: "pilots" },
  { label: "Fleet & Aircraft", icon: Plane, view: "fleet" },
  { label: "Flights", icon: PlaneTakeoff, view: "flights" },
  { label: "Analytics", icon: BarChart3, view: "analytics" },
  { label: "Messages", icon: MessageCircle, view: "messages" },
  { label: "Settings", icon: SettingsIcon, view: "settings" },
  { label: "Help & Support", icon: HelpCircle, view: "help" },
];

/* Valid view keys — used to validate the :view route param and fall back
   to "dashboard" for anything unrecognized (e.g. /user-dashboard alone). */
const VALID_VIEWS = NAV_ITEMS.map((n) => n.view);

const STATS = [
  { label: "Total Flights Logged", value: "3,842", up: true,  icon: PlaneTakeoff },
  { label: "Active Pilots", value: "214", up: true, icon: Users },
  { label: "Monthly Flights", value: "6,510", up: false,  icon: Plane },
  { label: "Revenue", value: "₹24.6L", up: true, icon: Banknote },
  { label: "Avg. Flight Value", value: "₹8,140", up: true, icon: Scale },
  { label: "Pending Maintenance", value: "₹4.1L", up: false,  icon: BatteryCharging },
];

const RECENT_FLIGHTS = [
  { id: "#VF-5031", aircraft: "AstraVolt E1", pilot: "Capt. Arjun Mehta", status: "Completed", amount: "₹9,200", qty: "42 min", date: "Jun 28" },
  { id: "#VF-5030", aircraft: "Falcon eVTOL X2", pilot: "Capt. Priya Nair", status: "In-Flight", amount: "₹14,600", qty: "1h 05m", date: "Jun 28" },
  { id: "#VF-5029", aircraft: "Skyline Electra 9", pilot: "Capt. Rohan Iyer", status: "Boarding", amount: "₹5,300", qty: "28 min", date: "Jun 27" },
  { id: "#VF-5028", aircraft: "Nimbus e-Prop 3", pilot: "Capt. Fatima Sheikh", status: "Completed", amount: "₹11,900", qty: "55 min", date: "Jun 27" },
  { id: "#VF-5027", aircraft: "Halo Wing H2", pilot: "Capt. Vikram Rao", status: "Cancelled", amount: "₹6,750", qty: "—", date: "Jun 26" },
  { id: "#VF-5026", aircraft: "ZenAir Glide 400", pilot: "Capt. Fatima Sheikh", status: "Completed", amount: "₹8,020", qty: "38 min", date: "Jun 26" },
  { id: "#VF-5025", aircraft: "AstraVolt E1", pilot: "Capt. Arjun Mehta", status: "In-Flight", amount: "₹15,400", qty: "1h 20m", date: "Jun 25" },
  { id: "#VF-5024", aircraft: "Falcon eVTOL X2", pilot: "Capt. Meera Krishnan", status: "Boarding", amount: "₹4,600", qty: "22 min", date: "Jun 25" },
];

const TOP_AIRCRAFT = [
  { title: "AstraVolt E1", farmer: "Capt. Arjun Mehta", sales: 892, percent: 95 },
  { title: "Falcon eVTOL X2", farmer: "Capt. Priya Nair", sales: 741, percent: 79 },
  { title: "Skyline Electra 9", farmer: "Capt. Rohan Iyer", sales: 638, percent: 68 },
  { title: "Nimbus e-Prop 3", farmer: "Capt. Fatima Sheikh", sales: 504, percent: 54 },
  { title: "Halo Wing H2", farmer: "Capt. Vikram Rao", sales: 411, percent: 44 },
];

const ACTIVITY_FEED = [
  { icon: FilePlus, text: "New flight plan submitted by Capt. Arjun Mehta", time: "8 minutes ago", tone: "green" },
  { icon: CheckCircle2, text: "Flight #VF-5031 marked as completed", time: "2 hours ago", tone: "success" },
  { icon: UserPlus, text: "Capt. Meera Krishnan certified as a new pilot", time: "4 hours ago", tone: "info" },
  { icon: AlertCircle, text: "Flight #VF-5027 was cancelled due to weather", time: "6 hours ago", tone: "error" },
  { icon: Inbox, text: "5 new charter enquiries in your inbox", time: "Yesterday", tone: "green" },
  { icon: CloudUpload, text: "Battery diagnostics report uploaded for Bengaluru Hub", time: "Yesterday", tone: "info" },
  { icon: Banknote, text: "Payout of ₹86,400 settled to 6 pilots", time: "2 days ago", tone: "success" },
];

const UPCOMING_TASKS = [
  { title: "Battery health audit — Bengaluru Vertiport", date: "Today, 3:00 PM", priority: "High" },
  { title: "License renewal call with Capt. Fatima Sheikh", date: "Tomorrow, 10:00 AM", priority: "Medium" },
  { title: "Quarterly flight safety report due", date: "Jul 1", priority: "High" },
  { title: "Pilot onboarding webinar — Monsoon ops", date: "Jul 4", priority: "Low" },
  { title: "Charging infrastructure contract renewal", date: "Jul 6", priority: "Medium" },
  { title: "Quality audit — Falcon eVTOL X2 batch #18", date: "Jul 9", priority: "High" },
];

const NEW_PILOTS = [
  { name: "Meera Krishnan", region: "Bengaluru · eVTOL", plots: 3, joined: "4 hours ago" },
  { name: "Sameer Qureshi", region: "Hyderabad · Fixed-wing", plots: 7, joined: "1 day ago" },
  { name: "Ananya Bose", region: "Pune · Cargo Electric", plots: 2, joined: "3 days ago" },
  { name: "Devraj Singh", region: "Chennai · Hybrid", plots: 5, joined: "5 days ago" },
];

const REVIEWS = [
  { crop: "Falcon eVTOL X2", reviewer: "Verified Passenger", rating: 5, text: "Silent, smooth ascent and the skyline views on the Bengaluru hop were unreal." },
  { crop: "AstraVolt E1", reviewer: "Charter Client", rating: 4, text: "Great range and comfort, though boarding took a few minutes longer than expected." },
  { crop: "Skyline Electra 9", reviewer: "Verified Passenger", rating: 5, text: "Felt like flying in the future — zero vibration and barely any cabin noise." },
];

const FLIGHTS_BY_CATEGORY = [
  { genre: "Urban eVTOL Hops", percent: 38 },
  { genre: "Regional Fixed-Wing", percent: 27 },
  { genre: "Cargo Electric", percent: 17 },
  { genre: "Charter Flights", percent: 11 },
  { genre: "Training Flights", percent: 7 },
];

const HUBS = [
  { region: "Bengaluru Vertiport, Karnataka", farmers: 58, crop: "eVTOL, Fixed-wing", health: 92 },
  { region: "Hyderabad Skyport, Telangana", farmers: 41, crop: "Regional Fixed-wing", health: 87 },
  { region: "Pune Airfield, Maharashtra", farmers: 33, crop: "Cargo Electric", health: 95 },
  { region: "Patna Vertiport, Bihar", farmers: 27, crop: "eVTOL, Training", health: 78 },
  { region: "Warangal Airstrip, Telangana", farmers: 35, crop: "Hybrid, Charter", health: 84 },
  { region: "Jaipur Skyport, Rajasthan", farmers: 20, crop: "Fixed-wing, Cargo", health: 81 },
];

const MESSAGES_PREVIEW = [
  { name: "Capt. Vikram Rao", snippet: "Battery swap completed 20 min ahead of schedule.", time: "10m", unread: true },
  { name: "Ground Ops — Bengaluru", snippet: "Charging bay 4 confirmed for tomorrow, 7 AM slot.", time: "1h", unread: true },
  { name: "Capt. Fatima Sheikh", snippet: "Sent the renewed medical certificate, please check.", time: "3h", unread: false },
  { name: "Charter — Skyline Corp", snippet: "Can we discuss bulk pricing for weekly hops?", time: "Yesterday", unread: false },
];

const CERTIFICATIONS = [
  { label: "DGCA Operator License", status: "Active", expiry: "Mar 2027" },
  { label: "Type Certificate (eVTOL Class)", status: "Active", expiry: "Nov 2026" },
  { label: "Battery Safety Compliance (UL 2580)", status: "Renewal Due", expiry: "Jul 2026" },
  { label: "Noise Abatement Certification", status: "Active", expiry: "Jan 2027" },
];

const WEATHER_STRIP = [
  { day: "Today", temp: "31°C", note: "Clear skies · low turbulence" },
  { day: "Tue", temp: "29°C", note: "Light showers · caution" },
  { day: "Wed", temp: "28°C", note: "Cloudy · calm winds" },
  { day: "Thu", temp: "30°C", note: "Clear skies" },
  { day: "Fri", temp: "32°C", note: "Humid · good visibility" },
];

/* ── Pilots page ── */
const ALL_PILOTS = [
  { name: "Capt. Arjun Mehta", region: "Bengaluru, Karnataka", crop: "eVTOL, Urban Hops", plots: 6, rating: 4.8, status: "Active" },
  { name: "Capt. Priya Nair", region: "Hyderabad, Telangana", crop: "Fixed-wing Regional", plots: 9, rating: 4.6, status: "Active" },
  { name: "Capt. Fatima Sheikh", region: "Pune, Maharashtra", crop: "Cargo Electric", plots: 4, rating: 4.9, status: "Active" },
  { name: "Capt. Vikram Rao", region: "Warangal, Telangana", crop: "Hybrid Charter", plots: 5, rating: 4.9, status: "Active" },
  { name: "Meera Krishnan", region: "Bengaluru, Karnataka", crop: "eVTOL", plots: 3, rating: 4.4, status: "New" },
  { name: "Sameer Qureshi", region: "Hyderabad, Telangana", crop: "Fixed-wing, Training", plots: 7, rating: 4.5, status: "New" },
  { name: "Ananya Bose", region: "Pune, Maharashtra", crop: "Cargo Electric", plots: 2, rating: 4.3, status: "New" },
  { name: "Devraj Singh", region: "Chennai, Tamil Nadu", crop: "Hybrid", plots: 5, rating: 4.2, status: "New" },
  { name: "Capt. Rohan Iyer", region: "Chennai, Tamil Nadu", crop: "eVTOL, Charter", plots: 8, rating: 4.7, status: "Active" },
];

/* ── Fleet & Aircraft page ── */
const AIRCRAFT_FLEET = [
  { name: "AstraVolt E1", category: "eVTOL", farmers: 12, stock: "High", price: "₹9,200/hop" },
  { name: "Falcon eVTOL X2", category: "eVTOL", farmers: 24, stock: "High", price: "₹14,600/hop" },
  { name: "Skyline Electra 9", category: "Fixed-wing", farmers: 9, stock: "Medium", price: "₹5,300/hop" },
  { name: "Nimbus e-Prop 3", category: "Hybrid", farmers: 7, stock: "Medium", price: "₹11,900/hop" },
  { name: "Halo Wing H2", category: "Cargo Electric", farmers: 15, stock: "High", price: "₹6,750/hop" },
  { name: "ZenAir Glide 400", category: "Fixed-wing", farmers: 31, stock: "Low", price: "₹8,020/hop" },
  { name: "Cirrus Amp 7", category: "Training", farmers: 11, stock: "Medium", price: "₹3,400/hop" },
  { name: "Orion e-Twin", category: "Cargo Electric", farmers: 22, stock: "High", price: "₹12,100/hop" },
];

const HUB_HEALTH = HUBS;

/* ── Analytics page ── */
const MONTHLY_REVENUE = [
  { month: "Jan", value: 14.2 }, { month: "Feb", value: 15.8 }, { month: "Mar", value: 17.1 },
  { month: "Apr", value: 16.4 }, { month: "May", value: 19.9 }, { month: "Jun", value: 21.3 },
  { month: "Jul", value: 22.0 }, { month: "Aug", value: 20.5 }, { month: "Sep", value: 19.2 },
  { month: "Oct", value: 23.6 }, { month: "Nov", value: 24.0 }, { month: "Dec", value: 24.6 },
];

const ANALYTICS_KPIS = [
  { label: "On-Time Departure Rate", value: "96.2%", note: "Above 95% target" },
  { label: "Avg. Turnaround Time", value: "2.4 hrs", note: "Down from 2.9 hrs" },
  { label: "Repeat Passenger Rate", value: "58%", note: "Up 6 pts YoY" },
  { label: "Pilot Retention", value: "91%", note: "214 of 235 active" },
];

/* ── Settings page ── */
const SETTINGS_GROUPS = [
  {
    title: "Account",
    icon: UserCircle,
    items: [
      { label: "Profile details", desc: "Name, email, phone, organization role" },
      { label: "Organization", desc: "VoltAir Aviation Pvt. Ltd. · Bengaluru, Karnataka" },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { label: "Password", desc: "Last changed 3 months ago" },
      { label: "Two-factor authentication", desc: "Enabled via SMS" },
    ],
  },
  {
    title: "Billing",
    icon: CreditCard,
    items: [
      { label: "Payout account", desc: "HDFC Bank •••• 4821" },
      { label: "Invoices", desc: "View and download past invoices" },
    ],
  },
  {
    title: "Preferences",
    icon: Languages,
    items: [
      { label: "Language", desc: "English (India)" },
      { label: "Notification settings", desc: "Email, SMS, and in-app alerts" },
    ],
  },
];

/* ── Help & Support page ── */
const FAQ_ITEMS = [
  { q: "How do I onboard a new pilot?", a: "Go to Pilots and use the onboarding form to add base hub, aircraft type, and license details." },
  { q: "How are payouts calculated?", a: "Payouts are settled weekly based on completed flights minus platform commission." },
  { q: "How do I renew a certification?", a: "Open the certification card on the Dashboard and submit renewal documents." },
  { q: "Why was a flight marked cancelled?", a: "Flights are cancelled automatically if not confirmed by the pilot within 24 hours or on adverse weather advisories." },
];

const SUPPORT_CHANNELS = [
  { icon: Phone, label: "Call Support", detail: "+91 1800 200 3000 · 9 AM–7 PM" },
  { icon: MessageSquare, label: "Live Chat", detail: "Avg. response time: 4 minutes" },
  { icon: Mail, label: "Email Us", detail: "support@voltair.in" },
  { icon: Video, label: "Book a Demo Call", detail: "Walkthrough with onboarding team" },
];

const VIEW_HEADINGS = {
  dashboard: { title: "Clear skies ahead ⚡", subtitle: "Here's what's flying across your electric aviation network today." },
  pilots: { title: "Pilots", subtitle: "Every pilot certified on your electric aviation network, in one place." },
  fleet: { title: "Fleet & Aircraft", subtitle: "Catalog of aircraft, charge levels, and hub infrastructure health." },
  flights: { title: "Flights", subtitle: "Track every flight from boarding to landing." },
  analytics: { title: "Analytics", subtitle: "Revenue trends and performance across your network." },
  messages: { title: "Messages", subtitle: "Conversations with pilots, charter clients, and ground ops." },
  settings: { title: "Settings", subtitle: "Manage your account, security, billing, and preferences." },
  help: { title: "Help & Support", subtitle: "Answers to common questions and ways to reach our team." },
};

function priorityClass(p) {
  if (p === "High") return "priority-pill high";
  if (p === "Medium") return "priority-pill medium";
  return "priority-pill low";
}

function statusClass(status) {
  switch (status) {
    case "Completed": return "status-pill delivered";
    case "In-Flight": return "status-pill shipped";
    case "Boarding": return "status-pill processing";
    case "Cancelled": return "status-pill cancelled";
    default: return "status-pill";
  }
}

function certClass(status) {
  return status === "Active" ? "cert-pill active" : "cert-pill due";
}

function toneClass(tone) {
  return `activity-icon ${tone}`;
}

function healthClass(h) {
  if (h >= 90) return "health-bar-fill excellent";
  if (h >= 80) return "health-bar-fill good";
  return "health-bar-fill fair";
}

function pilotStatusClass(status) {
  return status === "Active" ? "status-pill delivered" : "status-pill processing";
}

function stockClass(stock) {
  if (stock === "High") return "status-pill delivered";
  if (stock === "Medium") return "status-pill processing";
  return "status-pill cancelled";
}

/* All placeholder buttons/links across the dashboard route to /404
   via useNavigate (client-side navigation, no full page reload). */
function DeadLink({ className, children, ariaLabel }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/404");
  };
  return (
    <a href="/404" className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // activeView now comes from the URL (/user-dashboard/:view) instead of
  // local-only state. This is what makes browser Back/Forward — and the
  // 404 page's "Go Back" button — land on the tab the user was actually
  // on, instead of always resetting to the default "dashboard" view.
  const { view } = useParams();
  const activeView = VALID_VIEWS.includes(view) ? view : "dashboard";

  const contentRef = useRef(null);
  const navigate = useNavigate();

  // If someone lands on plain /user-dashboard (no view segment) or on an
  // unrecognized view, normalize the URL to a real, distinct history
  // entry: /user-dashboard/dashboard.
  useEffect(() => {
    if (view !== activeView) {
      navigate(`/user-dashboard/${activeView}`, { replace: true });
    }
  }, [view, activeView, navigate]);

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  const goToView = (nextView) => {
    setSidebarOpen(false);
    // Pushes a new history entry per tab, e.g. /user-dashboard/settings,
    // so Back/Forward (and 404's Go Back) can return to the exact tab.
    navigate(`/user-dashboard/${nextView}`);
    // Scroll the actual scrollable content container back to the top.
    // (window.scrollTo alone does nothing when the scroll happens inside
    // the dash-content panel rather than on the window itself.)
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <div className="dash-page">

      {sidebarOpen && <div className="dash-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="dash-logo-area">
          <div className="dash-logo-placeholder" aria-label="Logo">
             <img src={logo} alt="" />
          </div>
          <button className="dash-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X />
          </button>
        </div>

        <nav className="dash-nav">
          <span className="dash-nav-label">Menu</span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.view === activeView;
            return (
              <button
                type="button"
                key={item.label}
                className={`dash-nav-item${isActive ? " active" : ""}`}
                onClick={() => goToView(item.view)}
              >
                <Icon className="dash-nav-icon" />
                <span>{item.label}</span>
                {isActive && <span className="dash-nav-dot" />}
              </button>
            );
          })}
        </nav>

        <div className="dash-sidebar-footer">
          <button type="button" className="dash-nav-item logout" onClick={handleLogout}>
            <LogOut className="dash-nav-icon" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="dash-main">
        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu />
          </button>

          <div className="dash-search">
            <Search className="dash-search-icon" />
            <input type="text" placeholder="Search aircraft, pilots, flights…" />
          </div>

          <div className="dash-topbar-actions">
            <DeadLink className="dash-icon-btn" ariaLabel="Notifications">
              <Bell />
              <span className="dash-icon-badge" />
            </DeadLink>
          </div>
        </header>

        <main className="dash-content" ref={contentRef}>
          <div className="dash-heading-row">
            <div>
              <h1>{VIEW_HEADINGS[activeView].title}</h1>
              <p>{VIEW_HEADINGS[activeView].subtitle}</p>
            </div>
            <div className="dash-heading-actions">
              <DeadLink className="dash-btn-secondary">
                <Download />
                Export Report
              </DeadLink>
            </div>
          </div>

          {activeView === "dashboard" && (
            <>
              <section className="weather-strip">
                <div className="weather-strip-label">
                  <Sun />
                  <span>Flight Weather Outlook · Bengaluru Region</span>
                </div>
                <div className="weather-strip-days">
                  {WEATHER_STRIP.map((w) => (
                    <div className="weather-day" key={w.day}>
                      <span className="weather-day-name">{w.day}</span>
                      <span className="weather-day-temp">{w.temp}</span>
                      <span className="weather-day-note">{w.note}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dash-stats">
                {STATS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <DeadLink className="dash-stat-card" key={s.label}>
                      <div className="stat-top-row">
                        <span className="stat-label">{s.label}</span>
                        <span className="stat-icon"><Icon /></span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-value">{s.value}</span>
                        <span className={`stat-delta ${s.up ? "up" : "down"}`}>
                          {s.up ? <TrendingUp /> : <TrendingDown />}
                          {s.delta}
                        </span>
                      </div>
                    </DeadLink>
                  );
                })}
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Recent Flights</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <div className="table-wrap">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Flight</th><th>Aircraft</th><th>Pilot</th><th>Duration</th><th>Date</th><th>Status</th><th>Amount</th><th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_FLIGHTS.map((o) => (
                          <tr key={o.id}>
                            <td className="muted">{o.id}</td>
                            <td className="strong">{o.aircraft}</td>
                            <td className="muted">{o.pilot}</td>
                            <td className="muted">{o.qty}</td>
                            <td className="muted">{o.date}</td>
                            <td><span className={statusClass(o.status)}>{o.status}</span></td>
                            <td className="strong">{o.amount}</td>
                            <td><DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Top Performing</h2>
                    <DeadLink className="dash-panel-link">Details</DeadLink>
                  </div>
                  <ul className="top-list">
                    {TOP_AIRCRAFT.map((b) => (
                      <li key={b.title}>
                        <DeadLink className="dash-top-item">
                          <div className="top-item-text">
                            <span className="top-item-title">{b.title}</span>
                            <span className="top-item-author">{b.farmer}</span>
                          </div>
                          <div className="top-item-bar-wrap">
                            <div className="top-item-bar"><div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} /></div>
                            <span className="top-item-sales">{b.sales} flights</span>
                          </div>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Recent Activity</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="activity-list">
                    {ACTIVITY_FEED.map((a, i) => {
                      const Icon = a.icon;
                      return (
                        <li key={i}>
                          <DeadLink className="dash-activity-item">
                            <span className={toneClass(a.tone)}><Icon /></span>
                            <div className="activity-text">
                              <span>{a.text}</span>
                              <span className="activity-time"><Clock /> {a.time}</span>
                            </div>
                          </DeadLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Upcoming Tasks</h2>
                    <DeadLink className="dash-panel-link">Manage</DeadLink>
                  </div>
                  <ul className="task-list">
                    {UPCOMING_TASKS.map((t, i) => (
                      <li key={i}>
                        <DeadLink className="dash-task-item">
                          <span className="task-icon"><Calendar /></span>
                          <div className="task-text">
                            <span className="task-title">{t.title}</span>
                            <span className="task-date">{t.date}</span>
                          </div>
                          <span className={priorityClass(t.priority)}>{t.priority}</span>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panels dash-panels-three">
                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>New Pilots</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="author-list">
                    {NEW_PILOTS.map((a) => (
                      <li key={a.name}>
                        <DeadLink className="dash-author-item">
                          <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("")}</span>
                          <div className="author-text">
                            <span className="author-name">{a.name}</span>
                            <span className="author-meta">{a.region} · {a.plots} flights</span>
                          </div>
                          <span className="author-joined">{a.joined}</span>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Flights by Category</h2>
                    <DeadLink className="dash-panel-link">Full report</DeadLink>
                  </div>
                  <ul className="genre-list">
                    {FLIGHTS_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row"><span className="genre-name">{g.genre}</span><span className="genre-percent">{g.percent}%</span></div>
                        <div className="genre-bar"><div className="genre-bar-fill" style={{ width: `${g.percent}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Latest Reviews</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="review-list">
                    {REVIEWS.map((r, i) => (
                      <li key={i}>
                        <DeadLink className="dash-review-item">
                          <div className="review-top">
                            <span className="review-book">{r.crop}</span>
                            <span className="review-stars">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star key={idx} className={idx < r.rating ? "filled" : ""} />
                              ))}
                            </span>
                          </div>
                          <p className="review-text">{r.text}</p>
                          <span className="review-by">— {r.reviewer}</span>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panels dash-panels-three">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Regional Hubs</h2>
                    <DeadLink className="dash-panel-link">View map</DeadLink>
                  </div>
                  <ul className="cluster-list">
                    {HUBS.map((c) => (
                      <li key={c.region}>
                        <DeadLink className="dash-cluster-item">
                          <span className="cluster-pin"><MapPin /></span>
                          <div className="cluster-text">
                            <span className="cluster-name">{c.region}</span>
                            <span className="cluster-meta">{c.farmers} pilots · {c.crop}</span>
                          </div>
                          <div className="cluster-health">
                            <div className="health-bar"><div className={healthClass(c.health)} style={{ width: `${c.health}%` }} /></div>
                            <span className="health-percent">{c.health}%</span>
                          </div>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Messages</h2>
                    <DeadLink className="dash-panel-link">Open inbox</DeadLink>
                  </div>
                  <ul className="message-list">
                    {MESSAGES_PREVIEW.map((m, i) => (
                      <li key={i}>
                        <DeadLink className="dash-message-item">
                          <span className="message-avatar">{m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                          <div className="message-text">
                            <div className="message-top"><span className="message-name">{m.name}</span><span className="message-time">{m.time}</span></div>
                            <span className="message-snippet">{m.snippet}</span>
                          </div>
                          {m.unread && <span className="message-dot" />}
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panel-card certifications-panel">
                <div className="panel-header">
                  <h2>Certifications &amp; Compliance</h2>
                  <DeadLink className="dash-panel-link">Manage</DeadLink>
                </div>
                <div className="cert-grid">
                  {CERTIFICATIONS.map((c) => (
                    <DeadLink className="dash-cert-card" key={c.label}>
                      <div className="cert-top"><ClipboardList className="cert-icon" /><span className={certClass(c.status)}>{c.status}</span></div>
                      <span className="cert-label">{c.label}</span>
                      <span className="cert-expiry">Valid until {c.expiry}</span>
                    </DeadLink>
                  ))}
                </div>
              </section>

              <section className="dash-panel-card quick-actions">
                <div className="panel-header"><h2>Quick Actions</h2></div>
                <div className="quick-grid">
                  <DeadLink className="dash-quick-card"><Plane /><span>Manage Fleet</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Users /><span>Manage Pilots</span></DeadLink>
                  <DeadLink className="dash-quick-card"><PlaneTakeoff /><span>View Flights</span></DeadLink>
                  <DeadLink className="dash-quick-card"><BarChart3 /><span>Full Analytics</span></DeadLink>
                  <DeadLink className="dash-quick-card"><BatteryCharging /><span>Battery Reports</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Truck /><span>Ground Ops</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Phone /><span>Contact Pilot</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Mail /><span>Charter Enquiries</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Tag /><span>Pricing Tools</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Filter /><span>Safety Filters</span></DeadLink>
                  <DeadLink className="dash-quick-card"><RefreshCw /><span>Rescheduling</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Sparkles /><span>Seasonal Routes</span></DeadLink>
                </div>
              </section>
            </>
          )}

          {activeView === "pilots" && (
            <>
              <section className="dash-stats">
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Total Pilots</span><span className="stat-icon"><Users /></span></div>
                  <div className="stat-row"><span className="stat-value">235</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Active</span><span className="stat-icon"><CheckCircle2 /></span></div>
                  <div className="stat-row"><span className="stat-value">214</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">New This Month</span><span className="stat-icon"><UserPlus /></span></div>
                  <div className="stat-row"><span className="stat-value">21</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Avg. Rating</span><span className="stat-icon"><Star /></span></div>
                  <div className="stat-row"><span className="stat-value">4.6</span></div>
                </div>
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>All Pilots</h2>
                  <DeadLink className="dash-panel-link"><PlusCircle style={{ marginRight: "0.3rem", verticalAlign: "-2px", width: "1em", height: "1em" }} />Onboard Pilot</DeadLink>
                </div>
                <div className="table-wrap">
                  <table className="dash-table">
                    <thead><tr><th>Pilot</th><th>Base Hub</th><th>Aircraft Type</th><th>Flights</th><th>Rating</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                      {ALL_PILOTS.map((f) => (
                        <tr key={f.name}>
                          <td className="strong">{f.name}</td>
                          <td className="muted">{f.region}</td>
                          <td className="muted">{f.crop}</td>
                          <td className="muted">{f.plots}</td>
                          <td className="muted">★ {f.rating}</td>
                          <td><span className={pilotStatusClass(f.status)}>{f.status}</span></td>
                          <td><DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeView === "fleet" && (
            <>
              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Aircraft Fleet</h2>
                    <DeadLink className="dash-panel-link">+ Add Aircraft</DeadLink>
                  </div>
                  <div className="table-wrap">
                    <table className="dash-table">
                      <thead><tr><th>Aircraft</th><th>Category</th><th>Pilots</th><th>Charge</th><th>Price</th><th></th></tr></thead>
                      <tbody>
                        {AIRCRAFT_FLEET.map((c) => (
                          <tr key={c.name}>
                            <td className="strong">{c.name}</td>
                            <td className="muted">{c.category}</td>
                            <td className="muted">{c.farmers}</td>
                            <td><span className={stockClass(c.stock)}>{c.stock}</span></td>
                            <td className="strong">{c.price}</td>
                            <td><DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Flights by Category</h2>
                    <DeadLink className="dash-panel-link">Full report</DeadLink>
                  </div>
                  <ul className="genre-list">
                    {FLIGHTS_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row"><span className="genre-name">{g.genre}</span><span className="genre-percent">{g.percent}%</span></div>
                        <div className="genre-bar"><div className="genre-bar-fill" style={{ width: `${g.percent}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>Charging Infra Health by Hub</h2>
                  <DeadLink className="dash-panel-link">View map</DeadLink>
                </div>
                <ul className="cluster-list">
                  {HUB_HEALTH.map((c) => (
                    <li key={c.region}>
                      <DeadLink className="dash-cluster-item">
                        <span className="cluster-pin"><Zap /></span>
                        <div className="cluster-text">
                          <span className="cluster-name">{c.region}</span>
                          <span className="cluster-meta">{c.farmers} pilots · {c.crop}</span>
                        </div>
                        <div className="cluster-health">
                          <div className="health-bar"><div className={healthClass(c.health)} style={{ width: `${c.health}%` }} /></div>
                          <span className="health-percent">{c.health}%</span>
                        </div>
                      </DeadLink>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {activeView === "flights" && (
            <section className="dash-panel-card">
              <div className="panel-header">
                <h2>All Flights</h2>
                <DeadLink className="dash-panel-link">Export CSV</DeadLink>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead><tr><th>Flight</th><th>Aircraft</th><th>Pilot</th><th>Duration</th><th>Date</th><th>Status</th><th>Amount</th><th></th></tr></thead>
                  <tbody>
                    {RECENT_FLIGHTS.map((o) => (
                      <tr key={o.id}>
                        <td className="muted">{o.id}</td>
                        <td className="strong">{o.aircraft}</td>
                        <td className="muted">{o.pilot}</td>
                        <td className="muted">{o.qty}</td>
                        <td className="muted">{o.date}</td>
                        <td><span className={statusClass(o.status)}>{o.status}</span></td>
                        <td className="strong">{o.amount}</td>
                        <td><DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeView === "analytics" && (
            <>
              <section className="dash-stats">
                {ANALYTICS_KPIS.map((k) => (
                  <div className="dash-stat-card" key={k.label}>
                    <div className="stat-top-row"><span className="stat-label">{k.label}</span><span className="stat-icon"><BarChart3 /></span></div>
                    <div className="stat-row"><span className="stat-value">{k.value}</span></div>
                    <span className="cert-expiry">{k.note}</span>
                  </div>
                ))}
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>Monthly Revenue (₹ Lakhs)</h2>
                  <DeadLink className="dash-panel-link">Export Report</DeadLink>
                </div>
                <div className="bar-chart">
                  {MONTHLY_REVENUE.map((m) => (
                    <div className="bar-chart-col" key={m.month}>
                      <div className="bar-chart-bar-wrap">
                        <div className="bar-chart-bar" style={{ height: `${(m.value / 25) * 100}%` }} title={`₹${m.value}L`} />
                      </div>
                      <span className="bar-chart-label">{m.month}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Top Performing Aircraft</h2>
                    <DeadLink className="dash-panel-link">Details</DeadLink>
                  </div>
                  <ul className="top-list">
                    {TOP_AIRCRAFT.map((b) => (
                      <li key={b.title}>
                        <DeadLink className="dash-top-item">
                          <div className="top-item-text"><span className="top-item-title">{b.title}</span><span className="top-item-author">{b.farmer}</span></div>
                          <div className="top-item-bar-wrap">
                            <div className="top-item-bar"><div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} /></div>
                            <span className="top-item-sales">{b.sales} flights</span>
                          </div>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Flights by Category</h2>
                    <DeadLink className="dash-panel-link">Full report</DeadLink>
                  </div>
                  <ul className="genre-list">
                    {FLIGHTS_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row"><span className="genre-name">{g.genre}</span><span className="genre-percent">{g.percent}%</span></div>
                        <div className="genre-bar"><div className="genre-bar-fill" style={{ width: `${g.percent}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}

          {activeView === "messages" && (
            <section className="dash-panel-card">
              <div className="panel-header">
                <h2>Inbox</h2>
                <DeadLink className="dash-panel-link"><Send style={{ marginRight: "0.3rem", verticalAlign: "-2px", width: "1em", height: "1em" }} />New Message</DeadLink>
              </div>
              <ul className="message-list">
                {MESSAGES_PREVIEW.concat(MESSAGES_PREVIEW.map((m, i) => ({
                  ...m,
                  name: i === 0 ? "Ground Ops — Hyderabad" : i === 1 ? "Capt. Rohan Iyer" : i === 2 ? "Charter — SkyBridge Corp" : "Meera Krishnan",
                  unread: false,
                }))).map((m, i) => (
                  <li key={i}>
                    <DeadLink className="dash-message-item">
                      <span className="message-avatar">{m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                      <div className="message-text">
                        <div className="message-top"><span className="message-name">{m.name}</span><span className="message-time">{m.time}</span></div>
                        <span className="message-snippet">{m.snippet}</span>
                      </div>
                      {m.unread && <span className="message-dot" />}
                    </DeadLink>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeView === "settings" && (
            <section className="dash-panels-three settings-grid">
              {SETTINGS_GROUPS.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <div className="dash-panel-card" key={group.title}>
                    <div className="panel-header">
                      <h2><GroupIcon style={{ marginRight: "0.5rem", verticalAlign: "-3px", color: "var(--green)", width: "1em", height: "1em" }} />{group.title}</h2>
                    </div>
                    <ul className="settings-list">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <DeadLink className="dash-settings-item">
                            <div className="settings-text"><span className="settings-label">{item.label}</span><span className="settings-desc">{item.desc}</span></div>
                            <ChevronRight className="settings-chevron" />
                          </DeadLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </section>
          )}

          {activeView === "help" && (
            <section className="dash-panels">
              <div className="dash-panel-card panel-wide">
                <div className="panel-header">
                  <h2>Frequently Asked Questions</h2>
                  <DeadLink className="dash-panel-link"><BookOpen style={{ marginRight: "0.3rem", verticalAlign: "-2px", width: "1em", height: "1em" }} />Full Help Center</DeadLink>
                </div>
                <ul className="faq-list">
                  {FAQ_ITEMS.map((f) => (
                    <li key={f.q} className="faq-item">
                      <span className="faq-q">{f.q}</span>
                      <span className="faq-a">{f.a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dash-panel-card">
                <div className="panel-header"><h2>Contact Us</h2></div>
                <ul className="support-list">
                  {SUPPORT_CHANNELS.map((s) => {
                    const SIcon = s.icon;
                    return (
                      <li key={s.label}>
                        <DeadLink className="dash-support-item">
                          <span className="support-icon"><SIcon /></span>
                          <div className="support-text"><span className="support-label">{s.label}</span><span className="support-detail">{s.detail}</span></div>
                          <ExternalLink className="settings-chevron" />
                        </DeadLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}