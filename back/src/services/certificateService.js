import { Certificate } from "../db";

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
    const updatedCertificate = await Certificate.update(
      { _id },
      { ...toUpdate }
    );
    return updatedCertificate;
  }
}

export { certificateService };
