import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";
import is from "@sindresorhus/is";
import { is_request_body } from "../middlewares/is_request_body";
import { check_permission } from "../middlewares/check_permission";
import { is_logged_in } from "../middlewares/local_strategy/is_logged_in";

const projectRouter = Router();

// post 요청: 프로젝트 추가
projectRouter.post(
  "/:userId/projects",
  is_logged_in,
  login_required,
  is_request_body,
  check_permission,
  async (req, res, next) => {
    try {
      console.log("특정 유저의 프로젝트 추가 실행");

      const userId = req.params.userId;
      // req (request) 에서 데이터 가져오기
      const { title, content, startDate, endDate, editorStateSave, imgs } =
        req.body;

      // 위 데이터를 db에 추가하기
      // user_id 는 uuid
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
        throw new Error(newUser.errorMessage);
      }

      res.status(201).json(newProject);
    } catch (err) {
      next(err);
    }
  }
);

// get 요청: 모든 프로젝트 조회
projectRouter.get(
  "/projects",
  is_logged_in,
  login_required,
  async (req, res, next) => {
    try {
      console.log("전체 프로젝트 조회 실행");
      const projects = await projectService.getProjects({});
      res.status(201).json(projects);
    } catch (err) {
      next(err);
    }
  }
);

// get 요청: 특정 유저의 자격증 조회
projectRouter.get(
  "/:userId/projects",
  login_required,
  check_permission,
  async (req, res, next) => {
    try {
      console.log("특정 유저의 프로젝트 조회 실행");
      const userId = req.params.userId;
      const projects = await projectService.getProjects(userId);
      res.status(201).json(projects);
    } catch (err) {
      next(err);
    }
  }
);

// get project by project id
projectRouter.get("/projects/:id", login_required, async (req, res, next) => {
  try {
    console.log("프로젝트 상세 페이지 조회");
    const id = req.params.id;

    const projectDetail = await projectService.getProjectDetail({ _id: id });
    res.status(201).json(projectDetail);
  } catch (err) {
    next(err);
  }
});

// get project by content
projectRouter.get(
  "/projects/:content",
  login_required,
  async (req, res, next) => {
    try {
      console.log("특정 기술스택을 사용한 프로젝트 조회");
      const content = req.params.content;

      const projectContent = await projectService.getProjectContent(content);
      res.status(201).json(projectContent);
    } catch (err) {
      next(err);
    }
  }
);

// delete project by id
projectRouter.delete(
  "/:userId/projects/:id",
  login_required,
  check_permission,
  async (req, res, next) => {
    try {
      console.log("특정 유저의 프로젝트 삭제 실행");
      const id = req.params.id;
      const result = await projectService.deleteProject({ _id: id });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

// update project by id(uuid)
projectRouter.put(
  "/:userId/projects/:id",
  login_required,
  check_permission,
  async (req, res, next) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    try {
      console.log("특정 유저의 프로젝트 수정 실행");
      const id = req.params.id;
      const toUpdate = req.body;

      const result = await projectService.updateProject({ _id: id }, toUpdate);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export { projectRouter };
