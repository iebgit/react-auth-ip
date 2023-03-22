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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  ButtonGroup,
  Link,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
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
        <Card
          variant="filled"
          style={{ backgroundColor: "#2C3E50 ", borderRadius: "25px" }}
        >
          <CardHeader>
            <div style={{ display: "flex" }}>
              <Search2Icon w={8} h={9} color="blue.200" />
              <strong
                style={{ marginLeft: "5px", color: "white", fontSize: "30px" }}
              >
                IP Lookup
              </strong>{" "}
            </div>
          </CardHeader>
          <CardBody>
            <FormControl style={{ maxWidth: "300px" }}>
              <Input
                style={{ backgroundColor: "white", borderRadius: "25px" }}
                type="text"
                size="sm"
                placeholder="IP Address"
                onChange={(e) => setField(e.target.value)}
              ></Input>
            </FormControl>
          </CardBody>
          <CardFooter
            style={{
              justifyContent: "center",
            }}
          >
            <ButtonGroup>
              <Button
                style={{ borderRadius: "25px" }}
                colorScheme="twitter"
                type="submit"
                onClick={() => setSearch(field)}
              >
                Submit
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              {res ? (
                res?.addresses.map((address, i) => (
                  <Tr key={i}>
                    <Td>{address.ip}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td>0.0.0.0</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </header>
    </div>
  );
};

export default LookupIP;
