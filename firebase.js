// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAM3RSeMzLa2n8EfgPyFWrO0swFv9_FZGc',
  authDomain: 'tinder-2-yt-df197.firebaseapp.com',
  projectId: 'tinder-2-yt-df197',
  storageBucket: 'tinder-2-yt-df197.appspot.com',
  messagingSenderId: '324085998144',
  appId: '1:324085998144:web:2aab5c4bf3e147a50ff5a5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export { auth, db }
