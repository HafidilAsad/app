import { BrowserRouter, Routes, Route, } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard/dashboard";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;