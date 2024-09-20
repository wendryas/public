import db from "src/firebase/firestore";
import {
  collection as dbCol,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { User } from "src/types/user";

const collectionName = "users";
const collection = dbCol(db, collectionName);

export function createUser(data: Omit<User, "id">) {
  return addDoc(collection, data);
}

export async function getUserByEmail(email: string) {
  const q = query(dbCol(db, collectionName), where("email", "==", email));
  const snapshot = await getDocs(q);

  const [doc] = snapshot.docs;
  if (doc && doc.exists()) return doc.data() as User;

  return null;
}

export async function getUserById(id: string) {
  const ref = doc(db, collectionName, id);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) return snapshot.data() as User;

  return null;
}
