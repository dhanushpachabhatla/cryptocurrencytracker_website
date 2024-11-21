import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Create user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created with email:', email); // Debug line
    return userCredential.user;
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('Google user email:', result.user.email); 
    return result.user; // This already contains email if available
};

export const doSignOut = () => {
    return auth.signOut();
};
