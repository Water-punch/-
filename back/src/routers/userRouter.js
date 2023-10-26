import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { is_request_body } from "../middlewares/is_request_body";
import { is_logged_in } from "../middlewares/local_strategy/is_logged_in";
import passport from "passport";

const userAuthRouter = Router();

userAuthRouter.post(
  "/user/register",
  is_request_body,
  async function (req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const { name, email, password } = req.body;
      // 위 데이터를 유저 db에 추가하기
      const newUser = await userAuthService.addUser({
        name,
        email,
        password,
      });

      if (newUser.errorMessage) {
        throw new Error(newUser.errorMessage);
      }

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.post(
  "/user/login",
  passport.authenticate("local"),
  async function (req, res, next) {
    try {
      console.log("req.user", req.user);
      const email = req.body.email;
      const password = req.body.password;

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const user = await userAuthService.getUser({ email, password });

      if (user.errorMessage) {
        throw new Error(user.errorMessage);
      }
      res.status(200).send(user);
    } catch (error) {
      res.send(error);
    }
  }
);

userAuthRouter.get(
  "/userlist",
  is_logged_in,
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/current",
  is_logged_in,
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const _id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfoById({
        _id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:_id",
  is_logged_in,
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const _id = req.params._id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;
      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      await userAuthService.setUser({ _id }, { toUpdate });
      const updatedUser = await userAuthService.getUserInfoById({ _id });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

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
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { userAuthRouter };
