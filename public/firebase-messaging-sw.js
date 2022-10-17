/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js',
)
// importScripts('/nookies.min.js')

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

messaging.onBackgroundMessage(async (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  }

  if (payload.data.type && access_token) {
    const notification_id = payload.data.notification_id
    // const response = await fetch(
    //   `http://localhost:3000/users/notifications/${notification_id}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //   },
    // )

    //   console.log('notification response', response)
    //   const token = localStorage.getItem('vinci:token')
    self.registration.showNotification(notificationTitle, notificationOptions)
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log('NOTIFICATION CLICKED')
  // do what you want
  // ...
})

// self.addEventListener('message', (ev) => {
//   const data = ev.data

//   if (typeof data === 'string') {
//     console.log('token deleted')
//     return
//   }

//   access_token = data.access_token

//   // console.log('Service Worker received', data, clientId);
//   // if ('addPerson' in data) {
//   //   const msg = 'Thanks. Pretend I did something with the data.'
//   //   sendMessage(
//   //     {
//   //       code: 0,
//   //       message: msg,
//   //     },
//   //     clientId,
//   //   )
//   // }
//   // if ('otherAction' in data) {
//   //   const msg = 'Hola'
//   //   sendMessage({
//   //     code: 0,
//   //     message: msg,
//   //   })
//   // }
// })

// console.log('access_token')
// console.log('sw registered')
