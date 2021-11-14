import React from "react";
import axios from 'axios';
import ModalCocktailStyled from "../../style/ModalCocktailStyled.style";

function ModalCocktail(props) {
  const refInputImg = React.useRef(null);
  const refInputTitle = React.useRef(null);
  const refInputDesc = React.useRef(null);
  const refInputIngredients = React.useRef(null);
  const refInputRecipe = React.useRef(null);
  const [data, setData] = React.useState({
    counter: 0,
    ingredientsArr: [],
    recipeStepsArr: ['cuir', 'boire', 'vomir']
  });

  function addInputIngredient() {
    const newState = { ...data };

    newState.counter += 1;
    setData(newState);
  }

  function addIngredient(ingredient) {
    const newState = { ...data };

    newState.ingredientsArr.push(ingredient);
    setData(newState);
  }

  // function recipeSteps() {
  //   const newState = { ...data};

  //   newState.recipeStepsArr.push()
  // }

  async function createCocktail() {
    try {
      await axios.post("http://localhost:3000/cocktails", {
        name: refInputTitle.current.value,
        description: refInputDesc.current.value,
        img: refInputImg.current.value,
        ingredients: data.ingredientsArr,
        recipe: data.recipeStepsArr,
      });

      props.cancelAction();
      props.fetchCocktails();
    } catch (error) {
      setData({
        error: true,
        errorMessage: error.message,
      });
    }
  }

  return (
    <React.Fragment>
      <ModalCocktailStyled>
        <div id="myModal">
          <div className="modal-content">
            <div className="modal-content__title">
              <h2>Créé ton cocktail</h2>
              <span className="close" onClick={() => props.cancelAction()}>
                &times;
              </span>
            </div>
            <label htmlFor="imgCocktail">Ajouter une image (lien):</label>
            <input
              type="text"
              id="imgCocktail"
              name="cocktail-img"
              title=" "
              accept=".jpg, .jpeg, .png"
              ref={refInputImg}
            />
            <input type="text" placeholder="Nom" ref={refInputTitle} />
            <textarea placeholder="Descriptionn" ref={refInputDesc}></textarea>
            <div className="modal-content__ingredients">
              <h4>Ingrédients</h4>
              <ul className="pl-0">
                <button type="button" onClick={() => addInputIngredient()}>
                  Ajouter un ingrédient
                </button>
                {Array.from(Array(data.counter)).map((ingredient, index) => {
                  return (
                    <li>
                      <input
                        key={index}
                        type="text"
                        ref={refInputIngredients}
                        onBlur={() =>
                          addIngredient(refInputIngredients.current.value)
                        }
                      ></input>
                      ;
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="modal-content__recipe">
              <textarea
                placeholder="Quelle est la recette ?"
                ref={refInputRecipe}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => props.cancelAction()}
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => createCocktail()}
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      </ModalCocktailStyled>
    </React.Fragment>
  );
}

export default ModalCocktail;
