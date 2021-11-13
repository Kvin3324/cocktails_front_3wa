import React, { useState } from "react";
import axios from 'axios';
import Card from "../Card/Card";
import Header from "../Header/Header";
import CocktailsStyled from "../../style/CocktailsStyled.style";
import Modal from "../Modal/Modal";

function Cocktails() {
  const [data, setData] = useState({
    cocktails: [],
    error: {},
    errorMessage: "",
    isLogout: false,
    modalLogout: {
      title: 'Déconnexion',
      content: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      btnCancel: 'Annuler',
      btnConfirm: 'Se déconnecter'
    }
  });

  React.useEffect(() => {
    getCocktails();
  }, [])

  async function getCocktails() {
    const newState = { ...data};

    try {
      const { data } = await axios.get('http://localhost:3000/cocktails');
      console.log(data);
      newState.cocktails = data;

      setData(newState);
    } catch (error) {
      setData({
        error: true,
        errorMessage: error.message
      });
    }
  }

  function goLogout() {
    const newState = { ...data};

    newState.isLogout = !newState.isLogout;
    return setData(newState);
  }

  return (
    <React.Fragment>
      <section>
        <Header logout={() => goLogout()}></Header>
        {data.isLogout &&
          <Modal
            modal={data.modalLogout}
            cancelAction={() => goLogout()}
          >
          </Modal>
        }

        <CocktailsStyled className='container-d-fluid col-12'>
          <div className="section__title">
            <h2>Carte des cocktails</h2>
            <button type="button" className="section__title--btn">Ajoute ton cocktail</button>
          </div>
          <div className="row">
            {
              data.cocktails.map((card, index) => {
                return <Card card={card} key={index}></Card>
              })
            }
          </div>
        </CocktailsStyled>
      </section>
    </React.Fragment>
  )
}

export default Cocktails;