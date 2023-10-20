import { Schema, model } from "mongoose";

const CertificateSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  issuingOrganization: {
    type: String,
    required: true,
  },
  getDate: {
    type: Date,
    required: true,
  },
});

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
