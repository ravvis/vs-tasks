import admin from "firebase-admin";
import serviceAccount from "../config/serviceAccountKey.json";

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

const db = admin.firestore();
const UsersCollection = db.collection("users");
const TasksCollection = db.collection("tasks");

export {
  db,
  UsersCollection,
  TasksCollection,
}