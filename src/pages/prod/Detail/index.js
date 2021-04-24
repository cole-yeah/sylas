import React, { useEffect } from 'react';
import fetch from 'isomorphic-fetch';

const Detail = () => {
  const fetchProd = () => {
    fetch(
      `/api/product-restructure/optionauthc/seller/getsellerbyid?sellerId=1664`,
    ).then(res => {
      console.log('xxxxx', res);
    });
  };
  useEffect(() => {
    fetchProd();
  }, []);
  return <div>890</div>;
};

export default Detail;
