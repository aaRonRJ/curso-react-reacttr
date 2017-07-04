import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import styles from './message.css'

const propTypes = {
  onRetweet: PropTypes.func.isRequired,
  onFavourite: PropTypes.func.isRequired,
  onReplyTweet: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
  numRetweets: PropTypes.number.isRequired,
  numFavourites: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

class Message extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pressRetweet: false,
      pressFavourite: false
    }

    this.onPressRetweet = this.onPressRetweet.bind(this)
    this.onPressFavourite = this.onPressFavourite.bind(this)
  }

  onPressRetweet () {
    this.props.onRetweet()
    this.setState(
      {
        pressRetweet: true
      }
    )
  }

  onPressFavourite () {
    this.props.onFavourite()
    this.setState(
      {
        pressFavourite: true
      }
    )
  }

  render () {
    let dateFormat = moment(this.props.date).fromNow()
    let userLink = `/user/${this.props.username}`

    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <Link to={userLink}>
            <figure>
              <img className={styles.avatar} src={this.props.picture} />
            </figure>
          </Link>
          <span className={styles.displayName}>{this.props.displayName}</span>
          <span className={styles.username}>{this.props.username}</span>
          <span className={styles.date}>{dateFormat}</span>
        </div>
        <h3>{this.props.text}</h3>
        <div className={styles.buttons}>
          <div className={styles.icon} onClick={this.props.onReplyTweet}>
            <span className='fa fa-reply' />
          </div>
          <div className={(this.state.pressRetweet) ? styles.rtGreen : ''} onClick={this.onPressRetweet}>
            <span className='fa fa-retweet' />
            <span className={styles.num}>{this.props.numRetweets}</span>
          </div>
          <div className={(this.state.pressFavourite) ? styles.favYellow : ''} onClick={this.onPressFavourite}>
            <span className='fa fa-star' />
            <span className={styles.num}>{this.props.numFavourites}</span>
          </div>
        </div>
      </div>
    )
  }
}

Message.propTypes = propTypes

export default Message
