"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = 'SEcr3t';
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
            console.log(user);
            if (err) {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            if (typeof user === "string") {
                return res.sendStatus(403);
            }
            req.headers['username'] = user.username;
            req.headers['password'] = user.password;
            next();
        });
    }
    else {
        return res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
