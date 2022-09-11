import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import api from '../api/api-service';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    selectedImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const { page } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      // fetchImages(nextQuery, nextPage);
    }

    if (prevName !== nextName || prevState.page !== page) {
      this.setState({ status: 'pending' });
      galeryAPI
        .fetchGalery(nextName, page)
        .then(imagesHits =>
          this.setState(state => ({
            imagesHits: [...state.imagesHits, ...imagesHits.hits],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    api.fetchImages();
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />

        {/* {showModal && <Modal src="" />} */}
      </div>
    );
  }
}

// toggleModal = () => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//   }));
// };
