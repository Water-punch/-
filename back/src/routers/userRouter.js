import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { is_request_body } from "../middlewares/is_request_body";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../libraries/custom-error";

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post(
  "/user/register",
  is_request_body,
  async function (req, res, next) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new BadRequestError("필수적인 값이 입력되지 않았습니다");
      }
      // db에 데이터 추가
      const newUser = await userAuthService.addUser({
        name,
        email,
        password,
      });

      if (newUser.errorMessage) {
        if (newUser.errorType === "ConflictError") {
          throw new ConflictError(newUser.errorMessage);
        } else {
          throw new Error(newUser.errorMessage);
        }
      }

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

// 로그인
userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // db에서 데이터 조회
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      // 존재하지 않는 이메일
      if (user.errorType === "NotFoundError") {
        throw new NotFoundError(user.errorMessage);
      } else if (user.errorType === "UnauthorizedError") {
        // 비밀번호 불일치
        throw new UnauthorizedError(user.errorMessage);
      } else {
        throw new Error(user.errorMessage);
      }
    }

    res.setHeader(
      "Set-Cookie",
      `jwtToken=${user.token};max-age=3600;same-site=Lax;path=/;httpOnly;secure=false;`
    );
    res.status(200).send(user);
  } catch (error) {
    res.send(error);
  }
});

// 유저 본인의 정보 조회
userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id로 사용자 정보 조회
      const _id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfoById({
        _id,
      });

      if (currentUserInfo.errorMessage) {
        if (currentUserInfo.errorType === "NotFoundError") {
          throw new NotFoundError(currentUserInfo.errorMessage);
        } else {
          throw new Error(currentUserInfo.errorMessage);
        }
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// 유저 정보 수정
userAuthRouter.put(
  "/users/:_id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params._id;

      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;
      const imgUrl = req.body.imgUrl ?? null;
      const toUpdate = { name, email, password, description, imgUrl };

      const updatedUser = await userAuthService.setUser({ _id }, { toUpdate });

      if (updatedUser.errorMessage) {
        if (updatedUser.errorType === "NotFoundError") {
          throw new NotFoundError(updatedUser.errorMessage);
        } else {
          throw new Error(updatedUser.errorMessage);
        }
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

// id에 해당하는 유저의 페이지 조회
userAuthRouter.get(
  "/users/:_id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params._id;
      const currentUserInfo = await userAuthService.getUserInfoById({
        _id,
      });

      if (currentUserInfo.errorMessage) {
        if (currentUserInfo.errorType === "NotFoundError") {
          throw new NotFoundError(currentUserInfo.errorMessage);
        } else {
          throw new Error(currentUserInfo.errorMessage);
        }
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
