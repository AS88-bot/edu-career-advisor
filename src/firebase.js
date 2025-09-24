import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxl5BK1STsl_mNfW_XGD2bYdc9k1cYgUc",
  authDomain: "educareer-advisor.firebaseapp.com",
  projectId: "educareer-advisor",
  storageBucket: "educareer-advisor.appspot.com",
  messagingSenderId: "863857403756",
  appId: "1:863857403756:web:b9971fbe845aa21a963549"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
