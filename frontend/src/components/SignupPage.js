import React from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";

function SignupPage({ setAuth }) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signup({ name, email, password });
    if (res.data?.token) {
      const authData = { token: res.data.token, user: res.data.user };
      setAuth(authData);
      localStorage.setItem("auth", JSON.stringify(authData));
      navigate("/shop");
    } else alert("Signup failed");
  }

  return (
    <div className="center">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required />
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
