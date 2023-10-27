// import crypto from "crypto";
import bcrypt from "bcrypt";

module.exports = async (password, correctPasswordHash) => {
  // const hash = crypto.createHash("sha1");
  // hash.update(password);
  // return hash.digest("hex");
  return await bcrypt.compare(password, correctPasswordHash);
};
