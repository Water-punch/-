import { Router } from "express";
import { certificateService } from "../services/certificateService";
import is from "@sindresorhus/is";
import { login_required } from "../middlewares/login_required";

const certificateRouter = Router();

// post 요청 : 자격증 추가
certificateRouter.post(
  "/:userId/certificates",
  login_required,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 자격증 추가 실행");

      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const { userId } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("자격증 추가 권한이 없습니다");
      }

      // 추가할 데이터
      const name = req.body.name;
      const issuingOrganization = req.body.issuingOrganization;
      const getDate = req.body.getDate;

      // 데이터를 db에 추가
      const newCertificate = await certificateService.addCertificate({
        userId, //user의 오브젝트 아이디
        name,
        issuingOrganization,
        getDate,
      });

      if (newCertificate.errorMessage) {
        throw new Error(newUser.errorMessage);
      }

      res.status(201).json(newCertificate);
    } catch (err) {
      next(err);
    }
  }
);

// get 요청 : 특정 유저의 자격증 조회
// 받아온 userId가 어차피 user의 objectId니까 userId로 바로바로 넘김
certificateRouter.get(
  "/:userId/certificates",
  login_required,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 자격증 조회 실행");
      const { userId } = req.params;
      const certificates = await certificateService.getCertificates({
        userId,
      });
      res.status(201).json(certificates);
    } catch (err) {
      next(err);
    }
  }
);

// delete 요청: 특정 자격증 삭제
certificateRouter.delete(
  "/:userId/certificates/:id",
  login_required,
  async function (req, res, next) {
    try {
      console.log("특정 자격증 삭제 실행");
      const { userId, id } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("자격증 삭제 권한이 없습니다");
      }

      const certificates = await certificateService.delCertificates({
        _id: id,
      });
      res.status(201).json(certificates);
    } catch (err) {
      next(err);
    }
  }
);

// post 요청: 특정 자격증 수정
certificateRouter.post(
  "/:userId/certificates/:id",
  login_required,
  async function (req, res, next) {
    try {
      console.log("특정 유저의 자격증 수정 실행");

      // userId: 사용자 _id / id: 자격증 _id
      const { userId, id } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("자격증 수정 권한이 없습니다");
      }

      // newValue : 변경할 데이터
      const name = req.body.name;
      const issuingOrganization = req.body.issuingOrganization;
      const getDate = req.body.getDate;

      const newValue = { name, issuingOrganization, getDate };

      // 데이터를 db에 추가
      const updatedCertificates = await certificateService.updateCertificates({
        _id: id,
        newValue,
      });

      res.status(201).json(updatedCertificates);
    } catch (err) {
      next(err);
    }
  }
);

export { certificateRouter };
