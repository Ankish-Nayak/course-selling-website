import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading, userEmailState } from "../store/selectors/user";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { userState } from "../store/atoms/user";

export const Appbar = () => {
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

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
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => navigate("/purchasedCourses")}>
                Purchase course
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => navigate("/courses")}>Courses</Button>
            </div>

            <Button
              variant={"contained"}
              onClick={() => {
                // @ts-ignore
                localStorage.setItem("token", null);
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                navigate('/')
              }}
            >
              Logout
            </Button>
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
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </div>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
};
