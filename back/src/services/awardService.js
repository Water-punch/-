import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Award } from "../db/models/Award";

class awardService {
  static async addAward({ user_id, name, organization, getDate, awardInfo }) {
    // userId: user_id를 통해 찾은 user
    const userId = await User.findById({ user_id: user_id });

    const newAward = {
      userId,
      name,
      organization,
      getDate,
      awardInfo,
    };
    // db에 추가
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;

    return createdNewAward;
  }

  static async getAwards({ user_id }) {
    const findUser = await User.findById({ user_id });
    const awards = await Award.findByUser(findUser);
    return awards;
  }

  static async delAwards({ id }) {
    const awards = await Award.delete({ _id: id });
    return awards;
  }

  static async updateAwards(id, newValue) {
    const awards = await Award.update(id, newValue);
    return awards;
  }
}

export { awardService };
