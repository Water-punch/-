import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class certificateService {
  // 자격증 추가
  static async addCertificate({ userId, name, issuingOrganization, getDate }) {
    const newCertificate = {
      userId,
      name,
      issuingOrganization,
      getDate,
    };

    //db에 추가
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }

  // 자격증 조회
  static async getCertificates({ userId }) {
    const certificates = await Certificate.findByUserId({ userId });
    return certificates;
  }

  // 자격증 삭제
  static async delCertificates({ _id }) {
    const certificates = await Certificate.delete({ _id });
    return certificates;
  }

  // 자격증 수정
  static async updateCertificates({ _id, newValue }) {
    const certificates = await Certificate.update({ _id, newValue });
    return certificates;
  }
}

export { certificateService };
