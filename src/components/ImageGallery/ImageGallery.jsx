import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ items, onClick }) => {
    return (
        <ul className={css.gallery}>
            {items.map((item) => {
                return (
                    <ImageGalleryItem
                        key={item.id}
                        webformatURL={item.webformatURL}
                        tags={item.tags}
                        largeImageURL={item.largeImageURL}
                        onClickItem={onClick}
                    />
                )
            })}
        </ul>
    );
};

export default ImageGallery;

ImageGallery.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func.isRequired,
}