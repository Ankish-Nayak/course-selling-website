import { RecoilRoot, useSetRecoilState } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Appbar } from "./Components/Appbar";
import { userState } from "./store/atoms/user";
import axios from "axios";
import { BASE_URL } from "./config";
import Courses from "./Components/Courses";
import { Signin } from "./Components/Signin";
import { Signup } from "./Components/Signup";
import { PurchasedCourses } from "./Components/PurchasedCourses";
import { Landing } from "./Components/Landing";
import { useEffect } from "react";
function App() {
  return (
    <RecoilRoot>
      <div style={{ width: "100vw", height: "100vh", background: "#eeeeee" }}>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/purchasedCourses"} element={<PurchasedCourses />} />
            <Route path={"/"} element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

const InitUser = () => {
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
          isLoading: true,
          userEmail: response.data.username,
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
};

export default App;
