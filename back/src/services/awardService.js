import { Award } from "../db";

class awardService {
  static async addAward({ userId, name, organization, awardedDate, Info }) {
    const newAward = {
      userId,
      name,
      organization,
      awardedDate,
      Info,
    };

    // db에 추가
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;

    return createdNewAward;
  }

  static async getAwards({ userId }) {
    const awards = await Award.findByUserId({ userId });
    return awards;
  }

  static async deleteAward({ _id }) {
    const awards = await Award.delete({ _id });
    return awards;
  }

  static async updateAward({ _id }, { toUpdate }) {
    const awards = await Award.update({ _id }, { ...toUpdate });
    return awards;
  }
}

export { awardService };
