import { CertificateModel } from "../schemas/certificate";

class Certificate {
  // Create
  static async create({ newCertificate }) {
    console.log("n ", newCertificate);
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  // Read
  static async findByUserId({ userId }) {
    const certificates = await CertificateModel.find({ userId }).sort({
      certificatedDate: "asc",
    });
    return certificates;
  }
  // Delete
  static async delete({ _id }) {
    await CertificateModel.deleteOne({ _id });
    return;
  }
  // Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false };

    // 수정사항이 없는 필드 제외
    let realToUpdate = {};
    for (let u in toUpdate) {
      if (toUpdate[u]) {
        realToUpdate[u] = toUpdate[u];
      }
    }

    const updateCertificate = await CertificateModel.updateMany(
      filter,
      realToUpdate,
      option
    );
    return updateCertificate;
  }
}

export { Certificate };
