import { BrowserRouter, Routes, Route, } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Dashboardv2 from "./pages/dashboard/dashboardv2";
import DashboardV3 from "./pages/dashboard/dashboardV3";
import DashboardV4 from "./pages/dashboard/dashboardv4";
import DashboardV5 from "./pages/dashboard/dashboardv5";
import NotFound from "./pages/notFound/index.jsx";


function App() {
  return (
    <div>
      <BrowserRouter  >
        <Routes >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/v2/dashboard" element={<Dashboardv2 />} />
          <Route path="/v3/dashboard" element={<DashboardV3 />} />
          <Route path="/v4/dashboard" element={<DashboardV4 />} />
          <Route path="/v5/dashboard" element={<DashboardV5 />} />
          <Route path="/" element={<Login />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;