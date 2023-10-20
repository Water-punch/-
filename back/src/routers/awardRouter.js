import { Router } from "express";
import is from "@sindresorhus/is";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

// post : 수상경력 추가
awardRouter.post(
  "/:userId/awards",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      console.log("특정 유저의 수상경력 추가 실행");
      const { userId } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("수상경력 추가 권한이 없습니다");
      }
      // newAward : 추가할 데이터
      const name = req.body.name;
      const organization = req.body.organization;
      const getDate = req.body.getDate;
      const awardInfo = req.body.awardInfo ?? "";

      const newAward = await awardService.addAward({
        user_id: userId,
        name,
        organization,
        getDate,
        awardInfo,
      });

      // db에 newAward 추가
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
  async function (req, res, next) {
    try {
      console.log("특정 유저의 수상경력 조회 실행");
      const { userId } = req.params;
      const awards = await awardService.getAwards({ user_id: userId });
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
  async function (req, res, next) {
    try {
      console.log("특정 유저의 수상경력 삭제 실행");
      const { userId, id } = req.params;

      const current_user_id = req.currentUserId;
      if (userId !== current_user_id) {
        throw new Error("수상경력 삭제 권한이 없습니다.");
      }

      const awards = await awardService.delAwards({
        id,
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
  async function (req, res, next) {
    try {
      console.log("특정 유저의 수상경력 수정 실행");
      const { userId, id } = req.params;

      const current_user_id = req.currentUserId;
      if (userId !== current_user_id) {
        throw new Error("수상경력 수정 권한이 없습니다.");
      }

      // newValue : 변경할 데이터
      const name = req.body.name;
      const organization = req.body.organization;
      const getDate = req.body.getDate;
      const awardInfo = req.body.awardInfo ?? "";

      const newValue = { name, organization, getDate, awardInfo };

      const updatedAwards = await awardService.updateAwards(id, newValue);

      // db에 updatedAwards를 추가
      res.status(201).json(updatedAwards);
    } catch (err) {
      next(err);
    }
  }
);

export { awardRouter };
