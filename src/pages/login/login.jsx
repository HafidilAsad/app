import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the default form submission
    // Perform login logic here (e.g., authentication)
    // If login is successful:
    navigate('/dashboard'); // Navigate to the dashboard
  };

  return (
    <div style={{
      minWidth: "100vw",
      minHeight: "100vh",
      fontFamily: "monospace",
      backgroundColor: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="card shadow-sm border-0 rounded-4 w-25">
        <div className="card-body">
          <h2 className="card-title text-center mb-5">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" required />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-5 mb-2">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
