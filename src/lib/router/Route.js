import React from 'react';

const Route = props => {
  const { component, children, computedMatch } = props;
  return (
    <>
      {computedMatch
        ? children
          ? typeof children === 'function'
            ? children(props)
            : children
          : React.createElement(component, props)
        : null}
    </>
  );
};

export default Route;
