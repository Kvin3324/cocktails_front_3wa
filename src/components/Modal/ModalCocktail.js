import React from "react";
import axios from 'axios';
import ModalCocktailStyled from "../../style/ModalCocktailStyled.style";
import { toast } from "react-toastify";

function ModalCocktail(props) {
  const refInputImg = React.useRef(null);
  const refInputTitle = React.useRef(null);
  const refInputDesc = React.useRef(null);
  const refInputIngredients = React.useRef(null);
  const refInputRecipe = React.useRef(null);
  const [data, setData] = React.useState({
    counter: 0,
    ingredientsArr: [],
    recipeStepsArr: []
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

  function recipeSteps() {
    const newState = { ...data};

    const stepsRecipe = refInputRecipe.current.value.split(/[.,]+/);

    newState.recipeStepsArr = stepsRecipe;
    setData(newState)
  }

  async function createCocktail() {
    if (!refInputTitle.current.value) {
      toast.error('Veuillez ajouter un titre !', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }


    try {
      await axios.post("http://localhost:3000/cocktails", {
        name: refInputTitle.current.value,
        description: refInputDesc.current.value,
        img: refInputImg.current.value,
        ingredients: data.ingredientsArr,
        recipe: data.recipeStepsArr,
      });
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
            <input
              type="text"
              id="imgCocktail"
              name="cocktail-img"
              title=" "
              accept=".jpg, .jpeg, .png"
              ref={refInputImg}
              placeholder="Ajouter une image (lien)"
            />
            <input type="text" placeholder="Nom" ref={refInputTitle} required />
            <textarea placeholder="Description" ref={refInputDesc}></textarea>
            <div className="modal-content__ingredients">
              <h4>Ingrédients</h4>
              <ul className="pl-0">
                <button type="button" onClick={() => addInputIngredient()}>
                  Ajouter un ingrédient
                </button>
                {Array.from(Array(data.counter)).map((ingredient, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="text"
                        ref={refInputIngredients}
                        onBlur={() =>
                          addIngredient(refInputIngredients.current.value)
                        }
                        required
                      ></input>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="modal-content__recipe">
              <h4>Recette</h4>
              <textarea
                placeholder="Quelle est la recette ?"
                ref={refInputRecipe}
                onBlur={() => recipeSteps()}
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
