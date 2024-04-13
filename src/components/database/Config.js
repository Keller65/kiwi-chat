import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3PByybOhrFfQ5SvBPIDZyVGpnjwvHxV4",
  authDomain: "chat-realtime-2182b.firebaseapp.com",
  projectId: "chat-realtime-2182b",
  storageBucket: "chat-realtime-2182b.appspot.com",
  messagingSenderId: "1006218561298",
  appId: "1:1006218561298:web:5af8bb0620c765d01115cb",
  measurementId: "G-HSQXGL27W6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);
const database = getDatabase(app);
const storage = getStorage(app)

export { app, auth, analytics, database, storage }