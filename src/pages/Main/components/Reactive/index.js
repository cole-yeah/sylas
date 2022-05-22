import React, { useEffect } from 'react';
const { reactive } = require('../../../../lib/macro/reactive.macro');

const Reactive = () => {
  useEffect(() => {
    reactive;
  }, []);
  return <div>reactive</div>;
};

export default Reactive;
