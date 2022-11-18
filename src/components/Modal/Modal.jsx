import PropTypes from 'prop-types';
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';

const modalRoot = document.getElementById('root');

const Modal = ({children, onClose}) => {
  useEffect(() => {
    const closeModal = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    }
  }, [onClose]);

  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  
  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        {children}
      </div>
    </div>,
    modalRoot
  )

}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};