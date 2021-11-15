import React from "react";
import axios from "axios";
import Card from "../Card/Card";
import Header from "../Header/Header";
import CocktailsStyled from "../../style/CocktailsStyled.style";
import Modal from "../Modal/Modal";
import { Navigate, useParams } from "react-router-dom";
import ModalCocktail from "../Modal/ModalCocktail";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalEditCocktail from "../Modal/ModalEditCocktail";

function Cocktails(props) {
  const [data, setData] = React.useState({
    cocktails: [],
    error: {},
    errorMessage: "",
    isLogout: false,
    isModalAddCocktail: false,
    isModalEditCocktail: false,
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
      newState.cocktails = data;
      newState.isModalAddCocktail = false;

      props.dispatch({ type: "ADD_COCKTAILS", cocktails: newState.cocktails });

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

  async function editCard(e, cardId) {
    e.preventDefault();
    displayEditModalCocktail();

    try {
      const { data } = await axios.get(
        `http://localhost:3000/cocktails/${cardId}`
      );
      props.dispatch({ type: "ADD_COCKTAIL", cocktail: data });
    } catch (error) {
      console.log(error);
    }
  }

  function displayEditModalCocktail() {
    const newState = { ...data };

    newState.isModalEditCocktail = !newState.isModalEditCocktail;

    setData(newState);
  }

  async function deletedCard(e, cocktailId) {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:3000/cocktails/${cocktailId}`);

      getCocktails();

      toast("🍹 Cocktail supprimé!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
        {data.isModalEditCocktail && (
          <ModalEditCocktail
            cancelAction={() => displayEditModalCocktail()}
          ></ModalEditCocktail>
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
                    editCard={(e) => editCard(e, card._id)}
                  ></Card>
                );
              })}
          </div>
        </CocktailsStyled>
      </section>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({ cocktail: state.cocktails });

export default connect(mapStateToProps, null)(Cocktails);
