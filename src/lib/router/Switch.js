import React from 'react';
import { useRouterContext } from './Router';

// 根据url对组件进行匹配
const Switch = props => {
  const { children } = props;
  const { location } = useRouterContext();
  const renderFunc = () => {
    let element,
      match = null;
    React.Children.forEach(children, child => {
      if (!match && React.isValidElement(child)) {
        element = child;
        const path = child.props.path || child.props.from;
        match = path === location.pathname;
      }
    });
    return match
      ? React.cloneElement(element, {
          location,
          computedMatch: match,
        })
      : null;
  };
  return renderFunc();
};

export default Switch;