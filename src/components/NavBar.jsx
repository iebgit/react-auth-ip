import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../GlobalState";

function NavBar() {
  const [authState, setAuthState] = useContext(AuthContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#282c34",
        color: "white",
        padding: "10px",
      }}
    >
      <div>
        {authState?.token ? (
          <>
            <div onClick={() => setAuthState({})}>
              <Link style={{ color: "white", padding: "5px" }} to={"/login"}>
                Logout
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
      <div>
        <strong
          style={{
            color:
              authState?.status === "credentials added" || authState?.token
                ? "yellow"
                : "red",
          }}
        >
          {!!authState?.status
            ? authState.status
            : authState?.token
            ? `⚡ ${authState?.user}`
            : ""}
        </strong>
      </div>
    </div>
  );
}

export default NavBar;
