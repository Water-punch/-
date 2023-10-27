import { EducationModel } from "../schemas/education";

class Education {
  // Create
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  // Read
  static async findByUserId({ userId }) {
    const education = await EducationModel.find({ userId }).sort({
      startDate: "asc",
    });
    return education;
  }

  //Delete
  static async delete({ _id }) {
    await EducationModel.deleteOne({ _id });
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

    const updatedEducation = await EducationModel.updateMany(
      filter,
      realToUpdate,
      option
    );
    return updatedEducation;
  }
}

export { Education };
