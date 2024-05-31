"use strict";
// import express, { Application, NextFunction, Request, Response } from "express";
// import cors from "cors";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import router from "./app/routes";
// import globalErrorHandler from "./app/middlewares/globalErrorHandler";
// // import cookieParser from 'cookie-parser'
// // import globalErrorhandler from "./app/middlewares/globalErrorHandler";
// // import notFounRoute from "./app/middlewares/notFoundRoute";
// const app: Application = express();
// app.use(cors());
// // app.use(cookieParser())
// //parser
// app.use(express.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.get("/", (req: Request, res: Response) => {
//   res.send({
//     message: " Flat share server",
//   });
// });
// app.use("/api", router);
// app.use(globalErrorHandler)
// // app.use(notFounRoute)
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1', routes_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Oops! It looks like this page doesn't exist.",
        error: {
            path: req.originalUrl,
            error: `The requested URL was not found on this server.`,
            suggestion: 'Double-check the URL',
        },
    });
});
app.use(globalErrorHandler_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
