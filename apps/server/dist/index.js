"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("./routes/admin");
const user_1 = require("./routes/user");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/admin", admin_1.router);
app.use("/user", user_1.router);
mongoose_1.default.connect("mongodb://localhost:27017", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    dbName: "Courses",
});
app.listen(3000, () => console.log("Sever is live at 3000"));
