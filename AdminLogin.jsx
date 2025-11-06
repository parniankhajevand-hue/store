import { useState } from "react";
import AdminLogin from "./Admin/AdminLogin.jsx";
import React, { useState } from "react";


export default function AdminLogin({ setIsAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      setIsAdmin(true);
      setError("");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>ورود ادمین</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>ورود</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}*/
commit new file
