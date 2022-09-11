import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    selectedImage: '',
    searchQuery: '',
    page: 1,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

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
