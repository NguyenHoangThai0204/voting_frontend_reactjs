import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPdSpQOFDT33Wo_FMPspaZi8tKw7cmwDE",
  authDomain: "tm-voting-8714b.firebaseapp.com",
  projectId: "tm-voting-8714b",
  storageBucket: "tm-voting-8714b.firebasestorage.app",
  messagingSenderId: "322083170531",
  appId: "1:322083170531:web:42da9cf19849d6db04bdd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

