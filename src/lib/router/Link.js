import React from 'react';
import { useRouterContext } from './Router';

const LinkAnchor = ({ to, navigate, children }) => {
  const handleClick = e => {
    e.preventDefault();
    navigate();
  };
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

const Link = ({ to, children }) => {
  const { history } = useRouterContext();
  const navigate = () => {
    history.push(to);
  };
  return <LinkAnchor to={to} navigate={navigate} children={children} />;
};

export default Link;
