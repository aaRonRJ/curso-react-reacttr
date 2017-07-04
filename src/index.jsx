import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

// Configuración de firebase
// INFO: la configuración de firebase, la ponemos antes de importar la 'App' cuando lo pasemos a producción.
firebase.initializeApp({
  apiKey: 'AIzaSyDpm--Jwb94qqZRwJtcosbOw8UZ17N1U9c',
  authDomain: 'curso-react-ba9ad.firebaseapp.com',
  databaseURL: 'https://curso-react-ba9ad.firebaseio.com',
  projectId: 'curso-react-ba9ad',
  storageBucket: 'curso-react-ba9ad.appspot.com',
  messagingSenderId: '602886871508'
})

import App from './components/App'

render(<App />, document.getElementById('root'))
