import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { courseParams, courseTypes } from "types";
import { Button, Card, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const getPurchasedCourses = async (): Promise<Map<string, boolean>> => {
    const purchasedCourses = new Map<string, boolean>();
    try {
      const response = await axios.get(`${BASE_URL}/user/purchasedCourses`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.purchasedCourses) {
        response.data.purchasedCourses.forEach(
          (course: courseParams & { _id: string }) => {
            purchasedCourses.set(course._id, true);
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
    return purchasedCourses;
  };
  const init = async (purchasedCourses: Map<string, boolean>) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/courses`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.courses) {
        const updatedCourses = response.data.courses.filter(
          (course: courseParams & { _id: string }) =>
            !purchasedCourses.get(course._id)
        );
        setCourses(updatedCourses);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPurchasedCourses().then((purchasedCourses) => init(purchasedCourses));
  }, []);
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {courses.map((course,idx) => {
        return <Course course={course} key={idx}/>;
      })}
    </div>
  );
};

function Course({ course }: { course: courseParams & { _id: string } }) {
  const navigate = useNavigate();
  const handleOnClick = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/user/courses/${course._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      alert(response.data.message);
      if(response.data.message === "Course purchsed successfully"){
        navigate('/purchasedCourses');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h6">
        {course.title}
      </Typography>
      <Typography textAlign="center" variant={"subtitle1"}>
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            handleOnClick();
          }}
        >
          Purchase
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
