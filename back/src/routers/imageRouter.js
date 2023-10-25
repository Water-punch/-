import { Router } from "express";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
const imageRouter = Router();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  region: "ap-northeast-2",
});

// 테스트용 - 나중에 삭제
const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "portfolio-ebak",
    key: function (req, file, cb) {
      const extention = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(extention)) {
        return cb(new Error("이미지 파일이 아닙니다."));
      }
      // 파일 이름 지정
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  // 소유자는 FULL_CONTROL을 가집니다. AllUsers 그룹은 READ 액세스 권한을 가집니다.
  acl: "pulic-read",
});

const imageUpload_user = multer({
  storage: multerS3({
    s3: s3,
    bucket: "portfolio-ebak",
    key: function (req, file, cb) {
      const extention = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(extention)) {
        return cb(new Error("이미지 파일이 아닙니다."));
      }
      cb(null, `User-img/${Date.now()}_${file.originalname}`);
    },
  }),
  acl: "pulic-read",
});

const imageUpload_project = multer({
  storage: multerS3({
    s3: s3,
    bucket: "portfolio-ebak",
    key: function (req, file, cb) {
      const extention = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(extention)) {
        return cb(new Error("이미지 파일이 아닙니다."));
      }
      cb(null, `Project/${Date.now()}_${file.originalname}`);
    },
  }),
  acl: "pulic-read",
});

// test용 API - 나중에 삭제
imageRouter.post(
  "/uploads",
  imageUpload.single("image"),
  async (req, res, next) => {
    try {
      console.log("image post 실행");
      res.json({
        message: "이미지 저장 성공",
        imagePath: req.file.location,
      });
    } catch (err) {
      console.log("catch >> ", err);
      next(err);
    }
  }
);

imageRouter.post(
  "/projects/:id/uploads",
  imageUpload_project.single("image"),
  async (req, res, next) => {
    try {
      console.log("image post 실행");
      res.json({
        message: "이미지 저장 성공",
        imagePath: req.file.location,
      });
    } catch (err) {
      console.log("catch >> ", err);
      next(err);
    }
  }
);

imageRouter.post(
  "/users/:id/uploads",
  imageUpload_user.single("image"),
  async (req, res, next) => {
    try {
      console.log("image post 실행");
      res.json({
        message: "이미지 저장 성공",
        imagePath: req.file.location,
      });
    } catch (err) {
      console.log("catch >> ", err);
      next(err);
    }
  }
);
imageRouter.post("/");

export { imageRouter };
