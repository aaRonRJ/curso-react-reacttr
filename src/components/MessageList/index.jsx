import React, { Component, PropTypes } from 'react'
import Message from '../Message'
import styles from './message-list.css'

const propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRetweet: PropTypes.func.isRequired,
  onFavourite: PropTypes.func.isRequired,
  onReplyTweet: PropTypes.func.isRequired
}

class MessageList extends Component {
  /*
  En la iteración de los mensajes, queremos que se muestre de en orden inverso, es decir, los más actuales primero. Para este problema, utilizamos la función 'reverse'
  que lo que hace es invertir el orden del array, es decir, muestra de la última posición del array a la primera.
   */
  render () {
    return (
      <div className={styles.root}>
        {
          this.props.messages.map(msg => {
            return (
              <Message
                key={msg.id}
                text={msg.text}
                picture={msg.picture}
                displayName={msg.displayName}
                username={msg.username}
                date={msg.date}
                numRetweets={msg.retweets}
                numFavourites={msg.favourites}
                onRetweet={() => this.props.onRetweet(msg.id)}
                onFavourite={() => this.props.onFavourite(msg.id)}
                onReplyTweet={() => this.props.onReplyTweet(msg.id, msg.username)}
              />
            )
          }).reverse()
        }
      </div>
    )
  }
}

MessageList.propTypes = propTypes

export default MessageList
