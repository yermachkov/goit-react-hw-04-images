import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  if (images.length > 0) {
    return (
      <ul className="ImageGallery">
        {images.map(image => (
          <li key={image.id} className="ImageGalleryItem">
            <ImageGalleryItem item={image} />
          </li>
        ))}
      </ul>
    );
  }
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
