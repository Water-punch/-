import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }
  // Read
  static async findByUserId({ userId }) {
    const awrads = await AwardModel.find({ userId });
    return awrads;
  }
  // Delete
  static async delete({ _id }) {
    const awrads = await AwardModel.findOneAndDelete({ _id });
    return awrads;
  }
  // Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false }; // 수정 전의 값 반환

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
