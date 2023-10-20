import { Schema, model } from "mongoose";

const AwardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  getDate: {
    type: Date,
    required: true,
  },
  awardInfo: {
    type: String,
    required: false,
    default: "",
  },
});

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
