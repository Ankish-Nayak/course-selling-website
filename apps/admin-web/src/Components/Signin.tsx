import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminParams } from "types";
import { BASE_URL } from "../config";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
export const Signin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const handleOnClick = async () => {
    const signinInputs: adminParams = {
      username,
      password,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/login`,
        JSON.stringify(signinInputs),
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
        setUser({
          isLoading: false,
          userEmail: username
        })
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
          Welcome to Coursera. Sign up below
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
            type="password"
          />
          <br />
          <br />

          <Button size={"large"} variant={"contained"} onClick={handleOnClick}>
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
};
