// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  getMessaging,
  getToken,
  Messaging,
  onMessage,
} from 'firebase/messaging'

import { Analytics, getAnalytics } from 'firebase/analytics'
import { api } from './api'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app: FirebaseApp
let messaging: Messaging
let analytics: Analytics

export async function registerFCM() {
  console.log('Requesting permission...')
  const token = await Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        const messaging = getFirebaseMessaging()
        if (!messaging) return
        onMessage(messaging, (payload) => {
          console.log('Message received in primeiro plano ', payload)
        })
        return getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY,
        })
      }
    })
    .then((token) => {
      // Verify if token is valid
      if (!token) {
        return null
      }
      const last_fcm_token = localStorage.getItem('vinci:fcmToken')

      // If token is valid and different from the last one, save it
      if (token && last_fcm_token !== token) {
        localStorage.setItem('vinci:fcmToken', token)

        api.post('/users/tokens', { token })
      }

      return token
    })

  return token
}

// if (typeof window !== 'undefined') {
//     app = initializeApp(firebaseConfig)
// }

export function getFirebaseApp() {
  if (typeof window === 'undefined') {
    return null
  }

  app = initializeApp(firebaseConfig)
  return app
}

export function getFirebaseMessaging() {
  if (!app) {
    getFirebaseApp()
  }

  if (!app) {
    return null
  }
  messaging = getMessaging()
  return messaging
}

export function getFirebaseAnalytics() {
  if (!app) {
    getFirebaseApp()
  }

  if (!app) {
    return null
  }
  analytics = getAnalytics(app)
  return analytics
}

// getToken(messasing, {
//     vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_PUBLIC_KEY,
//   })
