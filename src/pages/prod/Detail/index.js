import React, { useEffect } from 'react';
import fetch from 'isomorphic-fetch';

const Detail = () => {
  const fetchProd = () => {
    fetch(`/api/v1/topics`).then(res => {
      console.log('xxxxx', res);
    });
  };
  useEffect(() => {
    fetchProd();
  }, []);
  return <div>890</div>;
};

export default Detail;
