// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: 'app.shambala.life',
  projectId: 'shambala-8baba',
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: '78746468615',
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

export const initFirebase = () => {
  return app
}

export const FirebaseStorage = getStorage(app)
