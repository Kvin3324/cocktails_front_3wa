import React from 'react';
import './App.css';
import { createGlobalStyle } from "styled-components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SigninSpace from './components/SigninSpace';
import { ThemeProvider } from 'styled-components';
import variables  from './variables';
import SignUpSpace from './components/SignupSpace';
import Cocktails from './components/Cocktails/Cocktails';
import AboutCocktail from './components/Cocktails/AboutCocktail';

function App() {
  const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
  };
  `

  return (
    <React.Fragment>
      <BrowserRouter>
      <ThemeProvider theme={{ ...variables}}>
        <GlobalStyle></GlobalStyle>
          <>
          <Routes>
            <Route exact path='/' element={<SigninSpace />}></Route>
            <Route exact path='/inscription' element={<SignUpSpace />}></Route>
            <Route exact path='/cocktails' element={<Cocktails />}></Route>
            <Route exact path='/cocktails/:id' element={<AboutCocktail></AboutCocktail>}></Route>
          </Routes>
          </>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
