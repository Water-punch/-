import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  // Read
  static async findByUserId({ userId }) {
    const certificates = await CertificateModel.find({ userId });
    return certificates;
  }
  // Delete
  static async delete({ _id }) {
    const certificates = await CertificateModel.findOneAndDelete({ _id });
    return certificates;
  }
  // Update
  static async update({ _id, newValue }) {
    const filter = { _id };
    const update = {
      name: newValue.name,
      issuingOrganization: newValue.issuingOrganization,
      getDate: newValue.getDate,
    };
    const option = { returnOriginal: false };

    const updateCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateCertificate;
  }
}

export { Certificate };
