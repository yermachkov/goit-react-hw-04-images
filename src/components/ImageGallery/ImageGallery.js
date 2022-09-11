import { Component } from 'react';
import axios from 'axios';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '28442536-1443146eb90a3a0b59e7fe2e3';

export class ImageGallery extends Component {
  state = {
    page: 1,
    images: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      axios.defaults.baseURL = BASE_URL;
      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: nextQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.state.page,
        per_page: 12,
      });

      axios
        .get(`/?${searchParams}`)
        .then(response => {
          this.setState({ status: 'resolved' });
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
          }));
        })
        .catch(error => {
          this.setState({ error, status: 'resolved' });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images, error, status } = this.state;

    // if (status === 'pending') {
    //   return <Loader />;
    // }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved' || this.state.images.length > 0) {
      return (
        <>
          <ul className="ImageGallery">
            {images.map(({ id, largeImageURL, webformatURL }) => (
              <li key={id} className="ImageGalleryItem">
                <ImageGalleryItem imgSrc={webformatURL} />
              </li>
            ))}
          </ul>
          <Button onClick={this.handleLoadMore} />
        </>
      );
    }
  }
}
