import css from 'styles.module.css'

function ImageGalleryItem( { id,webformatURL, onClick }){
  return(
<li key ={id} className={css.ImageGalleryItem} onClick={() => onClick({id})}>
  <img src={webformatURL} alt={webformatURL} className={css.ImageGalleryItemImage}  onClick={() => onClick({webformatURL})}/>
</li>
  )
}

export default ImageGalleryItem;