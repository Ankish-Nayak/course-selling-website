import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseDetails,
  courseImage,
  coursePrice,
  courseTitle,
  isCourseLoading,
} from "../store/selectors/course";
import { useParams } from "react-router-dom";
import { courseState } from "../store/atoms/course";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { courseParams } from "types";
import {
  Button,
  ButtonBase,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Loading } from "./Loading";

export const Course = () => {
  let { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/course/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = response.data;
      if (data.course) {
        setCourse({ isLoading: false, course: data.course });
      }
    } catch (e) {
      //   const course: courseParams = {
      //     _id: courseDetails.course._id,
      //     title: "",
      //     description: "",
      //     price: 0,
      //     imageLink: "",
      //     published: false,
      //   };

      //   setCourse({ isLoading: false, course: course });
      console.log(e);
    }
  };
  useEffect(() => {
    init();
  }, []);
  if (courseLoading) {
    return <Loading />;
  }
  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
};

const GrayTopper = () => {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const UpdateCard = () => {
  const [courseDetails, setCourse] = useRecoilState(courseState);
  const [title, setTitle] = useState<string>(courseDetails.course.title);
  const [description, setDescription] = useState<string>(
    courseDetails.course.description
  );
  const [image, setImage] = useState<string>(courseDetails.course.imageLink);
  const [price, setPrice] = useState<number>(courseDetails.course.price);

  const handleOnClick = async () => {
    console.log("a");
    try {
      const updatedCourse: courseParams = {
        title,
        description,
        price,
        imageLink: image,
        published: true,
      };
      await axios.put(
        `${BASE_URL}/admin/courses/${courseDetails.course._id}`,
        JSON.stringify(updatedCourse),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setCourse({
        isLoading: false,
        course: {
          _id: courseDetails.course._id,
          ...updatedCourse,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{
          maxWidth: 600,
          marginTop: 200,
        }}
      >
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update Course Details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => setImage(e.target.value)}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
          />

          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value))) {
                setPrice(parseInt(e.target.value));
              } else {
                setPrice(0);
              }
            }}
            fullWidth={true}
            label={"Price"}
            variant={"outlined"}
          />
          <Button variant={"contained"} onClick={() => handleOnClick()}>
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
};

const CourseCard = () => {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);

  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={imageLink} style={{ width: 350 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
          <Price />
        </div>
      </Card>
    </div>
  );
};

const Price = () => {
  const price = useRecoilValue(coursePrice);
  return (
    <>
      <Typography variant="subtitle2" style={{ color: "gray" }}>
        Price
      </Typography>
      <Typography variant="subtitle1">
        <b>Rs {price} </b>
      </Typography>
    </>
  );
};
