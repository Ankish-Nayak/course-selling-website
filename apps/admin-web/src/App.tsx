import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { Appbar } from "./Components/Appbar";
import { AddCourse } from "./Components/AddCourse";
import { Courses } from "./Components/Courses";
import { Course } from "./Components/Course";
import { Signin } from "./Components/Signin";
import { Signup } from "./Components/Signup";
import { Landing } from "./Components/Landing";
import { userState } from "./store/atoms/user";
import axios from "axios";
import { BASE_URL } from "./config";
function App() {
  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/addcourse"} element={<AddCourse />} />
            <Route path={"/course/:courseId"} element={<Course />} />
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/"} element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      console.log(e);
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <></>;
}

export default App;
