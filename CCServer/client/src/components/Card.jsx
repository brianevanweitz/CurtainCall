import React from 'react'
import YesIcon from '../assets/YesIcon.png';
import NoIcon from '../assets/NoIcon.png';

const Card = (props) => {
  return (
    <div>
      {props.currentCard ?
        <div className="card">
          <div className="card-image">
            <img src={props.currentCard.profile_pic} alt={props.currentCard.name} />
          </div>
          <div className="card-content">
            <h4>{props.currentCard.name}</h4>
            <p>{props.currentCard.fave_show_1}</p>
            <p>{props.currentCard.fave_show_2}</p>
            <p>{props.currentCard.fave_show_3}</p>
            <div className="budget">
              <p>{props.currentCard.budget}</p>
            </div>
          </div>
          <div className="card-buttons">
            <button className="no" onClick={props.swipeLeft}><img src={NoIcon} /></button>
            <button className="yes" onClick={props.swipeRight}><img src={YesIcon} /></button>
          </div>
        </div>
        :
        <div className="card-sorry">
          <h2>There are currently no more users available. Check back soon!</h2>
        </div>
      }
    </div>
  )
}

export default Card;
