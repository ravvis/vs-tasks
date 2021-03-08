import { UsersCollection } from "../firebase";

const findUser = async ({
  githubId,
}) => {
  // return null;
  if (githubId) {
    let querySnapshot: any;
    try {
      querySnapshot = await UsersCollection.where("githubId", "==", githubId).get() 
    } catch (err) {
      return null;
    }
    if (!querySnapshot || !querySnapshot.docs || !querySnapshot.docs.length) {
      return null;
    }
    return querySnapshot.docs[0].data();
  }
  else {
    return null;
  }
}

const createUser = async ({ name, githubId }) => {
  let user = await UsersCollection.add({
    name: name,
    githubId: githubId,
  })
  return user;
}


export {
  findUser,
  createUser
}