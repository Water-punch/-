import { AwardModel } from "../schemas/award";

class Award {
  // Create
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }
  // Read
  static async findByUserId({ userId }) {
    const awrads = await AwardModel.find({ userId }).sort({
      awardedDate: "asc",
    });
    return awrads;
  }
  // Delete
  static async delete({ _id }) {
    await AwardModel.deleteOne({ _id });
    return;
  }
  // Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false };

    // 수정사항이 없는 필드 제외
    const realToUpdate = {};
    for (let u in toUpdate) {
      if (toUpdate[u]) {
        realToUpdate[u] = toUpdate[u];
      }
    }

    const updateAward = await AwardModel.updateMany(
      filter,
      realToUpdate,
      option
    );
    return updateAward;
  }
}

export { Award };
