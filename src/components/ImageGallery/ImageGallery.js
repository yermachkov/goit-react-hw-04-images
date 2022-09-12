import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <li key={image.id} className="ImageGalleryItem">
          <ImageGalleryItem item={image} onSelect={toggleModal} />
        </li>
      ))}
    </ul>
  );
};
