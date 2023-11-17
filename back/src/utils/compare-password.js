import bcrypt from "bcrypt";

module.exports = async (password, correctPasswordHash) => {
  return await bcrypt.compare(password, correctPasswordHash);
};
