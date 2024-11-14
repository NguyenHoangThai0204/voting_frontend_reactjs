// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, Auth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLXYNeeK0K-mKjwZa6MelAFQPCCjCGKzM",
  authDomain: "phonepollweb.firebaseapp.com",
  projectId: "phonepollweb",
  storageBucket: "phonepollweb.firebasestorage.app",
  messagingSenderId: "714332797208",
  appId: "1:714332797208:web:6903537c85ae7454adc66d",
  measurementId: "G-3YQ69W0S5X"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth: Auth = getAuth(app);

export { auth, RecaptchaVerifier };
