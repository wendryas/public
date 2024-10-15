import db from "src/firebase/firestore";
import {
  collection,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { User } from "src/types/user";

const collectionName = "frisa/users";

export function createUser(data: Omit<User, "id">) {
  return addDoc(collection(db, collectionName), data);
}

export async function getUserByEmail(email: string) {
  const q = query(collection(db, collectionName), where("email", "==", email));
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

export async function updateUser({ ...props }: User) {
  const docToUpdateRef = doc(db, `${collectionName}/${props.id}`)

  await updateDoc(docToUpdateRef, props);

  console.log("User updated successfully");

  return;
}
