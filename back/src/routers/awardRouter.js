import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import { is_request_body } from "../middlewares/is_request_body";
import { check_permission } from "../middlewares/check_permission";

const awardRouter = Router();

// 수상경력 추가
awardRouter.post(
  "/:userId/awards",
  login_required,
  is_request_body,
  check_permission,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const { name, organization, awardedDate, Info } = req.body;

      //DB에 데이터 추가
      const newAward = await awardService.addAward({
        userId,
        name,
        organization,
        awardedDate,
        Info,
      });

      if (newAward.errorMessage) {
        throw new Error(newAward.errorMessage);
      }

      res.status(201).json(newAward);
    } catch (err) {
      next(err);
    }
  }
);

// 특정 유저의 수상경력 조회
awardRouter.get(
  "/:userId/awards",
  login_required,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const awards = await awardService.getAwards({ userId });
      res.status(200).json(awards);
    } catch (err) {
      next(err);
    }
  }
);

// 수상경력 삭제
awardRouter.delete(
  "/:userId/awards/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      await awardService.deleteAward({
        _id: id,
      });
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
);

// 수상경력 수정
awardRouter.post(
  "/:userId/awards/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      const { id } = req.params;

      // 변경할 데이터
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
      res.status(200).json(updatedAwards);
    } catch (err) {
      next(err);
    }
  }
);

export { awardRouter };
