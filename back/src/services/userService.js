import { User } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { compare } from "bcrypt";
import hashPassword from "../utils/hash-password";
import comparePassword from "../utils/compare-password";

class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      const errorType = "ConflictError";
      return { errorType, errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await hashPassword(password, 10);

    const newUser = { name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null;

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      const errorType = "INVALID_USER_Error";
      return { errorType, errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await comparePassword(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      const errorType = "UnauthorizedError";
      return { errorType, errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const token = jwt.sign({ user_id: user._id }, secretKey);

    // 반환할 loginuser 객체
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      _id: user._id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async setUser({ _id }, { toUpdate }) {
    let user = await User.findById({ _id });

    // 정보를 수정하려는 유저의 id가 db에 없는 경우
    if (!user) {
      const errorMessage = "해당하는 유저가 없습니다. 다시 확인해 주세요.";
      const errorType = "INVALID_USER_Error";
      return { errorType, errorMessage };
    }

    if (toUpdate.password) {
      const hashedPassword = await bcrypt.hash(toUpdate.password, 10);
      await User.update({ _id }, { password: hashedPassword });
    }

    const updatedUser = await User.update({ _id }, { ...toUpdate });
    return updatedUser;
  }

  static async getUserInfoById({ _id }) {
    const user = await User.findById({ _id });
    if (!user) {
      const errorMessage = "해당하는 유저가 없습니다. 다시 확인해 주세요.";
      const errorType = "INVALID_USER_Error";
      return { errorType, errorMessage };
    }

    return user;
  }
}

export { userAuthService };
