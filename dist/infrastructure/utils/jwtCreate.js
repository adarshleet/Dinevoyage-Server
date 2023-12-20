"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtCreate {
    createJwt(userId) {
        const jwtKey = process.env.JWT_KEY;
        if (jwtKey) {
            const token = jsonwebtoken_1.default.sign({ id: userId }, jwtKey);
            return token;
        }
        throw new Error("JWT_KEY is not defined");
    }
}
exports.default = JwtCreate;
