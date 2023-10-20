import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Project } from "../db/index";

class projectService {
  static async addProject({ user_id, title, content, startDate, endDate, editorState }) {
    //userId : 오브젝트 아이디
    const userId = await User.findById({ user_id });
    const newProject = {
      userId,
      title,
      content,
      startDate,
      endDate,
      editorState
    };
    const createdNewProject = await Project.create(newProject);
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }

  static async getProjects(user_id) {
    const userId = await User.findById({ user_id });
    const projects = await Project.findByUserId({ userId });
    return projects;
  }

  static async deleteProject({ _id }) {
    const result = await Project.delete({ _id });
    return result;
  }

  static async updateProject(id, toUpdate) {
    let updatedProject;
    for (let v in toUpdate) {
      if (toUpdate[v]) {
        updatedProject = await Project.update({
          id,
          fieldToUpdate: v,
          newValue: toUpdate[v],
        });
      }
    }
    return updatedProject;
  }
}

export { projectService };
