import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

// router import
import { projectRouter } from "./routers/projectRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { awardRouter } from "./routers/awardRouter";
import { imageRouter } from "./routers/imageRouter";

import cookieParser from "cookie-parser";
import path from "path";

const app = express();

// CORS 에러 방지
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

app.use(userAuthRouter);
app.use(imageRouter);
app.use(projectRouter);
app.use(certificateRouter);
app.use(educationRouter);
app.use(awardRouter);

app.use(errorMiddleware);

export { app };
