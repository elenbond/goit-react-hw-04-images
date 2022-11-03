// import PropTypes from 'prop-types';
import { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

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
      const { imageUrlLarge, imageTitle } = this.props.content;
      return createPortal(
        <div className="overlay" onClick={this.closeModal}>
            <div className="modal">
                <img className="modalImg" src={imageUrlLarge} alt={imageTitle} />
            </div>
        </div>,
      modalRoot
    )
  }
}

