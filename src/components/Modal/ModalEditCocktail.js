import React from "react";
import ModalCocktailStyled from "../../style/ModalCocktailStyled.style";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function ModalEditCocktail(props) {
  const [dataToSend, setDataToSend] = React.useState({});
  const [data, setData] = React.useState({
    counter: 0,
    ingredientsArr: [],
    recipeStepsArr: []
  });

  async function editCocktail() {
    try {
      await axios.put(
        `http://localhost:3000/cocktails/${props.aboutCocktail._id}`,
        dataToSend
      );
    } catch (error) {
      console.log(error);
    }

    toast("🍹 Cocktail édité!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    props.cancelAction();
  }

  function changeInput(e) {
    const newState = { ...dataToSend };

    // if (e.target.getAttribute("data-name") === 'ingredients') {
    if (e.target.id === 'idIngredients') {
      // console.log('c ingredients');
      // console.log(newState[e.target.getAttribute("data-name", 'ingredients')]  );
      // console.log(newState['ingredients']);
      newState['ingredients'] = data.ingredientsArr;
    }

    newState[e.target.getAttribute("data-name")] = e.target.value;
    setDataToSend(newState);
  }

  function addInputIngredient() {
    const newState = { ...data };

    newState.counter += 1;
    setData(newState);
  }

  function addIngredient(e) {
    const newStateData = { ...data };

    newStateData.ingredientsArr.push(e.target.value);
    setData(newStateData);
  }

  function recipeSteps(e) {
    const newState = { ...data};

    const stepsRecipe = e.target.value.split(/[.,]+/);

    newState.recipeStepsArr = stepsRecipe;
    setData(newState)
  }

  return (
    <React.Fragment>
      <ModalCocktailStyled>
        {
          props.aboutCocktail && (
        <div id="myModal">
          <div className="modal-content">
            <div className="modal-content__title">
              <h2>Edite ton cocktail</h2>
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
              placeholder="Edite l'image (lien)"
              defaultValue={props.aboutCocktail.img}
              data-name='img'
              onChange={changeInput}
            />
            <input
              type="text"
              placeholder="Nom"
              data-name="name"
              onChange={changeInput}
              defaultValue={props.aboutCocktail.name}
              required
            ></input>
            <textarea placeholder="Description" defaultValue={props.aboutCocktail.description} data-name='description' onChange={changeInput} ></textarea>
            <div className="modal-content__ingredients">
              <h4>Ingrédients</h4>
              <ul className="pl-0">
                <button type="button" onClick={() => addInputIngredient()}>
                  Ajouter un ingrédient
                </button>
                {
                  props.aboutCocktail.ingredients.map((ingredient, index) => {
                    return (
                      <li key={index}>
                        <input
                          type="text"
                          onBlur={addIngredient}
                          data-name="ingredients"
                          onChange={changeInput}
                          defaultValue={ingredient}
                          required
                        ></input>
                      </li>
                    )
                  })
                }
                {Array.from(Array(data.counter)).map((ingredient, index) => {
                  return (
                    <li key={index}>
                      <input
                        id='idIngredients'
                        type="text"
                        onBlur={addIngredient}
                        data-name="ingredients"
                        onChange={changeInput}
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
                onBlur={recipeSteps}
                data-name="recipe"
                defaultValue={props.aboutCocktail.recipe}
                onChange={changeInput}
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
                onClick={editCocktail}
              >
                Editer
              </button>
            </div>
          </div>
        </div>
        )
      }
      </ModalCocktailStyled>
    </React.Fragment>
  );
}

const mapStateToProps = (store) => ({
  aboutCocktail: store.cocktailReducer.cocktail,
});

export default connect(mapStateToProps, null)(ModalEditCocktail);
// export default ModalEditCocktail;
