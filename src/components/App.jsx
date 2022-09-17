import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import api from '../api/api-service';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    selectedImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      api
        .fetchImages(nextQuery, nextPage)
        .then(response => {
          const specifiedResponse = response.hits.map(
            ({ id, largeImageURL, webformatURL, tags }) => {
              return { id, largeImageURL, webformatURL, tags };
            }
          );

          this.setState(prevState => ({
            images: [...prevState.images, ...specifiedResponse],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = async largeImg => {
    await this.setState({ selectedImg: largeImg });
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, error, status, showModal, selectedImg } = this.state;

    return (
      <main className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} toggleModal={this.toggleModal} />
        {images.length > 0 && status !== 'pending' && (
          <Button onLoadMore={this.handleLoadMore}>Load more</Button>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <p>{error.message}</p>}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImg} alt="" />
          </Modal>
        )}
      </main>
    );
  }
}
