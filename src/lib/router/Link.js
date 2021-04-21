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
  const { history, basename } = useRouterContext();
  const curLink = `${basename}${to}`;
  const navigate = () => {
    history.push(curLink);
  };
  return <LinkAnchor to={curLink} navigate={navigate} children={children} />;
};

export default Link;
