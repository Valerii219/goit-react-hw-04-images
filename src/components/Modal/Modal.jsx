import React, { Component } from 'react';
import css from 'styles.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.keyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDown);
  }

  keyDown = (e) => {
    if (e.key === "Escape") {
      this.props.onCloseModal();
    }
  };
  clickOnLargeIMG = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };
  render() {
    const {   modalImage} = this.props;

    return (
      <div className={css.Overlay} onClick={this.clickOnLargeIMG}>
        <div id={modalImage.id} className={css.Modal}>
          <img src={modalImage.largeImageURL} alt={modalImage.largeImageURL} />
        </div>
      </div>
    );
  }
}

export default Modal;