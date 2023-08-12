import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{type: mongoose.Types.ObjectId, ref: 'Course'}]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    published: Boolean,
    price: Number
});

export const User = mongoose.model('User',userSchema);
export const Admin = mongoose.model('Admin',adminSchema);
export const Course = mongoose.model('Course',courseSchema);

