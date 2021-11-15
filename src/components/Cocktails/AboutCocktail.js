import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import AboutCardStyled from "../../style/AboutCardStyled.style";

function AboutCocktail(props) {
  const params = useParams();

  React.useEffect(() => {
    (async function () {
      if (!props.cocktailsList.length) {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/cocktails/${params.id}`
          );
          props.dispatch({ type: "ADD_COCKTAIL", cocktail: data });
        } catch (error) {
          console.log(error);
        }
        return;
      }

      const aboutCocktail = props.cocktailsList.find(
        (el) => el._id === params.id
      );
      props.dispatch({ type: "ADD_COCKTAIL", cocktail: aboutCocktail });
    })();
  }, []); //eslint-disable-line

  return (
    <React.Fragment>
      {props.aboutCocktail && (
        <AboutCardStyled>
          <div className="card">
            <img
              src={props.aboutCocktail && props.aboutCocktail.img}
              className="card-img-top"
              alt="cocktail-img"
            />
            <div className="card-body">
              <h3 className="card-title mb-3">{props.aboutCocktail.name}</h3>
               <div
                className="card-body__ingredients"
              >
                <ul>
                {props.aboutCocktail.ingredients.map((ingredient, index) => {
                  return (
                      <li>
                        <strong className="" key={index}>
                          {ingredient}
                        </strong>
                      </li>
                  );
                })}
                </ul>
              </div>
              <div className="card-body__description mb-5 mt-5">
                <h5>Description</h5>
                <p className="card-text">{props.aboutCocktail.description}</p>
              </div>
              <div className="card-body__recipe">
                <h5>Etapes de la recette:</h5>
                <ol>
                  {props.aboutCocktail.recipe.map((step, index) => {
                    return (
                      <li key={index}>{step}</li>
                      );
                    })}
                </ol>
              </div>
            </div>
          </div>
        </AboutCardStyled>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (store) => ({
  cocktailsList: store.cocktailReducer.cocktails,
  aboutCocktail: store.cocktailReducer.cocktail,
});

export default connect(mapStateToProps, null)(AboutCocktail);
