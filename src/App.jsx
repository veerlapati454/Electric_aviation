
import { HashRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout/MainLayout";

import Home from "./components/Home/Home";
import Testimonals from "./components/Testimonals/Testimonals";
import Features from "./components/Features/Features";
import About from "./components/About/About";
import Tech from "./components/Tech/Tech";
import Stats from "./components/Stats/Stats";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <HashRouter>
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
        {/* <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="*" element={<NotFound/>}/> */}

      </Routes>
    </HashRouter>
  );
}

export default App;