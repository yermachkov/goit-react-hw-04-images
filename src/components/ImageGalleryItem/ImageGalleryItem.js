import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const ImageGalleryItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const { webformatURL, tags, largeImageURL } = item;

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onImgClick = () => {
    setSelectedImg(item);
    toggleModal();
  };

  return (
    <>
      <img
        src={webformatURL}
        alt={tags}
        onClick={onImgClick}
        className="ImageGalleryItem-image"
      />

      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={selectedImg.largeImageURL} alt={selectedImg.tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
