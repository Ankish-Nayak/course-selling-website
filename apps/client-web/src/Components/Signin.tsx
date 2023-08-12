import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config";
import { userParams } from "types";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

export const Signin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const handleOnClick = async () => {
    const signinInputs: userParams = {
      username,
      password,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        JSON.stringify(signinInputs),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser({
          isLoading: false,
          userEmail: username,
        });
        navigate("/courses");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Welcome to Coursera. Signin below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant={"outlined"}
          style={{
            width: 400,
            padding: 20,
          }}
        >
          <TextField
            fullWidth={true}
            onChange={(e) => setUsername(e.target.value)}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            fullWidth={true}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            onClick={() => handleOnClick()}
            variant="contained"
            size="large"
          >
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
};
