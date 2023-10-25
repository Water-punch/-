import { EducationModel } from "../schemas/education";

class Education {
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  // Read
  static async findByUserId({ userId }) {
    console.log("userId", userId);
    const education = await EducationModel.find({ userId }).sort({
      startDate: "asc",
    });
    return education;
  }

  //Delete
  static async delete({ _id }) {
    const result = await EducationModel.findOneAndDelete({ _id });
    console.log(result);
    return;
  }

  // Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false };

    let realToUpdate = {};
    for (let u in toUpdate) {
      if (toUpdate[u]) {
        realToUpdate[u] = toUpdate[u];
      }
    }

    const updatedEducation = await EducationModel.updateMany(
      filter,
      realToUpdate,
      option
    );
    return updatedEducation;
  }
}

export { Education };
