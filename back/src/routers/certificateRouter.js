import { Router } from "express";
import { certificateService } from "../services/certificateService";
import { login_required } from "../middlewares/login_required";
import { is_request_body } from "../middlewares/is_request_body";
import { check_permission } from "../middlewares/check_permission";

const certificateRouter = Router();

// 자격증 추가
certificateRouter.post(
  "/:userId/certificates",
  login_required,
  is_request_body,
  check_permission,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const { name, issuingOrganization, certificatedDate } = req.body;

      //DB에 데이터 추가
      const newCertificate = await certificateService.addCertificate({
        userId,
        name,
        issuingOrganization,
        certificatedDate,
      });

      if (newCertificate.errorMessage) {
        throw new Error(newCertificate.errorMessage);
      }

      res.status(201).json(newCertificate);
    } catch (err) {
      next(err);
    }
  }
);

// 특정 유저의 자격증 조회
certificateRouter.get(
  "/:userId/certificates",
  login_required,
  async function (req, res, next) {
    try {
      const { userId } = req.params;
      const certificates = await certificateService.getCertificates({
        userId,
      });
      res.status(200).json(certificates);
    } catch (err) {
      next(err);
    }
  }
);

// 자격증 삭제
certificateRouter.delete(
  "/:userId/certificates/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      const { id } = req.params;
      await certificateService.deleteCertificate({
        _id: id,
      });
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
);

// 자격증 수정
certificateRouter.post(
  "/:userId/certificates/:id",
  login_required,
  check_permission,
  async function (req, res, next) {
    try {
      const { id } = req.params;

      // 변경할 데이터
      const name = req.body.name ?? null;
      const issuingOrganization = req.body.issuingOrganization ?? null;
      const certificatedDate = req.body.certificatedDate ?? null;

      const toUpdate = { name, issuingOrganization, certificatedDate };

      const updatedCertificate = await certificateService.updateCertificate(
        { _id: id },
        { toUpdate }
      );

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }

      res.status(200).json(updatedCertificate);
    } catch (err) {
      next(err);
    }
  }
);

export { certificateRouter };
