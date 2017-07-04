import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './profile-bar.css'

const propTypes = {
  picture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onOpenText: PropTypes.func.isRequired
}

class ProfileBar extends Component {
  render () {
    return (
      <div className={styles.root}>
        <Link to='/profile'>
          <figure>
            <img className={styles.avatar} src={this.props.picture} />
          </figure>
        </Link>
        <span className={styles.username}>Hola @{this.props.username}!</span>
        <button onClick={this.props.onOpenText} className={styles.button}>
          <span className='fa fa-lg fa-edit' /> Tweet!
        </button>
        <button onClick={this.props.onLogut} className={styles.button}>
          <span className='fa fa-sign-out' /> Salir
        </button>
      </div>
    )
  }
}

ProfileBar.propTypes = propTypes
export default ProfileBar