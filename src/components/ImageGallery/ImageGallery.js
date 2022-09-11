import { Component } from 'react';
import axios from 'axios';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { fetchImages } from '../../api/api-service';

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
      fetchImages(nextQuery, nextPage);
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
