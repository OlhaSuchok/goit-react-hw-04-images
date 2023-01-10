import { useEffect } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalWrapper, Overlay } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ largeImage, tag, onOpenModal }) {
  useEffect(() => {
    window.addEventListener('keydown', onEscapeClick);

    return () => {
      window.removeEventListener('keydown', onEscapeClick);
    };
  }, [onOpenModal]);

  const onEscapeClick = event => {
    if (event.code === 'Escape') {
      onOpenModal();
    }
  };

  const onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onOpenModal(event);
    }
  };

  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalWrapper>
        <img src={largeImage} alt={tag} />
      </ModalWrapper>
    </Overlay>,
    modalRoot
  );
}
