import PropTypes from 'prop-types';
import React, { Component } from "react";
import { createPortal } from "react-dom";
import css from './Modal.module.css';

const modalRoot = document.getElementById('root');

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = (event) => {
    if (event.code === "Escape" || event.target === event.currentTarget) {
      this.props.onClose();
    }
  }

    render() {
      return createPortal(
        <div className={css.overlay} onClick={this.closeModal}>
          <div className={css.modal}>
            {this.props.children}
          </div>
        </div>,
        modalRoot
      );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};