import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";
import { is_request_body } from "../middlewares/is_request_body";
import { check_permission } from "../middlewares/check_permission";

const educationRouter = Router();

// 학력 항목 추가 기능
educationRouter.post(
  "/:userId/educations",
  login_required,
  is_request_body,
  check_permission,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const { educationLevel, school, major, startDate, endDate } = req.body;

      // DB에 데이터 추가
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

// 특정 유저의 학력 조회
educationRouter.get(
  "/:userId/educations",
  login_required,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const educations = await educationService.getEducations({
        userId,
      });
      res.status(200).json(educations);
    } catch (error) {
      next(error);
    }
  }
);

// 학력 삭제
educationRouter.delete(
  "/:userId/educations/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      await educationService.deleteEducation({
        _id: id,
      });
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
);

// 학력 수정
educationRouter.post(
  "/:userId/educations/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      const { id } = req.params;

      // 변경할 데이터
      const educationLevel = req.body.educationLevel ?? null;
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const startDate = req.body.startDate ?? null;
      const endDate = req.body.endDate ?? null;

      const toUpdate = { educationLevel, school, major, startDate, endDate };

      const updatedEducation = await educationService.updateEducation(
        { _id: id },
        { toUpdate }
      );

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);
export { educationRouter };
