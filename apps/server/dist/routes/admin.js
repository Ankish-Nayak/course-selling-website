"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const types_1 = require("types");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
exports.router = express_1.default.Router();
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.adminTypes.safeParse(req.body);
    console.log(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const admin = yield db_1.Admin.findOne({ username, password });
    if (admin) {
        return res.status(403).json({ message: "Amdin already exists" });
    }
    else {
        const newAdmin = new db_1.Admin({ username, password });
        yield newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ username, password }, auth_1.SECRET, { expiresIn: "1h" });
        return res.status(200).json({ message: "admin created successfully", token });
    }
}));
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.adminTypes.safeParse(req.body);
    console.log(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const admin = yield db_1.Admin.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ username, password }, auth_1.SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Admin loggedin successfully", token });
    }
    else {
        return res.status(403).json({ message: "Invalid username or password" });
    }
}));
exports.router.post("/courses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.courseTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.sendStatus(411).json({ error: parsedInput.error });
    }
    const course = new db_1.Course(parsedInput.data);
    yield course.save();
    res.status(200).json({ message: 'Course created successfully', courseId: course._id });
}));
exports.router.put('/courses/:courseId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.courseTypes.safeParse(req.body);
    const { courseId } = req.params;
    if (!parsedInput.success) {
        return res.sendStatus(411).json({ error: parsedInput.error });
    }
    const course = yield db_1.Course.findByIdAndUpdate(courseId, parsedInput.data, { new: true });
    if (course) {
        res.status(200).json({ message: "Course updated successfully" });
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
}));
exports.router.get('/courses', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({});
    res.status(200).json({ courses });
}));
exports.router.get('/course/:courseId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hit");
    const { courseId } = req.params;
    const course = yield db_1.Course.findById(courseId);
    res.json({ course });
}));
