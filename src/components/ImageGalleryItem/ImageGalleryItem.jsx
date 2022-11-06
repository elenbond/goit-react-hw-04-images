import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({onClickItem, webformatURL, largeImageURL, tags}) => {
    return (
        <li className={css.gallery_item} onClick={() => {
            onClickItem({largeImageURL, tags});
        }}>
            <img src={webformatURL} alt={tags} className={css.gallery_image}/>
        </li>
    )
}
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    onClickItem: PropTypes.func.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
}