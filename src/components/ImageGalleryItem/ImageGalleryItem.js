import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const { webformatURL, tags, largeImageURL } = item;

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <img
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
        className="ImageGalleryItem-image"
      />

      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
