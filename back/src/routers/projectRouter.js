import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";
import is from "@sindresorhus/is";

const projectRouter = Router();

// post 요청: 프로젝트 추가
projectRouter.post(
  "/:userId/projects",
  login_required,
  async (req, res, next) => {
    try {
      console.log("특정 유저의 프로젝트 추가 실행");
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }

      const { userId } = req.params;
      const current_user_id = req.currentUserId;

      if (userId !== current_user_id) {
        throw new Error("프로젝트 추가 권한이 없습니다");
      }

      // req (request) 에서 데이터 가져오기
      const title = req.body.title;
      const content = req.body.content;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      const editorState = req.body.editorState

      // 위 데이터를 db에 추가하기
      // user_id 는 uuid
      const newProject = await projectService.addProject({
        user_id: userId,
        title,
        content,
        startDate,
        endDate,
        editorState,
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
    const { userId } = req.params;
    const current_user_id = req.currentUserId;

    if (userId !== current_user_id) {
      throw new Error("프로젝트 추가 권한이 없습니다");
    }

    console.log("전체 프로젝트 조회 실행");
    const projects = await projectService.getProjects({});
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

      console.log("project router, update", id, toUpdate);
      const result = await projectService.updateProject(id, toUpdate);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export { projectRouter };
