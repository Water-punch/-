import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }
  // Read
  static async findByUser(userId) {
    const awrads = await AwardModel.find({ userId });
    return awrads;
  }
  // Delete
  static async delete({ _id }) {
    const awrads = await AwardModel.findOneAndDelete({ _id });
    return awrads;
  }
  // Update
  static async update(id, newValue) {
    const filter = { _id: id };
    const option = { returnOriginal: false }; // 수정 전의 값 반환

    const updateData = {
      name: newValue.name,
      organization: newValue.organization,
      getDate: newValue.getDate,
      awardInfo: newValue.awardInfo,
    };

    const updateAward = await AwardModel.findOneAndUpdate(
      filter,
      updateData,
      option
    );
    return updateAward;
  }
}

export { Award };
