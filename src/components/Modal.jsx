import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => modalRoot.removeChild(el);
  }, [el, modalRoot]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal" onKeyDown={handleKeyDown} onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="w3-button w3-black close-button" onClick={onClose}>
          &times;
        </button>
        <br />
        {children}
      </div>
    </div>,
    el
  );
};

export default Modal;
