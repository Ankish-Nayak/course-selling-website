import axios from "axios";
import { useEffect, useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../config";
import { Card, Typography } from "@mui/material";

export const PurchasedCourses = () => {
  const [courses, setCourses] = useState<(courseParams & { _id: string })[]>();

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/purchasedCourses`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.purchasedCourses) {
        setCourses(response.data.purchasedCourses);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  if (!courses || courses.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" textAlign={"center"}>
          Courses Not Purchased Yet.
        </Typography>
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h5" textAlign={"center"}>
        Purchased Courses
      </Typography>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {courses.map((course, idx) => {
          return <Course course={course} key={idx} />;
        })}
      </div>
    </div>
  );
};

function Course({ course }: { course: courseParams & { _id: string } }) {
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign="center" variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign="center" variant={"subtitle1"}>
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }} />
    </Card>
  );
}
