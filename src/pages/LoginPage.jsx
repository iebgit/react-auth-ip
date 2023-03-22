import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../GlobalState";
import axios from "axios";
import { LockIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
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

  useEffect(() => {
    if (authState?.token) {
      nav("/iplookup");
    } else {
      setIsSignup(false);
    }
  }, [authState]);

  const handleLogin = async () => {
    const login = await axios.get("http://localhost:3000/v1/login", {
      params: users,
    });
    setAuthState(login?.data);
  };

  const handleSignup = async () => {
    const signup = await axios.post("http://localhost:3000/v1/users", users);
    setAuthState(signup?.data);
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
      <h1 style={{ display: "flex" }}>
        <LockIcon w={8} h={9} color="orange.500" />
        <strong style={{ marginLeft: "5px" }}>
          {isSignup ? "Signup" : "Login"}
        </strong>
      </h1>

      <FormControl style={{ maxWidth: "300px" }} onSubmit={handleSubmit}>
        <Input
          size="sm"
          placeholder="User Name"
          type="text"
          value={users.username}
          onChange={(e) => setUsers({ ...users, username: e.target.value })}
        />

        <Input
          placeholder="Email Address"
          value={users.email}
          onChange={(e) => setUsers({ ...users, email: e.target.value })}
          type="email"
          size="sm"
        />

        <Input
          placeholder="Password"
          size="sm"
          type="password"
          value={users.password}
          onChange={(e) => setUsers({ ...users, password: e.target.value })}
        />
        <div
          style={{
            padding: "5px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="sm"
            colorScheme="twitter"
            onClick={(e) => handleSubmit(e)}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </Button>
        </div>
      </FormControl>
      <small
        style={{
          cursor: "pointer",
          color: "white",
          textDecoration: "underline",
        }}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Have an account? Login" : "Need an account? Sign up"}
      </small>
    </header>
  );
};

export default LoginPage;
