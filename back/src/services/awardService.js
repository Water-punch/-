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
    const updatedAward = await Award.update({ _id }, { ...toUpdate });
    return updatedAward;
  }
}

export { awardService };
