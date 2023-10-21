import { ProjectModel } from "../schemas/project";

class Project {
  // 생성
  static async create({ userId, title, content, startDate, endDate }) {
    const createdNewProject = await ProjectModel.create({
      userId,
      title,
      content,
      startDate,
      endDate,
    });
    return createdNewProject;
  }

  // 조회 (userId : objectId)
  static async findByUserId({ userId }) {
    const project = await ProjectModel.find({ userId });
    return project;
  }

  // 모두 조회
  static async findAll() {
    const projects = await ProjectModel.find({});
    return projects;
  }

  // 삭제
  static async delete({ _id }) {
    const result = await ProjectModel.deleteOne({ _id });
    return result;
  }

  // 수정
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false };

    // newValue 값이 null 인 필드 제거하기
    let realToUpdate = {};
    for (let u in toUpdate) {
      if (toUpdate[u]) {
        realToUpdate[u] = toUpdate[u];
      }
    }

    const updatedProject = await ProjectModel.updateMany(
      filter,
      realToUpdate,
      option
    );

    return updatedProject;
  }
}

export { Project };
