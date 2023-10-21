import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

// 학력 항목 추가 기능
educationRouter.post(
  "/:userId/educations",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      console.log("학력 항목 추가");
      const { userId } = req.params;
      console.log("학력 항목 추가 222222222222222");
      const current_user_id = req.currentUserId;
      console.log("학력 항목 추가 333333333333333");
      if (userId !== current_user_id) {
        throw new Error("학력 추가 권한이 없습니다");
      }
      console.log("학력 항목 추가 44444444444444");
      // req (request) 에서 데이터 가져오기
      const educationLevel = req.body.educationLevel;
      console.log("educationLevel", educationLevel);
      const school = req.body.school;
      const major = req.body.major;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      console.log("school", school);
      // 위 데이터를 유저 db에 추가하기
      const newEducation = await educationService.addEducation({
        userId,
        educationLevel,
        school,
        major,
        startDate,
        endDate,
      });

      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }

      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  }
);

// delete 요청: 특정 수상경력 삭제
educationRouter.delete(
  "/:userId/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      const { userId, id } = req.params;
      //const education_id = id;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("학력 항목 삭제 권한이 없습니다.");
      }
      const deletedEducation = await educationService.deleteEducation({
        _id: id,
      });
      res.status(201).json(deletedEducation);
    } catch (err) {
      next(err);
    }
  }
);

// 코드 수정 및 테스트 작업중(학력 개별 항목 수정 기능)
educationRouter.post(
  "/:userId/educations/:id",
  login_required,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 특정 학력 항목 수정 실행");
      const { userId, id } = req.params;
      //const education_id = id;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("학력 항목 수정 권한이 없습니다.");
      }

      // req에서 변경할 데이터를 받아온다
      const educationLevel = req.body.educationLevel ?? null;
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;

      const toUpdate = { educationLevel, school, major, startDate, endDate };

      // 위 데이터를 이용하여 유저 db에서 유저 찾기
      const updatedEducation = await educationService.updateEducation(
        { _id: id },
        { toUpdate }
      );
      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }
      res.status(201).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.get(
  "/:userId/educations",
  login_required,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const educationInfo = await educationService.getEducationInfo({
        //user_id: userId,
        userId,
      });

      if (educationInfo.errorMessage) {
        throw new Error(educationInfo.errorMessage);
      }
      res.status(201).json(educationInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
