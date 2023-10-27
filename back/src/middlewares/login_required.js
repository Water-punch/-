import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../libraries/custom-error";

function login_required(req, res, next) {
  const userToken = req.cookies.jwtToken;

  if (userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
    throw new UnauthorizedError("로그인한 유저만 사용할 수 있는 서비스입니다.");
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.user_id;
    req.currentUserId = user_id;

    next();
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      next(err);
    } else {
      err.message = "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요. 0_o";
      next(err);
    }
  }
}

export { login_required };
