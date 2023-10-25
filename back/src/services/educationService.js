import { User, Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    return createdNewEducation;
  }

  static async getEducations({ userId }) {
    console.log("특정 유저의 특정 학력 항목 조회 서비스 실행");
    const education = await Education.findByUserId({ userId });
    return education;
  }

  static async updateEducation({ _id }, { toUpdate }) {
    const education = await Education.update({ _id }, { ...toUpdate });
    return education;
  }

  static async deleteEducation({ _id }) {
    const education = await Education.delete({ _id });
    return education;
  }
}

export { educationService };
