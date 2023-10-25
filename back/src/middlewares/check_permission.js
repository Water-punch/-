function check_permission(req, res, next) {
  try {
    if (req.params.userId !== req.currentUserId) {
      throw new Error("프로젝트 추가 권한이 없습니다");
    }
    next();
  } catch (err) {
    next(err);
  }
}

export { check_permission };
