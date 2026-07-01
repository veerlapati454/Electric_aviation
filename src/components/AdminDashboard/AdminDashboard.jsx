import { useState } from "react";
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
  UserCheck,
  UserX,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  Star,
  Download,
  MoreHorizontal,
  BatteryCharging,
  ClipboardList,
  MapPin,
  Sparkles,
  Banknote,
  Scale,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  Tag,
  ChevronRight,
  CreditCard,
  UserCircle,
  Lock,
  Languages,
  BookOpen,
  MessageSquare,
  Video,
  ExternalLink,
  Building2,
  Megaphone,
  KeyRound,
  FileWarning,
  Landmark,
  PlaneTakeoff,
  Server,
} from "lucide-react";
import "./AdminDashboard.css";
import logo from "../../assets/stackly_logo.webp"
import { Link, useNavigate } from "react-router-dom";

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

const STATS = [
  { label: "Platform Revenue (MTD)", value: "₹1.82Cr", up: true, icon: Banknote },
  { label: "Active Operators", value: "34", up: true, icon: Building2 },
  { label: "Total Pilots (Platform)", value: "1,240", up: true, icon: Users },
  { label: "Pending Approvals", value: "27", up: true, icon: UserCheck },
  { label: "Flights Today", value: "486", up: true, icon: PlaneTakeoff },
  { label: "Open Compliance Flags", value: "5", up: false, icon: ShieldAlert },
];

const RECENT_FLIGHTS = [
  { id: "#VF-5031", operator: "VoltAir Aviation", pilot: "Capt. Arjun Mehta", status: "Completed", amount: "₹9,200", qty: "42 min", date: "Jun 28" },
  { id: "#VF-5030", operator: "SkyBridge Corp", pilot: "Capt. Priya Nair", status: "In-Flight", amount: "₹14,600", qty: "1h 05m", date: "Jun 28" },
  { id: "#VF-5029", operator: "Nimbus Charters", pilot: "Capt. Rohan Iyer", status: "Boarding", amount: "₹5,300", qty: "28 min", date: "Jun 27" },
  { id: "#VF-5028", operator: "VoltAir Aviation", pilot: "Capt. Fatima Sheikh", status: "Completed", amount: "₹11,900", qty: "55 min", date: "Jun 27" },
  { id: "#VF-5027", operator: "Halo Air Mobility", pilot: "Capt. Vikram Rao", status: "Flagged", amount: "₹6,750", qty: "—", date: "Jun 26" },
  { id: "#VF-5026", operator: "ZenAir Regional", pilot: "Capt. Fatima Sheikh", status: "Completed", amount: "₹8,020", qty: "38 min", date: "Jun 26" },
  { id: "#VF-5025", operator: "VoltAir Aviation", pilot: "Capt. Arjun Mehta", status: "In-Flight", amount: "₹15,400", qty: "1h 20m", date: "Jun 25" },
  { id: "#VF-5024", operator: "SkyBridge Corp", pilot: "Capt. Meera Krishnan", status: "Boarding", amount: "₹4,600", qty: "22 min", date: "Jun 25" },
];

const TOP_OPERATORS = [
  { title: "VoltAir Aviation", farmer: "Bengaluru · 92 pilots", sales: 1284, percent: 96 },
  { title: "SkyBridge Corp", farmer: "Hyderabad · 61 pilots", sales: 918, percent: 74 },
  { title: "Nimbus Charters", farmer: "Pune · 40 pilots", sales: 705, percent: 58 },
  { title: "Halo Air Mobility", farmer: "Chennai · 33 pilots", sales: 512, percent: 46 },
  { title: "ZenAir Regional", farmer: "Warangal · 27 pilots", sales: 388, percent: 34 },
];

const ACTIVITY_FEED = [
  { icon: Building2, text: "New operator \"AeroLoop Mobility\" submitted onboarding documents", time: "12 minutes ago", tone: "info" },
  { icon: UserCheck, text: "Pilot Meera Krishnan approved by Compliance team", time: "1 hour ago", tone: "success" },
  { icon: ShieldAlert, text: "Flight #VF-5027 flagged for airspace deviation review", time: "3 hours ago", tone: "error" },
  { icon: Banknote, text: "Payout batch of ₹18.4L settled across 6 operators", time: "5 hours ago", tone: "success" },
  { icon: FileWarning, text: "Battery Safety Compliance renewal due for 3 operators", time: "Yesterday", tone: "green" },
  { icon: UserX, text: "Pilot application rejected — incomplete medical certification", time: "Yesterday", tone: "error" },
  { icon: Server, text: "Scheduled maintenance completed on booking API", time: "2 days ago", tone: "info" },
];

const UPCOMING_TASKS = [
  { title: "Review 27 pending pilot applications", date: "Today, 3:00 PM", priority: "High" },
  { title: "Quarterly platform compliance report due", date: "Jul 1", priority: "High" },
  { title: "Renew platform liability insurance", date: "Jul 3", priority: "Medium" },
  { title: "Operator contract renewal — SkyBridge Corp", date: "Jul 6", priority: "Medium" },
  { title: "Security audit — admin access logs", date: "Jul 9", priority: "High" },
  { title: "Onboard AeroLoop Mobility as new operator", date: "Jul 11", priority: "Low" },
];

const PENDING_APPROVALS = [
  { name: "Meera Krishnan", region: "Bengaluru · eVTOL", plots: "New pilot", joined: "Submitted 4 hours ago" },
  { name: "AeroLoop Mobility", region: "Chennai · Operator", plots: "New operator", joined: "Submitted 1 day ago" },
  { name: "Devraj Singh", region: "Chennai · Hybrid", plots: "New pilot", joined: "Submitted 3 days ago" },
  { name: "Orion e-Twin (Aircraft)", region: "Cargo Electric", plots: "New aircraft", joined: "Submitted 5 days ago" },
];

const ESCALATIONS = [
  { crop: "Falcon eVTOL X2 · SkyBridge Corp", reviewer: "Escalated by Support L2", rating: 2, text: "Passenger reported unclear boarding instructions and a 20-minute delay with no notice." },
  { crop: "AstraVolt E1 · VoltAir Aviation", reviewer: "Escalated by Compliance", rating: 3, text: "Battery diagnostics log missing for one leg of a charter route; operator asked to resubmit." },
  { crop: "Skyline Electra 9 · Nimbus Charters", reviewer: "Escalated by Support L1", rating: 4, text: "Minor billing discrepancy on a cargo run, resolved after operator review." },
];

const FLIGHTS_BY_CATEGORY = [
  { genre: "Urban eVTOL Hops", percent: 38 },
  { genre: "Regional Fixed-Wing", percent: 27 },
  { genre: "Cargo Electric", percent: 17 },
  { genre: "Charter Flights", percent: 11 },
  { genre: "Training Flights", percent: 7 },
];

const HUBS = [
  { region: "Bengaluru Vertiport, Karnataka", farmers: 92, crop: "3 operators active", health: 94 },
  { region: "Hyderabad Skyport, Telangana", farmers: 61, crop: "2 operators active", health: 88 },
  { region: "Pune Airfield, Maharashtra", farmers: 40, crop: "2 operators active", health: 91 },
  { region: "Patna Vertiport, Bihar", farmers: 18, crop: "1 operator active", health: 76 },
  { region: "Warangal Airstrip, Telangana", farmers: 27, crop: "1 operator active", health: 82 },
  { region: "Jaipur Skyport, Rajasthan", farmers: 15, crop: "1 operator active", health: 79 },
];

const MESSAGES_PREVIEW = [
  { name: "Compliance Team", snippet: "3 operators still pending their Q3 audit submission.", time: "10m", unread: true },
  { name: "SkyBridge Corp — Ops", snippet: "Requesting an extension on the pilot certification deadline.", time: "1h", unread: true },
  { name: "Support Escalations", snippet: "Ticket #4821 needs admin sign-off before refund.", time: "3h", unread: false },
  { name: "Finance Desk", snippet: "Payout batch for Jun 28 is ready for your approval.", time: "Yesterday", unread: false },
];

const CERTIFICATIONS = [
  { label: "DGCA Platform Operator License", status: "Active", expiry: "Mar 2027" },
  { label: "Type Certificates (All Fleets)", status: "Active", expiry: "Nov 2026" },
  { label: "Battery Safety Compliance (UL 2580)", status: "Renewal Due", expiry: "Jul 2026" },
  { label: "Platform Data Protection Audit", status: "Active", expiry: "Jan 2027" },
];

/* ── Pilots page (platform-wide roster + approvals) ── */
const ALL_PILOTS = [
  { name: "Capt. Arjun Mehta", region: "VoltAir Aviation", crop: "eVTOL, Urban Hops", plots: 6, rating: 4.8, status: "Active" },
  { name: "Capt. Priya Nair", region: "SkyBridge Corp", crop: "Fixed-wing Regional", plots: 9, rating: 4.6, status: "Active" },
  { name: "Capt. Fatima Sheikh", region: "VoltAir Aviation", crop: "Cargo Electric", plots: 4, rating: 4.9, status: "Active" },
  { name: "Capt. Vikram Rao", region: "Halo Air Mobility", crop: "Hybrid Charter", plots: 5, rating: 4.9, status: "Suspended" },
  { name: "Meera Krishnan", region: "VoltAir Aviation", crop: "eVTOL", plots: 3, rating: 4.4, status: "Pending" },
  { name: "Sameer Qureshi", region: "SkyBridge Corp", crop: "Fixed-wing, Training", plots: 7, rating: 4.5, status: "Pending" },
  { name: "Ananya Bose", region: "Nimbus Charters", crop: "Cargo Electric", plots: 2, rating: 4.3, status: "Pending" },
  { name: "Devraj Singh", region: "SkyBridge Corp", crop: "Hybrid", plots: 5, rating: 4.2, status: "Pending" },
  { name: "Capt. Rohan Iyer", region: "Nimbus Charters", crop: "eVTOL, Charter", plots: 8, rating: 4.7, status: "Active" },
];

/* ── Fleet & Aircraft page (platform-wide, approval status) ── */
const AIRCRAFT_FLEET = [
  { name: "AstraVolt E1", category: "eVTOL", farmers: "VoltAir Aviation", stock: "Approved", price: "₹9,200/hop" },
  { name: "Falcon eVTOL X2", category: "eVTOL", farmers: "SkyBridge Corp", stock: "Approved", price: "₹14,600/hop" },
  { name: "Skyline Electra 9", category: "Fixed-wing", farmers: "Nimbus Charters", stock: "Under Review", price: "₹5,300/hop" },
  { name: "Nimbus e-Prop 3", category: "Hybrid", farmers: "VoltAir Aviation", stock: "Approved", price: "₹11,900/hop" },
  { name: "Halo Wing H2", category: "Cargo Electric", farmers: "Halo Air Mobility", stock: "Flagged", price: "₹6,750/hop" },
  { name: "ZenAir Glide 400", category: "Fixed-wing", farmers: "ZenAir Regional", stock: "Approved", price: "₹8,020/hop" },
  { name: "Cirrus Amp 7", category: "Training", farmers: "VoltAir Aviation", stock: "Approved", price: "₹3,400/hop" },
  { name: "Orion e-Twin", category: "Cargo Electric", farmers: "AeroLoop Mobility", stock: "Under Review", price: "₹12,100/hop" },
];

/* ── Analytics page ── */
const MONTHLY_REVENUE = [
  { month: "Jan", value: 98 }, { month: "Feb", value: 105 }, { month: "Mar", value: 112 },
  { month: "Apr", value: 118 }, { month: "May", value: 134 }, { month: "Jun", value: 149 },
  { month: "Jul", value: 156 }, { month: "Aug", value: 148 }, { month: "Sep", value: 141 },
  { month: "Oct", value: 163 }, { month: "Nov", value: 171 }, { month: "Dec", value: 182 },
];

const ANALYTICS_KPIS = [
  { label: "Platform On-Time Rate", value: "95.4%", note: "Across 34 operators" },
  { label: "Avg. Approval Turnaround", value: "1.8 days", note: "Down from 2.6 days" },
  { label: "Operator Retention", value: "94%", note: "Up 4 pts YoY" },
  { label: "Compliance Pass Rate", value: "97%", note: "5 open flags of 182 checks" },
];

/* ── Settings page (admin scope) ── */
const SETTINGS_GROUPS = [
  {
    title: "Admin Account",
    icon: UserCircle,
    items: [
      { label: "Profile details", desc: "Name, email, phone, admin role" },
      { label: "Admin team & roles", desc: "12 admins across Compliance, Support, Finance" },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { label: "Password", desc: "Last changed 2 months ago" },
      { label: "Two-factor authentication", desc: "Enabled via authenticator app" },
      { label: "Access logs", desc: "Review recent admin sign-ins" },
    ],
  },
  {
    title: "Platform Finance",
    icon: CreditCard,
    items: [
      { label: "Payout rules", desc: "Commission split and payout schedule" },
      { label: "Invoices & statements", desc: "View and download platform statements" },
    ],
  },
  {
    title: "Platform Preferences",
    icon: Languages,
    items: [
      { label: "Language", desc: "English (India)" },
      { label: "Notification rules", desc: "Escalation thresholds for alerts" },
    ],
  },
];

/* ── Help & Support page ── */
const FAQ_ITEMS = [
  { q: "How do I approve a new operator?", a: "Go to Pilots and review the pending approval, then verify licensing documents before confirming." },
  { q: "How are compliance flags triggered?", a: "Flags are raised automatically from flight anomalies, expired certifications, or manual escalations from Support." },
  { q: "How do payouts get approved?", a: "Finance batches payouts weekly; an admin sign-off is required before funds are released to operators." },
  { q: "Who can manage admin roles?", a: "Only Super Admins can add or remove admin accounts, under Settings → Admin team & roles." },
];

const SUPPORT_CHANNELS = [
  { icon: Phone, label: "Call Platform Support", detail: "+91 1800 200 3000 · 9 AM–7 PM" },
  { icon: MessageSquare, label: "Live Chat", detail: "Avg. response time: 4 minutes" },
  { icon: Mail, label: "Email Admin Desk", detail: "admin-support@voltair.in" },
  { icon: Video, label: "Book an Ops Review", detail: "Walkthrough with platform team" },
];

const VIEW_HEADINGS = {
  dashboard: { title: "Platform overview ⚡", subtitle: "Here's what's happening across every operator on VoltAir today." },
  pilots: { title: "Pilots", subtitle: "Every pilot across all operators, with approvals pending your review." },
  fleet: { title: "Fleet & Aircraft", subtitle: "Aircraft registered platform-wide, with approval status by operator." },
  flights: { title: "Flights", subtitle: "Every flight logged across all operators on the platform." },
  analytics: { title: "Analytics", subtitle: "Platform-wide performance, revenue, and compliance trends." },
  messages: { title: "Messages", subtitle: "Conversations with operators, compliance, finance, and support teams." },
  settings: { title: "Settings", subtitle: "Manage the admin team, security, payouts, and platform preferences." },
  help: { title: "Help & Support", subtitle: "Answers to common admin questions and ways to reach the platform team." },
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
    case "Flagged": return "status-pill cancelled";
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
  if (status === "Active") return "status-pill delivered";
  if (status === "Pending") return "status-pill processing";
  return "status-pill cancelled";
}

function stockClass(stock) {
  if (stock === "Approved") return "status-pill delivered";
  if (stock === "Under Review") return "status-pill processing";
  return "status-pill cancelled";
}

/* All placeholder buttons/links across the admin dashboard route to /404
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

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const navigate=useNavigate();

  const handleLogout = () => {
    setSidebarOpen(false);
   
    navigate("/login")
  };

  const goToView = (view) => {
    setActiveView(view);
    setSidebarOpen(false);
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
          <span className="dash-nav-label">Admin Menu</span>
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
            <input type="text" placeholder="Search operators, pilots, flights…" />
          </div>

          <div className="dash-topbar-actions">
            <DeadLink className="dash-icon-btn" ariaLabel="Notifications">
              <Bell />
              <span className="dash-icon-badge" />
            </DeadLink>
          </div>
        </header>

        <main className="dash-content">
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
                        </span>
                      </div>
                    </DeadLink>
                  );
                })}
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Recent Flights (All Operators)</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <div className="table-wrap">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Flight</th><th>Operator</th><th>Pilot</th><th>Duration</th><th>Date</th><th>Status</th><th>Amount</th><th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_FLIGHTS.map((o) => (
                          <tr key={o.id}>
                            <td className="muted">{o.id}</td>
                            <td className="strong">{o.operator}</td>
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
                    <h2>Top Operators</h2>
                    <DeadLink className="dash-panel-link">Details</DeadLink>
                  </div>
                  <ul className="top-list">
                    {TOP_OPERATORS.map((b) => (
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
                    <h2>Pending Approvals</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="author-list">
                    {PENDING_APPROVALS.map((a) => (
                      <li key={a.name}>
                        <DeadLink className="dash-author-item">
                          <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                          <div className="author-text">
                            <span className="author-name">{a.name}</span>
                            <span className="author-meta">{a.region} · {a.plots}</span>
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
                    <h2>Escalations</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="review-list">
                    {ESCALATIONS.map((r, i) => (
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
                  <h2>Platform Certifications &amp; Compliance</h2>
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
                  <DeadLink className="dash-quick-card"><UserCheck /><span>Approve Pilots</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Plane /><span>Approve Aircraft</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Building2 /><span>Manage Operators</span></DeadLink>
                  <DeadLink className="dash-quick-card"><ShieldCheck /><span>Compliance Audit</span></DeadLink>
                  <DeadLink className="dash-quick-card"><BarChart3 /><span>Full Analytics</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Landmark /><span>Approve Payouts</span></DeadLink>
                  <DeadLink className="dash-quick-card"><MessageSquare /><span>Support Escalations</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Megaphone /><span>Broadcast Announcement</span></DeadLink>
                  <DeadLink className="dash-quick-card"><KeyRound /><span>Admin Access Logs</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Filter /><span>Compliance Filters</span></DeadLink>
                  <DeadLink className="dash-quick-card"><RefreshCw /><span>Reprocess Flags</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Sparkles /><span>Platform Announcements</span></DeadLink>
                </div>
              </section>
            </>
          )}

          {activeView === "pilots" && (
            <>
              <section className="dash-stats">
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Total Pilots</span><span className="stat-icon"><Users /></span></div>
                  <div className="stat-row"><span className="stat-value">1,240</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Active</span><span className="stat-icon"><CheckCircle2 /></span></div>
                  <div className="stat-row"><span className="stat-value">1,142</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Pending Approval</span><span className="stat-icon"><UserCheck /></span></div>
                  <div className="stat-row"><span className="stat-value">27</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Suspended</span><span className="stat-icon"><UserX /></span></div>
                  <div className="stat-row"><span className="stat-value">6</span></div>
                </div>
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>All Pilots (Platform-wide)</h2>
                  <DeadLink className="dash-panel-link">Export CSV</DeadLink>
                </div>
                <div className="table-wrap">
                  <table className="dash-table">
                    <thead><tr><th>Pilot</th><th>Operator</th><th>Aircraft Type</th><th>Flights</th><th>Rating</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                      {ALL_PILOTS.map((f) => (
                        <tr key={f.name}>
                          <td className="strong">{f.name}</td>
                          <td className="muted">{f.region}</td>
                          <td className="muted">{f.crop}</td>
                          <td className="muted">{f.plots}</td>
                          <td className="muted">★ {f.rating}</td>
                          <td><span className={pilotStatusClass(f.status)}>{f.status}</span></td>
                          <td>
                            {f.status === "Pending" ? (
                              <DeadLink className="dash-row-action" ariaLabel="Approve pilot"><UserCheck /></DeadLink>
                            ) : (
                              <DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink>
                            )}
                          </td>
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
                    <h2>Aircraft Fleet (Platform-wide)</h2>
                    <DeadLink className="dash-panel-link">Review Submissions</DeadLink>
                  </div>
                  <div className="table-wrap">
                    <table className="dash-table">
                      <thead><tr><th>Aircraft</th><th>Category</th><th>Operator</th><th>Approval</th><th>Price</th><th></th></tr></thead>
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
                  <h2>Hub Compliance Health</h2>
                  <DeadLink className="dash-panel-link">View map</DeadLink>
                </div>
                <ul className="cluster-list">
                  {HUBS.map((c) => (
                    <li key={c.region}>
                      <DeadLink className="dash-cluster-item">
                        <span className="cluster-pin"><ShieldCheck /></span>
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
                <h2>All Flights (Platform-wide)</h2>
                <DeadLink className="dash-panel-link">Export CSV</DeadLink>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead><tr><th>Flight</th><th>Operator</th><th>Pilot</th><th>Duration</th><th>Date</th><th>Status</th><th>Amount</th><th></th></tr></thead>
                  <tbody>
                    {RECENT_FLIGHTS.map((o) => (
                      <tr key={o.id}>
                        <td className="muted">{o.id}</td>
                        <td className="strong">{o.operator}</td>
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
                  <h2>Monthly Platform Revenue (₹ Lakhs)</h2>
                  <DeadLink className="dash-panel-link">Export Report</DeadLink>
                </div>
                <div className="bar-chart">
                  {MONTHLY_REVENUE.map((m) => (
                    <div className="bar-chart-col" key={m.month}>
                      <div className="bar-chart-bar-wrap">
                        <div className="bar-chart-bar" style={{ height: `${(m.value / 200) * 100}%` }} title={`₹${m.value}L`} />
                      </div>
                      <span className="bar-chart-label">{m.month}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Top Operators by Revenue</h2>
                    <DeadLink className="dash-panel-link">Details</DeadLink>
                  </div>
                  <ul className="top-list">
                    {TOP_OPERATORS.map((b) => (
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
                <DeadLink className="dash-panel-link"><Mail style={{ marginRight: "0.3rem", verticalAlign: "-2px", width: "1em", height: "1em" }} />New Message</DeadLink>
              </div>
              <ul className="message-list">
                {MESSAGES_PREVIEW.concat(MESSAGES_PREVIEW.map((m, i) => ({
                  ...m,
                  name: i === 0 ? "Nimbus Charters — Ops" : i === 1 ? "Compliance Team" : i === 2 ? "Finance Desk" : "Support Escalations",
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