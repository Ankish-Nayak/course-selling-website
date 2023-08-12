import axios from "axios";
import { useState } from "react";
import { userParams } from "types";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";

export const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const handelOnClick = async () => {
    const signupInputs: userParams = {
      username,
      password,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/user/signup`,
        JSON.stringify(signupInputs),
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
          userEmail: username
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
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            variant="outlined"
            label="Email"
            fullWidth={true}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /> <br />
          <TextField
            variant="outlined"
            label="Password"
            fullWidth={true}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <br /> <br />
          <Button
            variant="contained"
            size={"large"}
            onClick={() => handelOnClick()}
          >
            SignUp
          </Button>
        </Card>
      </div>
    </div>
  );
};
