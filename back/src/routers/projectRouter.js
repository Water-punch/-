import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";
import is from "@sindresorhus/is";
import { is_request_body } from "../middlewares/is_request_body";

const projectRouter = Router();

// post 요청: 프로젝트 추가
projectRouter.post(
  "/:userId/projects",
  login_required,
  is_request_body,
  async (req, res, next) => {
    try {
      console.log("특정 유저의 프로젝트 추가 실행");

      const { userId } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("프로젝트 추가 권한이 없습니다");
      }

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
projectRouter.get("/projects", login_required, async (req, res, next) => {
  try {
    console.log("전체 프로젝트 조회 실행");
    //페이지네이션
    console.log("페이지네이션 시작");
    const page = Number(req.query.page || 1); //현재 페이지 번호
    console.log("페이지네이션 시작 2222222222222222222");
    console.log("page", page);
    const perPage = Number(req.query.perPage || 5); //한 페이지 조회 항목 갯수
    //const limit = 5;
    //console.log("limit", limit);
    console.log("perPage(limit)", perPage);
    const offset = (page - 1) * perPage; // 현재 페이지의 조회 시작 데이터
    console.log("offset", offset);
    const projects = await projectService.getProjectsAll({
      perPage,
      offset,
    });
    res.status(201).json(projects);
  } catch (err) {
    next(err);
  }
});

// get 요청: 특정 유저의 자격증 조회
projectRouter.get(
  "/:userId/projects",
  login_required,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("프로젝트 추가 권한이 없습니다");
      }

      console.log("특정 유저의 프로젝트 조회 실행");
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
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("프로젝트 추가 권한이 없습니다");
      }

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
  async (req, res, next) => {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    try {
      const { userId } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("프로젝트 추가 권한이 없습니다");
      }

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
