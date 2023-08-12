import axios from "axios";
import { useEffect, useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";

type _id = {
  _id: string;
};
export const Courses = () => {
  const [courses, setCourses] = useState<(courseParams & _id)[]>();
  const init = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/courses`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = response.data;
      if (data.courses) {
        setCourses(data.courses);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {!courses ||
        courses.map((course, idx) => {
          return <Course course={course} key={idx} />;
        })}
    </div>
  );
};
function Course({ course }: { course: courseParams & _id }) {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant={"h5"}>
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant={"subtitle1"}>
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          variant="contained"
          size={"large"}
          onClick={() => {
            navigate("/course/" + course._id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}
