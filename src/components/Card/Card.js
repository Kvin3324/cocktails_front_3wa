import React from 'react';
import CardStyled from '../../style/CardStyled.style';
import { Link } from "react-router-dom";


function Card(props) {
  return (
    <React.Fragment>
      <CardStyled as="div" className="mb-4 ml-2 col-4">
          <Link to={`/cocktails/${props.card._id}`}>
          <div className="card-product">
            <img src={props.card.img} alt="card--img"/>
            <div className="card-product-infos">
              <h2>{props.card.name}</h2>
              <h3>Description</h3>
              <p>{props.card.description}</p>
            </div>
          </div>
        </Link>
      </CardStyled>
    </React.Fragment>
  )
}

export default Card