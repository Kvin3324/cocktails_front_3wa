import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import axios from 'axios';
import LoaderSvg from "../img/loader.svg";
import SignUpSpaceStyled from "../style/SignupSpaceStyled.style";
import InputsForm from "../components/InputsForm/InputsForm";

function SignUpSpace() {
  const refInputPseudo = React.useRef(null);
  const refInputMail = React.useRef(null);
  const refInputPswd = React.useRef(null);
  const refInputCheckPswd = React.useRef(null);
  const [data, setData] = useState({
    loader: false,
    btnDisabled: true,
    error: {},
    errorApi: false,
    errorMessage: ""
  });
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    const arrInputId = [
      "inputPseudo",
      "inputMail",
      "inputPswd",
      "inputCheckPswd"
    ];
    const newState = { ...data };
    const obj = {
      error: false,
      message: "",
      accessToChange: false
    };

    arrInputId.forEach(element => (newState.error[element] = { ...obj }));

    return setData(newState);
  }, []); //eslint-disable-line

  function checkUserSub(e) {
    e.preventDefault();

    const newState = { ...data };
    const inputIdTarget = e.target.id;

    if (e.target.value === "") {
      if (newState.error[inputIdTarget].accessToChange) {
        return updateState(inputIdTarget, "Field empty");
      }
      return;
    }

    if (inputIdTarget === "inputMail") {
      if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          e.target.value
        ) === false
      )
        return updateState(inputIdTarget, "Format mail incorrect");
    }

    if (inputIdTarget === "inputPswd") {
      if (e.target.value.length <= 5)
        return updateState(inputIdTarget, "Le mot de passe doit faire 6 charactères");

      if (refInputCheckPswd.current.value !== "") {
        if (refInputPswd.current.value !== refInputCheckPswd.current.value) {
          return updateState(
            refInputCheckPswd.current.id,
            "La confirmation est incorrecte"
          );
        }
      }
    }

    if (inputIdTarget === "inputCheckPswd") {
      if (e.target.value !== refInputPswd.current.value)
        return updateState(inputIdTarget, "La confirmation est incorrecte");
    }

    if (
      refInputPseudo.current.value !== "" &&
      refInputMail.current.value !== "" &&
      refInputPswd.current.value !== "" &&
      refInputCheckPswd.current.value !== ""
    ) {
      const btnEnabled = Object.values(newState.error).every(el => !el.error);

      if (btnEnabled) {
        newState.btnDisabled = false;
      } else {
        newState.btnDisabled = true;
      }
    }

    newState.error[inputIdTarget].error = false;
    newState.error[inputIdTarget].message = '';
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

  async function fetchUserData(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/subscription", {
        username: refInputPseudo.current.value,
        email: refInputMail.current.value,
        password: refInputPswd.current.value,
        confirm_password: refInputCheckPswd.current.value
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
      {data.loader && (
        <ReactSVG
          src={LoaderSvg}
          style={{ backgroundColor: `${props => props.theme.backgroundColor}` }}
        />
      )}
      <SignUpSpaceStyled
        as="form"
        btnDisabled={data.btnDisabled}
      >
        <div className="form--inscription">
          <div className="form--inscription--title">
            <h2>Inscription</h2>
          </div>
          <div className="input--data--name">
            <InputsForm
              type="text"
              inputId="inputPseudo"
              inputRef={refInputPseudo}
              inputPlaceholder="Pseudo"
              inputCheckError={checkUserSub}
              isError={data.error.inputPseudo ? data.error.inputPseudo : ""}
            ></InputsForm>
          </div>
          <InputsForm
            type="text"
            inputId="inputMail"
            inputRef={refInputMail}
            inputPlaceholder="Mail"
            inputCheckError={checkUserSub}
            isError={data.error.inputMail ? data.error.inputMail : ""}
          ></InputsForm>
          <InputsForm
            type="password"
            inputId="inputPswd"
            inputRef={refInputPswd}
            inputPlaceholder="Mot de passe"
            inputCheckError={checkUserSub}
            isError={data.error.inputPswd ? data.error.inputPswd : ""}
          ></InputsForm>
          <InputsForm
            type="password"
            inputId="inputCheckPswd"
            inputRef={refInputCheckPswd}
            inputPlaceholder="Confirmer mot de passe"
            inputCheckError={checkUserSub}
            isError={data.error.inputCheckPswd ? data.error.inputCheckPswd : ""}
          ></InputsForm>
          <div className="form--inscription--btn">
            <input type="submit" disabled={data.btnDisabled} value="Inscription" onClick={fetchUserData}></input>
          </div>
          <div className="form--inscription--link">
            <p>J'ai déjà un compte</p>
            <p>
              <a href="/">Connexion</a>
            </p>
          </div>
        </div>
      </SignUpSpaceStyled>
    </React.Fragment>
  );
}

export default SignUpSpace;