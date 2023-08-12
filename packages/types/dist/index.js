"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseTypes = exports.userTypes = exports.adminTypes = void 0;
const zod_1 = __importDefault(require("zod"));
exports.adminTypes = zod_1.default.object({
    username: zod_1.default.string().min(1),
    password: zod_1.default.string().min(6)
});
exports.userTypes = zod_1.default.object({
    username: zod_1.default.string().min(1),
    password: zod_1.default.string().min(6),
});
exports.courseTypes = zod_1.default.object({
    title: zod_1.default.string().min(1),
    description: zod_1.default.string().min(1),
    price: zod_1.default.number().min(1),
    imageLink: zod_1.default.string().min(1),
    published: zod_1.default.boolean()
});
