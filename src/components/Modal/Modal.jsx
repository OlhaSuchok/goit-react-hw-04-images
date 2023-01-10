import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalWrapper, Overlay } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeClick);
  }

  onEscapeClick = event => {
    if (event.code === 'Escape') {
      this.props.onOpenModal();
    }
  };

  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onOpenModal(event);
    }
  };

  render() {
    const { largeImage, tag } = this.props;
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalWrapper>
          <img src={largeImage} alt={tag} />
        </ModalWrapper>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
