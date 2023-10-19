import { Schema } from "mongoose";
import mongoose from "mongoose";

const ProjectSchema = new Schema({
  id: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: false },
  url: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

export { ProjectModel };
