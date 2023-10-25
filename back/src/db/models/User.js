import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  //Read
  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }
  static async findById({ _id }) {
    const user = await UserModel.findOne({ _id });
    return user;
  }
  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  //Update
  static async update({ _id }, toUpdate) {
    const filter = { _id };
    const option = { returnOriginal: false };

    // toUpdate의 값이 null 인 필드 제거하기
    let realToUpdate = {};
    for (let u in toUpdate) {
      if (toUpdate[u]) {
        realToUpdate[u] = toUpdate[u];
      }
    }

    const updatedUser = await UserModel.updateMany(
      filter,
      realToUpdate,
      option
    );

    return updatedUser;
  }
}

export { User };
