import { Router } from "express";
import is from "@sindresorhus/is";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import { is_request_body } from "../middlewares/is_request_body";
import { check_permission } from "../middlewares/check_permission";

const awardRouter = Router();

// post : 수상경력 추가
awardRouter.post(
  "/:userId/awards",
  login_required,
  is_request_body,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 수상경력 추가 실행");

      const { userId } = req.params;

      //DB에 데이터 추가
      const { name, organization, awardedDate, Info } = req.body;
      const newAward = await awardService.addAward({
        userId,
        name,
        organization,
        awardedDate,
        Info,
      });

      if (newAward.errorMessage) {
        throw new Error(newUser.errorMessage);
      }

      res.status(201).json(newAward);
    } catch (err) {
      next(err);
    }
  }
);

// get : 특정 유저의 수상경력 조회
awardRouter.get(
  "/:userId/awards",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 수상경력 조회 실행");
      const { userId } = req.params;
      const awards = await awardService.getAwards({ userId });
      res.status(201).json(awards);
    } catch (err) {
      next(err);
    }
  }
);

// delete : 특정 수상경력 삭제
awardRouter.delete(
  "/:userId/awards/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 수상경력 삭제 실행");
      const { id } = req.params;
      const awards = await awardService.deleteAward({
        _id: id,
      });
      res.status(201).json(awards);
    } catch (err) {
      next(err);
    }
  }
);

// post : 특정 수상경력 수정
awardRouter.post(
  "/:userId/awards/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 수상경력 수정 실행");
      const { id } = req.params;
      // newValue : 변경할 데이터
      const name = req.body.name ?? null;
      const organization = req.body.organization ?? null;
      const awardedDate = req.body.awardedDate ?? null;
      const Info = req.body.Info ?? "";

      const toUpdate = { name, organization, awardedDate, Info };

      const updatedAwards = await awardService.updateAward(
        { _id: id },
        { toUpdate }
      );

      if (updatedAwards.errorMessage) {
        throw new Error(updatedAwards.errorMessage);
      }
      // db에 updatedAwards를 추가
      res.status(201).json(updatedAwards);
    } catch (err) {
      next(err);
    }
  }
);

export { awardRouter };
