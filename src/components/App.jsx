import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { getImages } from '../api/api-service';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function fetchImages() {
      setStatus('pending');
      const newImages = await getImages(searchQuery, page);
      setImages(prevState => [...prevState, ...newImages]);
      setStatus('resolved');
    }

    fetchImages();
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <main className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && status !== 'pending' && (
        <Button onLoadMore={handleLoadMore}>Load more</Button>
      )}
      {status === 'pending' && <Loader />}
    </main>
  );
};
