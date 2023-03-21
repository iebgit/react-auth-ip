import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../GlobalState";

function NavBar() {
  const [authState, setAuthState] = useContext(AuthContext);
  return (
    <div style={{ backgroundColor: "#282c34", color: "white" }}>
      <br />
      {authState?.token ? (
        <>
          <div onClick={() => setAuthState({})}>
            <Link style={{ color: "white", padding: "5px" }} to={"/login"}>
              logout
            </Link>
          </div>
          <Link style={{ color: "white", padding: "5px" }} to={"/iplookup"}>
            IP Lookup
          </Link>
        </>
      ) : (
        <Link style={{ color: "white", padding: "5px" }} to={"/login"}>
          Login
        </Link>
      )}
    </div>
  );
}

export default NavBar;
