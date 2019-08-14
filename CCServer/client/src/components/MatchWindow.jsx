import React from 'react'

const MatchWindow = (props) => {
  return (
    <div>
      <p>You've found a match!</p>
      <button onClick={props.goToMatch}>Get contact info</button>
      <button onClick={props.returnToCards}>Return</button>
    </div>
  )
}

export default MatchWindow;
