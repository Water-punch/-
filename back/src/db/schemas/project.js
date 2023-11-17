import { Schema } from "mongoose";
import mongoose from "mongoose";

const ProjectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  editorStateSave: {
    type: Array,
    required: true,
  },
  imgs: {
    type: Array,
    required: false,
  },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

export { ProjectModel };
