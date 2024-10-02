import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
      <button onClick={() => navigate("/dashboard")}>dashboard</button>
      <button onClick={() => navigate("/register")}>New</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default Header;
