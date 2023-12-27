"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("../router/userRoute"));
const adminRoutes_1 = __importDefault(require("../router/adminRoutes"));
const vendorRoutes_1 = __importDefault(require("../router/vendorRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const http_1 = __importDefault(require("http"));
const socketRepository_1 = require("../utils/socketRepository");
//configuring express
// export const createServer = ()=>{
//     try {
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
exports.httpServer = httpServer;
const socket = new socketRepository_1.SocketRepository(httpServer);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Allow requests from 'http://localhost:3000'
app.use((0, cors_1.default)({
    // origin: process.env.CORS_URL,
    origin: 'https://dinvoyage-client.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // If you need to send cookies or authentication headers
}));
const sessionOptions = {
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000,
    },
};
app.use((0, express_session_1.default)(sessionOptions));
app.use(userRoute_1.default);
app.use(adminRoutes_1.default);
app.use(vendorRoutes_1.default);
//     } catch (error) {
//         console.log(error)
//     }
// }
