import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading, userEmailState } from "../store/selectors/user";
import { userState } from "../store/atoms/user";
import { Button, Typography } from "@mui/material";

export const Appbar = () => {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return <></>;
  }
  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => navigate("/addcourse")}>Add Course</Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => navigate("/courses")}>Courses</Button>
              <Button
                variant={"contained"}
                onClick={() => {
                  // @ts-ignore
                  localStorage.setItem("token", null);
                  setUser({
                    isLoading: false,
                    userEmail: null,
                  });
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Typography variant="h6">Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button variant={"contained"} onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
          <div>
            <Button variant={"contained"} onClick={() => navigate("/signin")}>
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
