import React from "react";
import axios from "axios";
import Header from "../Header/Header";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateOrderStyled from "../../style/CreateOrderStyled.style";

function CreateOrder(props) {
  const [data, setData] = React.useState({
    cocktails: [],
    commandData: {
      usernameOrder: '',
      cocktails: []
    },
  });

  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    getCocktails();
  }, []) //eslint-disable-line

  function changeInput(e, cocktail) {
    const newState = { ...data };

    if (e.target.getAttribute("data-name") === "usernameOrder") {
      newState.commandData.usernameOder = e.target.value;
    }

    if (cocktail) {
      newState.commandData.cocktails.push({
        cocktailName: cocktail.name,
        quantity: e.target.value
      })
    }

    setData(newState);
  }

  async function getCocktails() {
    const newState = { ...data };

    try {
      const { data } = await axios.get("http://localhost:3000/cocktails");
      newState.cocktails = data;

      props.dispatch({ type: "ADD_COCKTAILS", cocktails: newState.cocktails });

      setData(newState);
    } catch (error) {
      setData({
        error: true,
        errorMessage: error.message,
      });
    }
  }

  async function sendOrder() {
    try {
      await axios.post("http://localhost:3000/orders/", data.commandData);

      setRedirect(true);

      toast("Commande passée 🍹 !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast("Commande non passée 🍹", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  if (redirect) return <Navigate to="/cocktails"></Navigate>;


  return (
    <React.Fragment>
      <section>
        <Header></Header>
        <CreateOrderStyled>
          <div className="section__title">
            <h1>Passe ta commande chacal</h1>
          </div>
          <div className="section__username">
            <input type="text" placeholder="Pseudo" className=" mt-3 mb-5" data-name="usernameOrder" onChange={changeInput}></input>
          </div>
          <div className="section__table--cocktails">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nom du cocktail</th>
                  <th scope="col">Quantité</th>
                </tr>
              </thead>
              <tbody>
                  {data.cocktails.map((cocktail, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link to={`/cocktails/${cocktail._id}`}>
                            {cocktail.name}
                          </Link>
                        </td>
                        <td>
                          <input type="number" onBlur={(e) => changeInput(e, cocktail)}></input>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
          <div className="section__btn--command">
            <button onClick={sendOrder}>Commander</button>
          </div>
        </CreateOrderStyled>
      </section>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({ cocktail: state.cocktails });

export default connect(mapStateToProps, null)(CreateOrder);

// export default CreateOrder;
