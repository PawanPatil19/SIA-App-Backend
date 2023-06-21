import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyAWvwYwVix3pgcjHnR0yK_ZKjoVKCKSsGU",
  authDomain: "sia-app-99c1c.firebaseapp.com",
  projectId: "sia-app-99c1c",
  storageBucket: "sia-app-99c1c.appspot.com",
  messagingSenderId: "706063281960",
  appId: "1:706063281960:web:d0c76f6c83e1eed45aea1d",
  measurementId: "G-YD4H3XHTSF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;