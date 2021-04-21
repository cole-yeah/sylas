import React, { useEffect, useState, createContext, useContext } from 'react';

const RouterContext = createContext(null);

const Router = ({ history, children, basename = '' }) => {
  const [location, setLocation] = useState(history.location);
  useEffect(() => {
    history.listen(curLocation => {
      setLocation(curLocation.location);
    });
  }, [history]);
  return (
    <RouterContext.Provider
      value={{
        history,
        location,
        basename,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouterContext = () => useContext(RouterContext);

export default Router;
