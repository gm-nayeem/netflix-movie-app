import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBizCcjHFdsQU8hmQf4soRvhezIy3i094Y",
  authDomain: "netflix-53e28.firebaseapp.com",
  projectId: "netflix-53e28",
  storageBucket: "netflix-53e28.appspot.com",
  messagingSenderId: "307198823975",
  appId: "1:307198823975:web:e3474da9d281faefc24802",
  measurementId: "G-9MSQD1H5VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;