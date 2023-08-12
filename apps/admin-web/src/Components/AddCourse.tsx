import { Button, Card, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { courseParams } from "types";
import { BASE_URL } from "../config";

export const AddCourse = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const handleOnClick = async () => {
    try {
      const course: courseParams = {
        title,
        description,
        imageLink: image,
        price,
        published: true,
      };
      await axios.post(`${BASE_URL}/admin/courses`, JSON.stringify(course), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      alert("Added course!");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant={"outlined"}
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth={true}
            label="Title"
            variant={"outlined"}
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            label="Description"
            variant={"outlined"}
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setImage(e.target.value)}
            fullWidth={true}
            label="Image Link"
            variant={"outlined"}
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            fullWidth={true}
            label="Price"
            variant={"outlined"}
          />
          <Button
            size="large"
            variant={"contained"}
            onClick={() => {
              handleOnClick()
            }}
          >Add course</Button>
        </Card>
      </div>
    </div>
  );
};
