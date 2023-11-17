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
  awardedDate: {
    type: Date,
    required: true,
  },
  Info: {
    type: String,
    required: false,
    default: "",
  },
});

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
