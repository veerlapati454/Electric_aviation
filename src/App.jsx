import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";

import Home from "./components/Home/Home";
import Testimonals from "./components/Testimonals/Testimonals";
import Features from "./components/Features/Features";
import About from "./components/About/About";
import Tech from "./components/Tech/Tech";
import Stats from "./components/Stats/Stats";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import UserDashboard from "./components/UserDashboard/UserDashboard"
import Register from "./components/Register/Register";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ElectricAviation404 from "./components/NotFound/NotFound"
import ScrollToTop from "./components/ScrollToTop";
function App() {
  return (
    <HashRouter>
      <ScrollToTop/>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/testimonals" element={<Testimonals />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tech" element={<Tech />} />
                    <Route path="/stats" element={<Stats />} />         
        </Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* :view? is optional — /user-dashboard alone still matches and
            the component redirects it to /user-dashboard/dashboard.
            /user-dashboard/pilots, /user-dashboard/settings, etc. are now
            real, distinct URLs that live in browser history, so Go Back
            from the 404 page returns to the exact tab the user was on,
            instead of always resetting to the default dashboard view. */}
        <Route path="/user-dashboard/:view?" element={<UserDashboard/>}/>
        {/* :view? is optional — /admin-dashboard alone still matches and
            defaults to the "dashboard" tab. /admin-dashboard/pilots,
            /admin-dashboard/messages, etc. now become real, distinct URLs
            that live in browser history, so Go Back can return to them. */}
        <Route path="/admin-dashboard/:view?" element={<AdminDashboard/>}/>

        <Route path="*" element={<ElectricAviation404/>}/>

      </Routes>
    </HashRouter>
  );
}

export default App;