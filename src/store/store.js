import {createStore, combineReducers} from "redux";

const store = {
  cocktailsData: {
    cocktails: [],
    cocktail: null
  },
  userData: {
    profile: null,
  },
};

function cocktailReducer(state = store.cocktailsData, action) {
  const newState = {...state};

  if (action.type === "ADD_COCKTAILS") {
    newState.cocktails = action.cocktails;

    return newState;
  }

  if (action.type === 'ADD_COCKTAIL') {
    newState.cocktail = action.cocktail;

    return newState;
  }

  return newState;
}

export default createStore(combineReducers({cocktailReducer}))