import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Project } from "../db/index";

class projectService {
  static async addProject({ userId, title, content, startDate, endDate, editorStateSave, imgs }) {
    const newProject = {
      userId,
      title,
      content,
      startDate,
      endDate,
      editorStateSave,
      imgs,
    };
    const createdNewProject = await Project.create(newProject);
    createdNewProject.errorMessage = null;

    return createdNewProject;
  }

  static async getProjects(userId) {
    const projects = await Project.findByUserId({ userId });
    return projects;
  }

  static async getProjectDetail(_id) {
    const projectDetail = await Project.findByProjectId({ _id }); 
    return projectDetail;
  }

  static async getProjectContent(content) {
    const projectContent = await Project.findByContent({ content }); 
    return projectContent;
  }

  static async deleteProject({ _id }) {
    const result = await Project.delete({ _id });
    return result;
  }

  static async updateProject({ _id }, toUpdate) {
    const updatedProject = await Project.update({ _id }, toUpdate);
    return updatedProject;
  }
}

export { projectService };
