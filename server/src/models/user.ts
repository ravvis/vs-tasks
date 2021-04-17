// import {UsersCollection} from "../firebase";
import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  githubId: {
    type: String,
  },
});

// Export Bio Model
const User = mongoose.model("user", userSchema);
exports.get = function (callback: any, limit: any) {
  User.find(callback).limit(limit);
};
export default User;
//
// const findUser = async ({
//   githubId,
// }: any) => {
//   // return null;
//   if (githubId) {
//     let querySnapshot: any;
//     try {
//       querySnapshot = await UsersCollection.where("githubId", "==", githubId).get()
//     } catch (err) {
//       return null;
//     }
//     if (!querySnapshot || !querySnapshot.docs || !querySnapshot.docs.length) {
//       return null;
//     }
//     return querySnapshot.docs[0].data();
//   }
//   else {
//     return null;
//   }
// }
//
// const createUser = async ({ name, githubId }: any) => {
//   return await UsersCollection.add({
//     name: name,
//     githubId: githubId,
//   });
// }
//
//
// export {
//   findUser,
//   createUser
// }
