// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getMessaging, getToken, Messaging } from 'firebase/messaging'
import { Analytics, getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// messaging.usePublicVapidKey(process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY)

export function requestPermission() {
  console.log('Requesting permission...')
  return Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        console.log('Permission granted')
        const messaging = getFirebaseMessaging()

        if (!messaging) {
          return
        }
        return getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_VAPID_KEY,
        })
      }
    })
    .then((token) => {
      console.log('Token: ', token)
      return token
    })
}

let app: FirebaseApp
let messaging: Messaging
let analytics: Analytics
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
  messaging = getMessaging(app)
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
