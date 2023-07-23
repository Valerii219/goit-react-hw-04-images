import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from 'styles.module.css';

export function ImageGallery({propsImage, showModals }) {
  if (!propsImage) {
    return null;
  }
  return (
    <ul className={css.ImageGallery} >
      {propsImage.map((el) => (
        <ImageGalleryItem key={el.id} id={el.id} webformatURL={el.webformatURL}  largeImageURL={el.largeImageURL} onClick={showModals} />
      ))}
    </ul>
  );
}