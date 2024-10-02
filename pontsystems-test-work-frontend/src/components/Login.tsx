import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  // const { loading, error } = useAxios();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div style={{ marginLeft: "4rem" }}>
      <h2>Bejelentkezés</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <label htmlFor="username">Felhasználónév</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Jelszó</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Bejelentkezés
        </button>
      </form>
      <div>
        {isAuthenticated ? "Sikeres bejelentkezés" : "Sikertelen bejelentkezés"}
      </div>
    </div>
  );
};

export default Login;
