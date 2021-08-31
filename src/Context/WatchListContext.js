import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",") || ["bitcoin"]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const deleteCoin = (id) => {
    setWatchList(
      watchList.filter((element) => {
        return element !== id;
      })
    );
  };

  const addCoin = (id) => {
    if (watchList.indexOf(id) === -1) {
      setWatchList([...watchList, id]);
    }
  };

  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin, addCoin }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
