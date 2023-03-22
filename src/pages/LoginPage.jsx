import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../GlobalState";
import axios from "axios";
import { LockIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  ButtonGroup,
  Link,
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
      <Card
        variant="filled"
        style={{ backgroundColor: "#2C3E50 ", borderRadius: "25px" }}
      >
        <CardHeader>
          <Heading size="md">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <LockIcon w={8} h={8} color="orange.500" />
              <strong
                style={{ marginLeft: "5px", color: "white", fontSize: "30px" }}
              >
                {isSignup ? "Sign Up" : "Log In"}
              </strong>
            </div>
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl style={{ maxWidth: "220px" }} onSubmit={handleSubmit}>
            <Input
              style={{ backgroundColor: "white", borderRadius: "25px" }}
              size="sm"
              placeholder="User Name"
              type="text"
              value={users.username}
              onChange={(e) => setUsers({ ...users, username: e.target.value })}
            />

            <Input
              style={{ backgroundColor: "white", borderRadius: "25px" }}
              placeholder="Email Address"
              value={users.email}
              onChange={(e) => setUsers({ ...users, email: e.target.value })}
              type="email"
              size="sm"
            />

            <Input
              style={{ backgroundColor: "white", borderRadius: "25px" }}
              placeholder="Password"
              size="sm"
              type="password"
              value={users.password}
              onChange={(e) => setUsers({ ...users, password: e.target.value })}
            />
            {/* <div
          style={{
            padding: "10px",
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
        </div> */}
          </FormControl>
        </CardBody>
        <CardFooter justify="center">
          <ButtonGroup>
            <Button
              style={{ borderRadius: "25px" }}
              colorScheme="twitter"
              onClick={(e) => handleSubmit(e)}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      <Link
        style={{ fontSize: "16px", padding: "5px" }}
        onClick={() => setIsSignup(!isSignup)}
        href="#"
      >
        {isSignup ? "Have an account? Log In" : "Need an account? Sign Up"}{" "}
      </Link>
    </header>
  );
};

export default LoginPage;
