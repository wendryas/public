import app from "./app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  getRedirectResult,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";

interface EmailPasswordAuthParams {
  email: string;
  password: string;
}

export interface LoginParams extends EmailPasswordAuthParams {}
export interface RegisterParams extends EmailPasswordAuthParams {}

export const auth = getAuth(app);

export function login({ email, password }: LoginParams) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function getOAuthRedirect() {
  return getRedirectResult(auth);
}

export function register({ email, password }: RegisterParams) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function sendPasswordRecoveryEmail(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export function verifyPassworRecoveryCode(code: string) {
  return verifyPasswordResetCode(auth, code);
}

export function resetPassword(code: string, newPassword: string) {
  return confirmPasswordReset(auth, code, newPassword);
}

export async function changePassword(fields: any) {
  const user = auth.currentUser;
  if (user) {
    try {
      const credential = EmailAuthProvider.credential(
        user.email || '',
        fields.currPassword
      )
      await reauthenticateWithCredential(
          user,
          credential
      )
      await updatePassword(user, fields.newPassword);
    } catch (error) {
      console.log(error)
    }
  }
}
