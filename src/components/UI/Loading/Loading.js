import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader } from 'react-feather';

const spinningAnimation = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`

const LoadingSpinner = styled.div`
  animation: ${spinningAnimation} 1s linear infinite;
`;

const LoadingContainer = styled.div`
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <LoadingContainer>
    <LoadingSpinner>
      <Loader />
    </LoadingSpinner>
  </LoadingContainer>
);

export default Loading;
