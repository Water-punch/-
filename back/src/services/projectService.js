import { Project } from "../db";

class projectService {
  static async addProject({
    userId,
    title,
    content,
    startDate,
    endDate,
    editorStateSave,
    imgs,
  }) {
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

  static async getProjects({ userId }) {
    const projects = await Project.findByUserId({ userId });
    return projects;
  }

  // static async getProjectsPage({ perPage, offset }) {
  //   const projects = await Project.findPage({ perPage, offset });
  //   return projects;
  // }

  static async getProjectsAll() {
    const projects = await Project.findAll();
    return projects;
  }

  static async deleteProject({ _id }) {
    const projects = await Project.delete({ _id });
    return projects;
  }

  static async updateProject({ _id }, { toUpdate }) {
    const updatedProject = await Project.update({ _id }, { ...toUpdate });
    return updatedProject;
  }
}

export { projectService };
