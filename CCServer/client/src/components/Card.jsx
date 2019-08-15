import React from 'react'

const Card = (props) => {
  return (
    <div>
      {props.currentCard ?
        <div className="card">
          <img src={props.currentCard.profile_pic} alt={props.currentCard.name} />
          <h4>{props.currentCard.name}</h4>
          <p>{props.currentCard.fave_show_1}</p>
          <p>{props.currentCard.fave_show_2}</p>
          <p>{props.currentCard.fave_show_3}</p>
          <p>{props.currentCard.budget}</p>
          <button onClick={props.swipeLeft}>No</button>
          <button onClick={props.swipeRight}>Yes</button>
        </div>
        :
        <div className="card">
          <h2>There are currently no more users available. Check back soon!</h2>
        </div>
      }
    </div>
  )
}

export default Card;
