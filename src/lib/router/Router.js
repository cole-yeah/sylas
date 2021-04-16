import React, { useEffect, useState } from 'react';

const Router = ({ history, children }) => {
  const [location, setLocation] = useState(history.location);
  useEffect(() => {
    history.listen(curLocation => {
      setLocation(curLocation);
    });
  }, [history]);
  return <div>{children}</div>;
};

export default Router;
