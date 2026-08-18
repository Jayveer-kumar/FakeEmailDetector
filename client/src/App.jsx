import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import ScrollToTop from "./Components/ScrollToTop";
// Pages
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import Refund from "./Pages/Refund";
import DataUsage from "./Pages/DataUsage";
import Dashboard from "./Pages/Admin/Dashboard"; 
export default function App() {

  return (
    <BrowserRouter>
  <ScrollToTop />
  <Routes>
    {/* Home page */}
    <Route path="/" element={<Home />} />
    {/* Admin Panel */}
    <Route path="/admin" element={<Dashboard />} />
    {/* Legal Pages */}
    <Route path="/terms" element={<Terms />} />
    <Route path="/privacy" element={<Privacy />} />
    <Route path="/refund" element={<Refund />} />
    <Route path="/data-usage" element={<DataUsage />} />
  </Routes>  
  </BrowserRouter>
  )

  // return (
  //   <Router>
  //     <Routes>

  //       {/* Home Page */}
  //       <Route path="/" element={<Home />} />

  //       {/* Admin Pannel */}
  //       <Route path="/admin" element={<Dashboard />} />

  //       {/* Legal Pages */}
  //       <Route path="/terms" element={<Terms />} />
  //       <Route path="/privacy" element={<Privacy />} />
  //       <Route path="/refund" element={<Refund />} />
  //       <Route path="/data-usage" element={<DataUsage />} />

  //     </Routes>
  //   </Router>
  // );

  
}
