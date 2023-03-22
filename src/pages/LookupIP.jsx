import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../GlobalState.js";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import "../App.css";
import axios from "axios";

export const LookupIP = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [field, setField] = useState(null);
  const [search, setSearch] = useState(null);
  const [res, setRes] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    if (!authState?.token) {
      nav("/login");
    }
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
    if (!authState?.token) {
      nav("/login");
    }
  }, [authState]);

  return (
    <div>
      {" "}
      <header className="App-header">
        <h1 style={{ display: "flex" }}>
          <Search2Icon w={8} h={9} color="blue.200" />
          <strong style={{ marginLeft: "5px" }}>IP Lookup</strong>{" "}
        </h1>

        <FormControl style={{ maxWidth: "300px" }}>
          <Input
            size="sm"
            placeholder="IP Address"
            onChange={(e) => setField(e.target.value)}
          ></Input>
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              size="sm"
              colorScheme="twitter"
              type="submit"
              onClick={() => setSearch(field)}
            >
              Submit
            </Button>
          </div>
        </FormControl>

        <br />
        <table>
          <tbody>
            {res ? (
              res?.addresses.map((address, i) => (
                <tr key={i}>
                  <td>{address.ip}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>0.0.0.0</td>
              </tr>
            )}
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default LookupIP;
