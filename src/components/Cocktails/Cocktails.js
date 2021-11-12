import React, { useState } from "react";
import axios from 'axios';

function Cocktails() {
  const [data, setData] = useState({
    cocktails: [],
    error: {},
    errorMessage: ""
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


  return (
    <React.Fragment>
    </React.Fragment>
  )
}

export default Cocktails;