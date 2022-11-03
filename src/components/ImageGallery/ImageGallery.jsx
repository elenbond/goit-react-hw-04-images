import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, openModal }) => {
    return (
        <ul className="gallery">
            {items.map((item) => {
                return (
                    <ImageGalleryItem
                        key={item.id}
                        imageURL={item.webformatURL}
                        imageTitle={item.tags}
                        imageUrlLarge={item.largeImageURL}
                        onClick={openModal}
                    />
                )
            })}
        </ul>
    );
};

export default ImageGallery;

ImageGallery.propTypes = {
    openModal: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
}