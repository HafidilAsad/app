import React from "react";
export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", color: "#fff", background: "#010101", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <h1>404 - Page Not Found</h1>
        <a href="https://solusiprogrammer.com/" style={{ color: "#5BE12C" }}>Back to Home</a>
      </div>
    </div>
  );
}