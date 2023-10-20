import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Certificate } from "../db/models/Certificate";

class certificateService {
  static async addCertificate({ user_id, name, issuingOrganization, getDate }) {
    // userId: user_id를 통해 찾은 user
    const userId = await User.findById({ user_id });

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

  static async getCertificates({ user_id }) {
    const findUser = await User.findById({ user_id });
    const certificates = await Certificate.findByUser(findUser);
    return certificates;
  }

  static async delCertificates({ _id }) {
    const certificates = await Certificate.delete({ _id });
    return certificates;
  }

  static async updateCertificates(id, newValue) {
    const certificates = await Certificate.update(id, newValue);
    return certificates;
  }
}

export { certificateService };
