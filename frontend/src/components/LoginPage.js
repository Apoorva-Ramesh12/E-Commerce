import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function LoginPage({ setAuth }) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await login({ email, password });
    if (res.data?.token) {
      const authData = { token: res.data.token, user: res.data.user };
      setAuth(authData);
      localStorage.setItem("auth", JSON.stringify(authData));

      if (authData.user.role === "admin") navigate("/admin");
      else navigate("/shop");
    } else alert("Login failed");
  }

  return (
    <div className="center">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
