import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { XCircle } from 'react-feather';
import Button from '../Button/Button';

const StyledModalOverlay = styled.div`
  background-color: #3f3f3f;
  height: 100vh;
  left: 0px;
  opacity: .3;
  position: fixed;
  top: 0px;
  transition: all 0.3s ease-in;
  width: 100vw;
  z-index: 100;
`;

const StyledModalWrapper = styled.div`
  height: 100vh;
  left: 0px;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  position: fixed;
  top: 0px;
  width: 100vw;
  z-index: 110;
`;

const StyledModal = styled.div`
  background: ${({ theme }) => theme.backgroundColor.secondary};
  border-radius: 5px 0px 5px 5px;
  color: ${({ theme }) => theme.neutralColor.textPrimary};
  left: 50%;
  max-width: 80%;
  padding: 40px 30px;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 350px;
  z-index: 90;
`;

const StyledCloseButton = styled.div`
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.neutralColor.textPrimary};
  display: flex;
  height: 30px;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 10px;
  transition: all 0.2s ease-in;
  width: 30px;

  :hover{
    color: ${({ theme }) => theme.accentColor.primary};
  }
`;

const StyledTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: #fff;
`;

const StyledText = styled.h1`
  font-size: 20px;
  font-weight: 400;
  color: #fff;
`;

const ConfirmationModal = ({ clicked, show, title, text, onConfirm }) => show ? ReactDOM.createPortal(
  <>
    <StyledModalOverlay />
    <StyledModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
      <StyledModal>
        <StyledCloseButton onClick={clicked}>
          <XCircle />
        </StyledCloseButton>
        <StyledTitle>
          {title}
        </StyledTitle>
        <StyledText>
          {text}
        </StyledText>
        <Button clicked={clicked}>Anuluj</Button>
        <Button clicked={onConfirm}>Potwierdź</Button>
      </StyledModal>
    </StyledModalWrapper>
  </>, document.body
) : null;

ConfirmationModal.propTypes = {
  clicked: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

ConfirmationModal.defaultProps = {
  clicked: null
}

export default ConfirmationModal;
