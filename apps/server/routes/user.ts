import express from "express";
import { courseParams, courseTypes, userTypes } from "types";
import jwt from "jsonwebtoken";
import { Admin, Course, User } from "../db";
import { SECRET, authenticateJwt } from "../middleware/auth";
export const router = express.Router();

router.post("/signup", async (req, res) => {
  const parsedInput = userTypes.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(411).json({ error: parsedInput.error });
  }
  const { username, password } = parsedInput.data;
  const user = await User.findOne({ username, password });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, password }, SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "User created", token });
  }
});

router.post("/login", async (req, res) => {
  const parsedInput = userTypes.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(411).json({ error: parsedInput.error });
  }
  const { username, password } = parsedInput.data;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, password }, SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "User logged in", token });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.status(200).json({ courses });
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  console.log("purchasing")
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (course) {
    const parsedInput = userTypes.safeParse({
      username: req.headers["username"],
      password: req.headers["password"],
    });
    if (!parsedInput.success) {
      return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const user = await User.findOne({ username, password });
    if (user) {
      await user.populate("purchasedCourses");
    //   @ts-ignore
      user.purchasedCourses.push(course);
      await user.save();
      res.status(200).json({ message: "Course purchsed successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(403).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  const parsedInput = userTypes.safeParse({
    username: req.headers["username"],
    password: req.headers["password"],
  });
  if (!parsedInput.success) {
    return res.status(411).json({ error: parsedInput.error });
  }
  const { username, password } = parsedInput.data;
  const user = await User.findOne({ username, password });
  if (user) {
    await user.populate("purchasedCourses");
    res.status(200).json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});
