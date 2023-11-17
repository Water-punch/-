import { Education } from "../db";

class educationService {
  static async addEducation({
    userId,
    educationLevel,
    school,
    major,
    startDate,
    endDate,
  }) {
    const newEducation = {
      userId,
      educationLevel,
      school,
      major,
      startDate,
      endDate,
    };
    const createdNewEducation = await Education.create(newEducation);
    createdNewEducation.errorMessage = null;
    return createdNewEducation;
  }

  static async getEducations({ userId }) {
    const education = await Education.findByUserId({ userId });
    return education;
  }

  static async deleteEducation({ _id }) {
    const education = await Education.delete({ _id });
    return education;
  }
  static async updateEducation({ _id }, { toUpdate }) {
    const updatedEducation = await Education.update({ _id }, { ...toUpdate });
    return updatedEducation;
  }
}

export { educationService };
