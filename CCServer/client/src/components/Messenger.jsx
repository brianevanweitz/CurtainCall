import React from 'react'
import backIcon from '../assets/backIcon.png'

const Messenger = (props) => {
  return (
    <div id="messenger-container">
      <button onClick={props.toggleMatches} className="matches-button"><img src={backIcon} /></button>
      <div className="messenger">
        <div className="message-window">
          {props.conversation && props.conversation.map(message => (
            message.user_id === props.currentUser.user_id ?
              <p className="message message-user">{message.content}</p> :
              <p className="message message-sender">{message.content}</p>
          ))}
        </div>
        <form className="form message-form" onSubmit={props.handleSubmit}>
          <input className="form-input message-input" name='content' type='text' value={props.messageForm.content} onChange={props.handleChange} />
          <button className="message-button">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Messenger;
