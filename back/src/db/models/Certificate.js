import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }
  // Read
  static async findByUser(userId) {
    const certificates = await CertificateModel.find({ userId });
    return certificates;
  }
  // Delete
  static async delete({ _id }) {
    const certificates = await CertificateModel.findOneAndDelete({ _id });
    return certificates;
  }

  // Update
  static async update(id, newValue) {
    const filter = { _id: id };
    const option = { returnOriginal: false };

    const updateData = {
      name: newValue.name,
      issuingOrganization: newValue.issuingOrganization,
      getDate: newValue.getDate,
    };
    const updateCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      updateData,
      option
    );
    return updateCertificate;
  }
}

export { Certificate };
