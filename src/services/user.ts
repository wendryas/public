import db from "src/firebase/firestore";
import firestore from "src/firebase/firestore";
import {
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc
} from "firebase/firestore";
import { User } from "src/types/user";

const collectionName = "company/frisa/users";

export async function getUser(userId: string) {
  const docRef = doc(db, collectionName, userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return undefined;
  }
}

export async function createUser(user: User) {
  try {
    const docRef = doc(firestore, collectionName, user.id);
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: { 
        name: '',
        uid: '',
        thumbUrl: ''
      },
      createdAt: new Date(),
    };
    const result = await setDoc(docRef, data);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function checkUserExists(email: string) {
  const usersRef = collection(db, "company/frisa/users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  } else {
    return null;
  }
}

export async function updateUser({ ...props }: User) {
  const docToUpdateRef = doc(db, `${collectionName}/${props.id}`)

  await updateDoc(docToUpdateRef, props);

  console.log("User updated successfully");

  return;
}
