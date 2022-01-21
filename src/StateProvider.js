import React, { useState, createContext } from "react";

export const StateContext = createContext(false);

export const StateProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("Huzaifa");
  return (
    <StateContext.Provider value={{ username, setUsername }}>
      {props.children}
    </StateContext.Provider>
  );
};
