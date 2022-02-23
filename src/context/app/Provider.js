import { createContext, useContext, useReducer } from 'react';


const appState = {
  user: null,
  settings: {
    lang: 'en'
  }
};

const AppContext = createContext();
export const AppProvider = ({ reducer, children }) => (
  <AppContext.Provider value={useReducer(reducer, appState)}>
    {children}
  </AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);
