/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyD2vBrDqSZdSZzqrPmz_1uQ--w668VXZRs',
  authDomain: 'vinci-2d68f.firebaseapp.com',
  projectId: 'vinci-2d68f',
  storageBucket: 'vinci-2d68f.appspot.com',
  messagingSenderId: '871975787008',
  appId: '1:871975787008:web:314fe0aa3d6719056396e5',
  measurementId: 'G-TSZ775D94X',
}
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// messaging.onBackgroundMessage(function (payload) {
//   const promiseChain = clients
//     .matchAll({
//       type: 'window',
//       includeUncontrolled: true,
//     })
//     .then((windowClients) => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i]
//         windowClient.postMessage(payload)
//       }
//     })
//     .then(() => {
//       return registration.showNotification('my notification title')
//     })
//   return promiseChain
// })

self.addEventListener('notificationclick', function (event) {
  console.log('NOTIFICATION CLICKED')
  // do what you want
  // ...
})

console.log('sw registered')
