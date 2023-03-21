import React, { useState, useContext } from "react";
import { AuthContext } from "../GlobalState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoginPage = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const nav = useNavigate();
  const [users, setUsers] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async () => {
    const login = await axios.get("http://localhost:3000/v1/login", {
      params: users,
    });
    console.log(login?.data?.status);
    setAuthState(login?.data);
    if (login?.data?.token) {
      nav("/iplookup");
    }
  };

  const handleSignup = async () => {
    console.log(await axios.post("http://localhost:3000/v1/users", users));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      handleSignup(users);
    } else {
      handleLogin(users);
    }
  };

  return (
    <header className="App-header">
      <h3>{isSignup ? "Signup" : "Login"}</h3>
      <form onSubmit={handleSubmit}>
        <div
          style={{ padding: "5px", display: "flex", justifyContent: "center" }}
        >
          <input
            placeholder="Name"
            type="text"
            value={users.username}
            onChange={(e) => setUsers({ ...users, username: e.target.value })}
          />
        </div>

        <div
          style={{ padding: "5px", display: "flex", justifyContent: "center" }}
        >
          <input
            placeholder="E-mail"
            type="email"
            value={users.email}
            onChange={(e) => setUsers({ ...users, email: e.target.value })}
          />
        </div>

        <div
          style={{ padding: "5px", display: "flex", justifyContent: "center" }}
        >
          <input
            placeholder="Password"
            type="password"
            value={users.password}
            onChange={(e) => setUsers({ ...users, password: e.target.value })}
          />
        </div>

        <div
          style={{ padding: "5px", display: "flex", justifyContent: "center" }}
        >
          <button type="submit">{isSignup ? "Sign up" : "Login"}</button>
        </div>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Login"
          : "Need an account? Sign up"}
      </button>
      <small style={{ color: "red" }}>
        {!!authState?.status && authState.status}
      </small>
    </header>
  );
};

export default LoginPage;
