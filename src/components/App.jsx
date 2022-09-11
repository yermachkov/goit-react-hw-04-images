import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import imagesApi from '../api/api-service';

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

    imagesApi.fetchImages();
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
