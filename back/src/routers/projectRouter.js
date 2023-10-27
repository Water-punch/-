import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";
import { is_request_body } from "../middlewares/is_request_body";
import { check_permission } from "../middlewares/check_permission";

const projectRouter = Router();

// 프로젝트 추가
projectRouter.post(
  "/:userId/projects",
  login_required,
  is_request_body,
  check_permission,
  check_permission,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { title, content, startDate, endDate, editorStateSave, imgs } =
        req.body;

      // DB에 데이터 추가
      const newProject = await projectService.addProject({
        userId,
        title,
        content,
        startDate,
        endDate,
        editorStateSave,
        imgs,
      });

      if (newProject.errorMessage) {
        throw new Error(newProject.errorMessage);
      }

      res.status(201).json(newProject);
    } catch (err) {
      next(err);
    }
  }
);

// 특정 유저의 프로젝트 조회
projectRouter.get(
  "/:userId/projects",
  login_required,
  check_permission,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const projects = await projectService.getProjects({ userId });
      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
  }
);

// 페이지에 따른 프로젝트 조회
projectRouter.get("/projects/", login_required, async (req, res, next) => {
  try {
    // //페이지네이션
    const page = Number(req.query.page || 1); //현재 페이지 번호
    const perPage = Number(req.query.perPage || 5); //한 페이지 조회 항목 갯수
    const offset = (page - 1) * perPage; // 현재 페이지의 조회 시작 데이터
    const projects = await projectService.getProjectsPage({
      perPage,
      offset,
    });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

// 모든 프로젝트 조회
projectRouter.get("/projects", login_required, async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects({});
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

// 프로젝트 삭제
projectRouter.delete(
  "/:userId/projects/:id",
  login_required,
  check_permission,
  check_permission,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      await projectService.deleteProject({ _id: id });
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
);

// 프로젝트 수정
projectRouter.post(
  "/:userId/projects/:id",
  login_required,
  check_permission,
  check_permission,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const toUpdate = req.body;

      const updatedProject = await projectService.updateProject(
        { _id: id },
        { toUpdate }
      );

      if (updatedProject.errorMessage) {
        throw new Error(updatedProject.errorMessage);
      }

      res.status(200).json(updatedProject);
    } catch (err) {
      next(err);
    }
  }
);

export { projectRouter };
