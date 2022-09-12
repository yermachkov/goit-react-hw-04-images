export const ImageGalleryItem = ({ item, onSelect }) => {
  const { webformatURL, tags, largeImageURL } = item;
  return (
    <img
      src={webformatURL}
      alt={tags}
      onClick={() => onSelect(largeImageURL)}
      className="ImageGalleryItem-image"
    />
  );
};
