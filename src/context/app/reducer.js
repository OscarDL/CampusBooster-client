export const appReducer = (state, action) => {

  const newState = {};
  for (const key of Object.keys(action)) newState[key] = action[key];

  /*
    /!\ --- Do NOT store AppContext's state in localStorage
    like other states (large size + sensitive info) --- /!\
  */

  return {...state, ...newState};

};
