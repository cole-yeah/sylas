import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import './index.css';

const Wrapper = styled.div`
  margin: 10ph 0;
  padding: 4ph;
  border-radius: 4px;
  background: #fff;
  font-size: 20pw;
`;

const Reactive = () => {
  useEffect(() => {}, []);
  return (
    <Wrapper>
      <div className="test"> test plugin style </div>
      style components{' '}
    </Wrapper>
  );
};

export default Reactive;
