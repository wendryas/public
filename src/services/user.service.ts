import db from "../firebase/firestore";
import {
  collection as dbCol,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { IUser } from "../types/user";

const collectionName = "company/frisa/users";
const collection = dbCol(db, collectionName);

export function createUser(data: Omit<IUser, "id">) {
  return addDoc(collection, data);
}

export async function getUserByEmail(email: string) {
  const q = query(dbCol(db, collectionName), where("email", "==", email));
  const snapshot = await getDocs(q);

  const [doc] = snapshot.docs;
  if (doc && doc.exists()) return doc.data() as IUser;

  return null;
}

export async function getUserById(id: string) {
  const ref = doc(db, collectionName, id);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) return snapshot.data() as IUser;

  return null;
}
