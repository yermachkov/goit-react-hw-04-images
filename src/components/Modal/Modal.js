import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const handleEscClick = e => {
      if (e.code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleEscClick);

    return () => {
      window.removeEventListener('keydown', handleEscClick);
    };
  }, [closeModal]);

  const handleModalBackdropClick = e => {
    if (e.currentTarget === e.target) closeModal();
  };

  return createPortal(
    <div className="Overlay" onClick={handleModalBackdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

Modal.protoTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.any,
};
