import React from 'react'

const MatchWindow = (props) => {
  return (
    <div className="modal-display">
      <p>You've found a match!</p>
      <button onClick={props.goToMatch}>Get contact info</button>
      <button onClick={props.returnToCards}>Return</button>
    </div>
  )
}

export default MatchWindow;
