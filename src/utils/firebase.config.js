import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs, getDoc, doc, DocumentChange, onSnapshot, query, getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAZ65j9uU5w3Pqu7ZNz8DzbR_xUIR-wrkg",
  authDomain: "fir-auth-d6d78.firebaseapp.com",
  projectId: "fir-auth-d6d78",
  storageBucket: "fir-auth-d6d78.appspot.com",
  messagingSenderId: "625667824960",
  appId: "1:625667824960:web:a26e631abec2764618eea5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app)


const colRef = collection(db, 'notes')

// getDocs(colRef).then((snapshot) => {
//   const notes = []
//     snapshot.docs.forEach(doc => {
//       notes.push({
//         ...doc.data(),
//         id: doc.id
//     })
//     })
//     console.log(notes)
//   })

// onSnapshot(colRef, (snapshot) => {
//   const notes = []
//   snapshot.docs.forEach(doc => {
//     notes.push({
//       ...doc.data(),
//       id: doc.id,
//   });
//   });
//   console.log(notes)
// })




const docRef = doc(colRef, "zrUpkNmDFB0byxG62Q8R")
getDoc(docRef)
  .then((doc) => {
    console.log(doc.data(), doc.id)
  })
  .catch((err) => console.log(err))

addDoc(colRef, {
  title: "title",
  description: "Description Form vscode",
  user: {
    name: "hasan",
    id: 123456
  }
})