import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

//initialize admin SDK using serciceAcountKey
admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const UsersCollection = db.collection("users");
const TasksCollection = db.collection("tasks");

const findUser = async ({
  githubId,
  userId,
}) => {
  // return null;
  if (userId) {
    let user = await (await UsersCollection.doc(userId).get());
    return user.data();
  }
  else if (githubId) {
    let querySnapshot: any;
    try {
    querySnapshot = UsersCollection.where("githubId", "==", githubId).get() 
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

// (async () => {
//   let user = await createUser({
//     name: "d",
//     email: "d",
//     githubId: 3,
//     profilePicture: "Fsdf.com",
//   })
//   console.log({ user });
// })();

// const updateUser = (githubId, { name, email, githubId, profilePicture }) => {
//   let user = findUser({ githubId })
//   if (user) {
//     user.set({
//       name,
//       email,
//       githubId,
//       profilePicture
//     })
//   }
  
//   UsersCollection.doc().set({
//     name,
//     email,
//     githubId,
//     profilePicture
//   })
// }

const getAllTasks = async (userId: string) => {
  let tasks = await TasksCollection
    .where('user', '==', userId)
    .orderBy('createdAt', 'desc')
    .get()
  return tasks.docs.map((doc) => doc.data()) || [];
}

export {
  db,
  UsersCollection,
  findUser,
  createUser,
  getAllTasks,
  // updateUser,
}