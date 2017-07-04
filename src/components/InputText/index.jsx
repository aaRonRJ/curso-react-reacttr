import React, {Component, PropTypes} from 'react'
import styles from './input-text.css'

const propTypes = {
  onSendText: PropTypes.func.isRequired,
  onCloseText: PropTypes.func.isRequired,
  usernameToReply: PropTypes.string.isRequired
}

class InputText extends Component {
  render () {
    return (
      <form className={styles.form} onSubmit={this.props.onSendText}>
        <textarea className={styles.text} name='text'>
          {(this.props.usernameToReply) ? `@${this.props.usernameToReply} ` : ''}
        </textarea>
        <div className={styles.buttons}>
          <button className={styles.close} onClick={this.props.onCloseText}>Cerrar</button>
          <button className={styles.send} type='submit'>Enviar</button>
        </div>
      </form>
    )
  }
}

InputText.propTypes = propTypes

export default InputText
