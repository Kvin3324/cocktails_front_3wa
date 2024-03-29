import React from "react";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import SigninSpaceStyled from "../style/SigninSpaceStyled.style";
import InputsForm from "../components/InputsForm/InputsForm";

function SigninSpace(props) {

  const inputMail = React.createRef(null);
  const inputPswd = React.createRef(null);
  const [data, setData] = React.useState({
    loader: false,
    btnDisabled: true,
    error: {}
  });
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const arrInputId = ["inputMail", "inputPswd"];
    const newState = { ...data };
    const obj = {
      error: false,
      message: "",
      accessToChange: false
    };

    arrInputId.forEach(element => (newState.error[element] = { ...obj }));

    return setData(newState);
  }, []); //eslint-disable-line

  function userAuth(e) {
    e.preventDefault();

    const newState = { ...data };
    const inputTargetId = e.target.id;

    if (e.type === "change") {
      if (!newState.error[inputTargetId].accessToChange) {
        return;
      }
    }

    if (e.target.value === "") {
      if (newState.error[inputTargetId].accessToChange) {
        return updateState(inputTargetId, "Field empty");
      }
      return;
    }

    if (inputTargetId === "inputMail") {
      if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          e.target.value
        ) === false
      )
        return updateState(inputTargetId, "Format mail incorrect");
    }

    if (inputTargetId === "inputPswd") {
      if (e.target.value.length < 6)
        return updateState(inputTargetId, "Le mot de passe doit faire 6 charactères");
    }

    if (!newState.error[inputTargetId].accessToChange) {
      newState.error[inputTargetId].accessToChange = true;
    }

    newState.error[inputTargetId].error = false;
    newState.error[inputTargetId].message = "";

    if (inputMail.current.value !== "" && inputPswd.current.value !== "") {
      const btnEnabled = Object.values(newState.error).every(el => !el.error);

      if (btnEnabled) {
        newState.btnDisabled = false;
      } else {
        newState.btnDisabled = true;
      }
    }

    return setData(newState);
  }

  function updateState(inputId, errorMessage) {
    const newState = { ...data };

    newState.error[inputId].error = true;
    newState.error[inputId].message = errorMessage;

    if (!newState.error[inputId].accessToChange) {
      newState.error[inputId].accessToChange = true;
    }

    if (!newState.btnDisabled) {
      newState.btnDisabled = true;
    }

    return setData(newState);
  }

  async function connectionCheck(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/connection", {
        email: inputMail.current.value,
        password: inputPswd.current.value
      })

      return setRedirect(true);
    } catch (error) {
      setData({
        error: true,
        errorMessage: error.message
      });
    }
  }

  if (redirect) return <Navigate to="/cocktails"></Navigate>;

  return (
    <React.Fragment>
      <main>
        <SigninSpaceStyled as="form" btnDisabled={data.btnDisabled}>
          <div className="form--connexion">
            <div className="form--connexion--title">
              <h2>Connexion</h2>
            </div>
            <div className="input--data--name">
              <InputsForm
                type="text"
                inputId="inputMail"
                inputRef={inputMail}
                inputPlaceholder="Mail"
                inputCheckError={userAuth}
                isError={data.error.inputMail ? data.error.inputMail : ""}
              ></InputsForm>
              <InputsForm
                type="password"
                inputId="inputPswd"
                inputRef={inputPswd}
                inputPlaceholder="Mot de passe"
                inputCheckError={userAuth}
                isError={data.error.inputPswd ? data.error.inputPswd : ""}
              ></InputsForm>
              <div className="form--connexion--btn">
                <input
                  type="submit"
                  disabled={data.btnDisabled}
                  onClick={connectionCheck}
                  value="Connexion"
                ></input>
              </div>
              <div className="form--connexion--link">
                <p>Je n'ai pas de compte</p>
                <p>
                  <Link to={"/inscription"}>S'inscrire</Link>
                </p>
              </div>
            </div>
          </div>
        </SigninSpaceStyled>
      </main>
    </React.Fragment>
  );
}

export default SigninSpace;
