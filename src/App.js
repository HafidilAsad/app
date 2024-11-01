import { BrowserRouter, Routes, Route, } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<Dashboard />} />
           <Route path="/login" element={<Login />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;