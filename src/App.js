import { BrowserRouter, Routes, Route, } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Dashboardv2 from "./pages/dashboard/dashboardv2";


function App() {
  return (
    <div>
      <BrowserRouter  >
        <Routes >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/v2/dashboard" element={<Dashboardv2 />} />
          <Route path="/" element={<Login />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;