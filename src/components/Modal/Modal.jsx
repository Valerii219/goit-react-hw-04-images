import React, { useEffect } from 'react';
import css from 'styles.module.css';

const Modal = ({ modalImage, onCloseModal }) => {
  useEffect(() => {
    const keyDown = (e) => {
      if (e.key === "Escape") {
        onCloseModal();
      }
    };

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [onCloseModal]);

  const clickOnLargeIMG = (e) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={clickOnLargeIMG}>
      <div id={modalImage.id} className={css.Modal}>
        <img src={modalImage.largeImageURL} alt={modalImage.largeImageURL} />
      </div>
    </div>
  );
};

export default Modal;