import React, { Component, PropTypes } from 'react'

import uuid from 'uuid'
import firebase from 'firebase'

import MessageList from '../MessageList'
import InputText from '../InputText'
import ProfileBar from '../ProfileBar'

const propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

class Main extends Component {
  constructor (props) {
    super(props)

    /*
    El 'state' contiene una propiedad 'messages' que contendrá los mensajes que se van a ir añadiendo.
     */
    this.state = {
      user: Object.assign({}, this.props.user, {retweets: []}, {favourites: []}),
      usernameToReply: '',
      onOpenText: false,
      messages: []
    }

    /*
    Bindear las operaciones con el this.
     */
    this.handleSendText = this.handleSendText.bind(this)
    this.handleCloseText = this.handleCloseText.bind(this)
    this.handleOpenText = this.handleOpenText.bind(this)
    this.handleRetweet = this.handleRetweet.bind(this)
    this.handleFavourite = this.handleFavourite.bind(this)
    this.handleReplyTweet = this.handleReplyTweet.bind(this)
  }

  // Métodos de ciclo de vida.
  componentWillMount () {
    // Creamos una referencia a la base de datos de la aplicación en firebase.
    const messagesRef = firebase.database().ref().child('messages')

    // Tenemos un listener, que cuando se añade un mensaje a la bd, devuelve los mensajes y modificamos el estado
    // y ocultamos la pantalla de crear un tweet.
    messagesRef.on('child_added', snapshot => {
      this.setState({
        messages: this.state.messages.concat(snapshot.val()),
        onOpenText: false
      })
    })
  }

  handleOpenText (event) {
    event.preventDefault()
    this.setState(
      { onOpenText: true }
    )
  }

  handleSendText (event) {
    event.preventDefault()

    let newMessage = {
      id: uuid.v4(),
      picture: this.props.user.photoURL,
      username: this.props.user.email.split('@')[0],
      displayName: this.props.user.displayName,
      date: Date.now(),
      text: event.target.text.value,
      retweets: 0,
      favourites: 0
    }

    // Tomamos referencia a la bd.
    const messageRef = firebase.database().ref().child('messages')

    // Añadimos el nuevo mensaje a la bd de firebase.
    const messageID = messageRef.push()
    messageID.set(newMessage)

    // INFO: No hacemos 'setState' ya que tenemos el listener 'child_added' que es el que se encarga de detectar cuando se añade un nuevo elemento
    // y él actualiza el 'state'.
  }

  handleCloseText (event) {
    event.preventDefault()
    this.setState(
      {
        onOpenText: false
      }
    )
  }

  renderOpenText () {
    if (this.state.onOpenText) {
      return (
        <InputText
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
          usernameToReply={this.state.usernameToReply}
        />
      )
    }
  }

  handleRetweet (msgId) {
    let alreadyRetweeted = this.props.user.retweets.filter(rt => rt === msgId)

    if (alreadyRetweeted.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.retweets++
        }

        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.retweets.push(msgId)

      this.setState(
        {
          messages,
          user
        }
      )
    }
  }

  handleFavourite (msgId) {
    let alreadyFavourited = this.props.user.favourites.filter(fav => fav === msgId)

    if (alreadyFavourited.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.favourites++
        }

        return msg
      })

      let user = Object.assign({}, this.state.user)
      user.favourites.push(msgId)

      this.setState(
        {
          messages,
          user
        }
      )
    }
  }

  handleReplyTweet (msgId, msgUsername) {
    this.setState(
      {
        onOpenText: true,
        usernameToReply: msgUsername
      }
    )
  }

  render () {
    return (
      <div>
        <ProfileBar
          picture={this.props.user.photoURL}
          username={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText}
          onLogout={this.props.onLogout}
        />
        {this.renderOpenText()}
        <MessageList
          messages={this.state.messages}
          onRetweet={this.handleRetweet}
          onFavourite={this.handleFavourite}
          onReplyTweet={this.handleReplyTweet}
        />
      </div>
    )
  }
}

Main.propTypes = propTypes

export default Main
