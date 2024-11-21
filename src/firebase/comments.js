import { db } from './firebase'; 
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { auth } from './firebase'; // Import the auth to get the current user

// Add a comment with the email ID to Firestore
export const addComment = async (coinId, text) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  console.log('User details:', user); 
  const email = user.email ? user.email : "Anonymous";
  const commentRef = collection(db, 'comments');
  await addDoc(commentRef, {
    coinId,
    text,
    email, 
    timestamp: Timestamp.now()
  });
};

// Get comments from Firestore
export const getComments = async (coinId) => {
  const commentRef = collection(db, 'comments');
  const q = query(commentRef, where('coinId', '==', coinId));
  const querySnapshot = await getDocs(q);
  const comments = [];
  querySnapshot.forEach((doc) => {
    comments.push({ ...doc.data(), id: doc.id });
  });
  return comments.sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first
};

