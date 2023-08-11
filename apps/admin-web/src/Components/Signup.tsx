import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { adminParams } from "types";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

export const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const handleOnClick = async () => {
    try {
      const signupInput: adminParams = { username, password };
      const response = await axios.post(
        `${BASE_URL}/admin/signup`,
        JSON.stringify(signupInput),
        {
          headers: {
            'Content-Type': "application/json",
          },
        }
      );
      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/courses");
        setUser({isLoading: false, userEmail: username})
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
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below.
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={true}
            label="Password"
            variant={"outlined"}
            type={"password"}
          />
          <br />
          <br />
          <Button size={"large"} variant={"contained"} onClick={handleOnClick}>
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
};
