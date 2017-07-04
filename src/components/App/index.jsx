import React, { Component } from 'react'

import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import { HashRouter, Route } from 'react-router-dom'
import Login from '../Login'
import firebase from 'firebase'

import 'normalize-css'
import styles from './app.css'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }

    this.handleOnAuth = this.handleOnAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  // Función que se ejecutará una vez el componente se haya renderizado.
  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
        console.log(user)
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleOnAuth () {
    const provider = new firebase.auth.GithubAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesión.`))
    .cath(error => console.log(`Error: ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
    .then(() => console.log('Te has desconectado correctamente.'))
    .catch(() => console.log('Un error ocurrió.'))
  }

  render () {
    return (
      <HashRouter>
        <div>
          <Header />

          <Route exact path='/' render={() => {
            if (this.state.user) {
              return (
                <Main
                  user={this.state.user}
                  onLogout={this.handleLogout}
                />
              )
            } else {
              return (
                <Login onAuth={this.handleOnAuth} />
              )
            }
          }}
          />

          <Route path='/profile' render={() => {
            return (
              <Profile
                picture={this.state.user.photoURL}
                displayName={this.state.user.displayName}
                username={this.state.user.email.split('@')[0]}
                emailAddress={this.state.user.email}
                location={this.props.user.location}
              />
            )
          }} />

          <Route path='/user/:username' render={({ params }) => {
            return (
              <Profile
                displayName={params.username}
                username={params.username}
              />
            )
          }} />
        </div>
      </HashRouter>
    )
  }
}

export default App
