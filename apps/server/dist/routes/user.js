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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
exports.router = express_1.default.Router();
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.userTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        res.status(403).json({ message: "User already exists" });
    }
    else {
        const newUser = new db_1.User({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ username, password }, auth_1.SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "User created", token });
    }
}));
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.userTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ username, password }, auth_1.SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "User logged in", token });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
}));
exports.router.get("/courses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Course.find({});
    res.status(200).json({ courses });
}));
exports.router.post("/courses/:courseId", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("purchasing");
    const { courseId } = req.params;
    const course = yield db_1.Course.findById(courseId);
    if (course) {
        const parsedInput = types_1.userTypes.safeParse({
            username: req.headers["username"],
            password: req.headers["password"],
        });
        if (!parsedInput.success) {
            return res.status(411).json({ error: parsedInput.error });
        }
        const { username, password } = parsedInput.data;
        const user = yield db_1.User.findOne({ username, password });
        if (user) {
            yield user.populate("purchasedCourses");
            //   @ts-ignore
            user.purchasedCourses.push(course);
            yield user.save();
            res.status(200).json({ message: "Course purchsed successfully" });
        }
        else {
            res.status(403).json({ message: "User not found" });
        }
    }
    else {
        res.status(403).json({ message: "Course not found" });
    }
}));
exports.router.get("/purchasedCourses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.userTypes.safeParse({
        username: req.headers["username"],
        password: req.headers["password"],
    });
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const user = yield db_1.User.findOne({ username, password });
    if (user) {
        yield user.populate("purchasedCourses");
        res.status(200).json({ purchasedCourses: user.purchasedCourses || [] });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
}));
