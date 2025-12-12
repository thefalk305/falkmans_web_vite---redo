// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR1DWfsLhPI3lMrtRWi2YL-GnHG303NnE",
  authDomain: "falkmansweb.firebaseapp.com",
  projectId: "falkmansweb",
  storageBucket: "falkmansweb.appspot.com",
  messagingSenderId: "593867354054",
  appId: "1:593867354054:web:ec4be455d670437d480cc7",
  measurementId: "G-76Y1306ZK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;