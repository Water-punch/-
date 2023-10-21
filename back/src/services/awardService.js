import { Award } from "../db";

class awardService {
  static async addAward({ userId, name, organization, getDate, awardInfo }) {
    const newAward = {
      userId,
      name,
      organization,
      getDate,
      awardInfo,
    };
    console.log("service >> ", newAward);

    // db에 추가
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;

    return createdNewAward;
  }

  static async getAwards({ userId }) {
    const awards = await Award.findByUserId({ userId });
    return awards;
  }

  static async delAwards({ _id }) {
    const awards = await Award.delete({ _id });
    return awards;
  }

  static async updateAwards({ _id }, { toUpdate }) {
    const awards = await Award.update({ _id }, { ...toUpdate });
    return awards;
  }
}

export { awardService };
