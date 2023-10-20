import { EducationModel } from "../schemas/education";

class Education {
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId(userId) {
    console.log("userId", userId);
    const education = await EducationModel.find({ userId });
    return education;
  }

  static async findAll() {
    const education = await EducationModel.find({});
    return education;
  }

  static async update({ education_id, fieldToUpdate, newValue }) {
    const update = { [fieldToUpdate]: newValue };
    const filter = { _id: education_id };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  // delete
  static async delete({ education_id }) {
    const deletedEducation = await EducationModel.findOneAndDelete({
      _id: education_id,
    });
    return deletedEducation;
  }
}

export { Education };
