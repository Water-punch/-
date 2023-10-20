import { User, Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class educationService {
  static async addEducation({
    user_id,
    educationlevel,
    school,
    major,
    startDate,
    endDate,
  }) {
    // user_id를 통해 찾은 user를 저장
    const userId = await User.findById({ user_id });

    const newEducation = {
      userId,
      educationlevel,
      school,
      major,
      startDate,
      endDate,
    };
    // db에 저장
    const createdNewEducation = await Education.create(newEducation);
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    return createdNewEducation;
  }

  static async getEducationInfo({ user_id }) {
    console.log("특정 유저의 특정 학력 항목 조회 서비스 실행");
    const findUser = await User.findById({ user_id });
    const education = await Education.findByUserId(findUser);
    return education;
  }

  static async getEducations() {
    const education = await Education.findAll();
    return education;
  }
  static async updateEducation(education_id, toUpdate) {
    let education;

    // 업데이트 대상에 최종학력(educationlevel) 있다면, 즉 educationlevel 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.educationlevel) {
      const fieldToUpdate = "educationlevel";
      const newValue = toUpdate.educationlevel;
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      education = await Education.update({
        education_id,
        fieldToUpdate,
        newValue,
      });
    }
    return education;
  }

  static async deleteEducation(education_id) {
    const education = await Education.delete(education_id);
    return education;
  }

  static async getUserInfo({ user_id }) {
    const education = await Education.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }
}

export { educationService };
