import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class certificateService {
  static async addCertificate({
    userId,
    name,
    issuingOrganization,
    certificatedDate,
  }) {
    const newCertificate = {
      userId,
      name,
      issuingOrganization,
      certificatedDate,
    };
    //db에 추가
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;
    return createdNewCertificate;
  }

  static async getCertificates({ userId }) {
    const certificates = await Certificate.findByUserId({ userId });
    return certificates;
  }

  static async deleteCertificate({ _id }) {
    const certificates = await Certificate.delete({ _id });
    return certificates;
  }

  static async updateCertificate({ _id }, { toUpdate }) {
    const certificates = await Certificate.update({ _id }, { ...toUpdate });
    return certificates;
  }
}

export { certificateService };
