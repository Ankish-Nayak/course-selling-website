import express from 'express';
import mongoose from 'mongoose';
import {adminTypes, courseTypes} from 'types';
import { Admin, Course } from '../db';
import jwt from 'jsonwebtoken';
import { SECRET, authenticateJwt } from '../middleware/auth';


export const router = express.Router();

router.post("/signup",async ( req, res) => {
   const parsedInput = adminTypes.safeParse(req.body);
   console.log(req.body);
   if(!parsedInput.success){
    return res.status(411).json({error: parsedInput.error});
   }
   const { username, password} = parsedInput.data;
   const admin = await Admin.findOne({username,password});
   if(admin){
    return res.status(403).json({message: "Amdin already exists"});
   }else{
    const newAdmin = new Admin({username,password});
    await newAdmin.save();
    const token = jwt.sign({username,password},SECRET,{expiresIn: "1h"});
    return res.status(200).json({message: "admin created successfully",token});
   }
});

router.post("/login",async (req, res) => {
    const parsedInput = adminTypes.safeParse(req.body);
    console.log(req.body);
    if(!parsedInput.success){
        return res.status(411).json({error: parsedInput.error});
    }
    const { username, password} = parsedInput.data;
    const admin = await Admin.findOne({username,password});
    if(admin){
        const token = jwt.sign({username,password},SECRET,{expiresIn: '1h'});
        return res.status(200).json({message: "Admin loggedin successfully",token});
    }else{
        return res.status(403).json({message: "Invalid username or password"});
    }   
});


router.post("/courses", authenticateJwt,async ( req, res) => {
    const parsedInput = courseTypes.safeParse(req.body);
    if(!parsedInput.success){
        return res.sendStatus(411).json({error: parsedInput.error});
    }
    const course = new Course(parsedInput.data);
    await course.save();
    res.status(200).json({message: 'Course created successfully',courseId: course._id});
});

router.put('/courses/:courseId', authenticateJwt, async( req, res) => {
    const parsedInput = courseTypes.safeParse(req.body);
    const {courseId} = req.params;
    if(!parsedInput.success){
        return res.sendStatus(411).json({error: parsedInput.error});
    }
    const course = await Course.findByIdAndUpdate(courseId, parsedInput.data, {new: true});
    if(course){
        res.status(200).json({message: "Course updated successfully"});
    }else{
        res.status(404).json({message: "Course not found"});
    }
});

router.get('/courses', authenticateJwt, async ( req, res) => {
    const courses = await Course.find({});
    res.status(200).json({courses});
});

router.get('/course/:courseId', authenticateJwt, async (req, res) => {
    console.log("hit");
    const {courseId} = req.params;
    const course = await Course.findById(courseId);
    res.json({course});
});
