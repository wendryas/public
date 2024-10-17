import { storage } from "src/firebase/storage"
import { ref, uploadBytes } from "firebase/storage";

export async function customUpload (options: any) {
    const { onSuccess, onError, file } = options;
    const fileRef = ref(storage, `frisa/users/${file.name}`);
    try {
      const image =  await uploadBytes(fileRef, file);
      onSuccess(null, image);
    } catch(e) {
      onError(e);
      console.log(e)
    }
  };