import React from "react";
import axios from "axios";
import Card from "../Card/Card";
import Header from "../Header/Header";
import CocktailsStyled from "../../style/CocktailsStyled.style";
import Modal from "../Modal/Modal";
import { Navigate } from "react-router-dom";
import ModalCocktail from "../Modal/ModalCocktail";
import {connect} from 'react-redux'

function Cocktails(props) {
  const [data, setData] = React.useState({
    cocktails: [],
    error: {},
    errorMessage: "",
    isLogout: false,
    isModalAddCocktail: false,
    modalLogout: {
      title: "Déconnexion",
      content: "Êtes-vous sûr de vouloir vous déconnecter ?",
      btnCancel: "Annuler",
      btnConfirm: "Se déconnecter",
    },
  });

  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    getCocktails();
  }, []);

  async function getCocktails() {
    const newState = { ...data };

    try {
      const { data } = await axios.get("http://localhost:3000/cocktails");
      console.log(data);
      newState.cocktails = data;

      props.dispatch({type: 'ADD_COCKTAILS', cocktails: newState.cocktails});

      setData(newState);
    } catch (error) {
      setData({
        error: true,
        errorMessage: error.message,
      });
    }
  }

  function goLogout() {
    const newState = { ...data };

    newState.isLogout = !newState.isLogout;
    return setData(newState);
  }

  async function confirmLogout() {
    try {
      await axios.get("http://localhost:3000/user/logout");

      setRedirect(true);
    } catch (error) {
      setData({
        error: true,
        errorMessage: error.message,
      });
    }
  }

  function displayModalAddCocktail() {
    const newState = { ...data };

    newState.isModalAddCocktail = !newState.isModalAddCocktail;
    setData(newState);
  }

  async function deletedCard(e, cocktailId) {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:3000/cocktails/${cocktailId}`);
      getCocktails();
    } catch (error) {
      setData({
        error: true,
        errorMessage: error.message,
      });
    }
  }


  if (redirect) return <Navigate to="/"></Navigate>;

  return (
    <React.Fragment>
      <section>
        <Header logout={() => goLogout()}></Header>
        {data.isLogout && (
          <Modal
            modal={data.modalLogout}
            cancelAction={() => goLogout()}
            confirmAction={() => confirmLogout()}
          ></Modal>
        )}
        {data.isModalAddCocktail && (
          <ModalCocktail
            cancelAction={() => displayModalAddCocktail()}
            fetchCocktails={() => getCocktails()}
          ></ModalCocktail>
        )}
        <CocktailsStyled className="container-d-fluid col-12">
          <div className="section__title">
            <h2>Carte des cocktails</h2>
            <button
              type="button"
              className="section__title--btn"
              onClick={() => displayModalAddCocktail()}
            >
              Ajoute ton cocktail
            </button>
          </div>
          <div className="row">
            {data.cocktails !== undefined &&
              data.cocktails.map((card, index) => {
                return (
                  <Card
                    card={card}
                    key={index}
                    deleteCard={(e) => deletedCard(e, card._id)}
                  ></Card>
                );
              })}
          </div>
        </CocktailsStyled>
      </section>
    </React.Fragment>
  );
}

const mapStateToProps=(state)=>({ cocktail: state.cocktails })

export default connect(mapStateToProps, null)(Cocktails);

// export default Cocktails;
