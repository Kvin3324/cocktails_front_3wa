import React from "react";
import CardStyled from "../../style/CardStyled.style";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <React.Fragment>
      <CardStyled as="div" className="mb-4 ml-2 col-4">
        <Link
          to={`/cocktails/${props.card._id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="card-product">
            <img
              src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
              className="card-product_edit-icon"
              alt="edit-icon"
              onClick={(e) => props.editCard(e)}
            />
            <span className="close" onClick={(e) => props.deleteCard(e)}>
              &times;
            </span>
            <img src={props.card.img} alt="card--img" />
            <div className="card-product-infos">
              <h2>{props.card.name}</h2>
              <h3>Description</h3>
              <p>{props.card.description}</p>
            </div>
          </div>
        </Link>
      </CardStyled>
    </React.Fragment>
  );
}

export default Card;
