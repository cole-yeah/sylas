import React from 'react';
import { useRouterContext } from './Router';

// 根据url对组件进行匹配
const Switch = props => {
  const { children } = props;
  const { location, basename } = useRouterContext();
  const renderFunc = () => {
    let element,
      match = null;
    React.Children.forEach(children, child => {
      if (!match && React.isValidElement(child)) {
        element = child;
        const { exact = false, path: basePath } = child.props;
        const path = `${basename}${basePath}`;
        match = exact
          ? location.pathname === path
          : location.pathname.includes(path);
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
