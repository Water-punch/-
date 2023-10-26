import is from "@sindresorhus/is";
import { BadRequestError } from "../../libraries/custom-error";

function is_request_body(req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}

export { is_request_body };
