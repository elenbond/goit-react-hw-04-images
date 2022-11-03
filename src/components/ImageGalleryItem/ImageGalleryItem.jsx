import PropTypes from 'prop-types';

const ImageGalleryItem = ({openModal, preview, url, alt}) => {
    return (
        <li className='gallery-item' onClick={() => { openModal({ url, alt }); }}>
            <img src={preview} alt={alt} />
        </li>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    openModal: PropTypes.func.isRequired,
    preview: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
}