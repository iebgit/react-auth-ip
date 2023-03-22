import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../GlobalState.js";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

export const LookupIP = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [field, setField] = useState(null);
  const [search, setSearch] = useState(null);
  const [res, setRes] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (search) {
      const lookup = async () => {
        console.log(search);
        try {
          const response = await axios(
            `http://localhost:3000/v1/tools/lookup?domain=${search}`
          );
          console.log(response.data);
          setRes(response.data);
        } catch (e) {
          console.log(e);
        }
      };
      lookup();
    }
  }, [search]);

  useEffect(() => {
    if (authState?.status === "credentials added" || authState?.token) {
      nav("/iplookup");
    } else {
      nav("/login");
    }
  }, [authState]);

  return (
    <div>
      {" "}
      <header className="App-header">
        <p>welcome back, {authState?.user}</p>
        <h3>IP Lookup</h3>
        <div style={{ display: "flex" }}>
          <input onChange={(e) => setField(e.target.value)}></input>
          <button onClick={() => setSearch(field)}>submit</button>
        </div>
        <br />
        <strong style={{ color: "yellow" }}>{res?.domain}</strong>
        <table>
          <tbody>
            {res &&
              res?.addresses.map((address, i) => (
                <tr key={i}>
                  <td>{address.ip}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default LookupIP;
