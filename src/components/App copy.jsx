import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box } from 'components/Box/Box';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageNameValue: '',
    page: 1,
  };

  handleFormSearchSubmit = imageNameValue => {
    this.setState({ imageNameValue });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onResetPage = () => {
    this.setState({ page: 1 });
  };

  render() {
    return (
      <Box p={20}>
        <Searchbar
          onFormSearchSubmit={this.handleFormSearchSubmit}
          onResetPage={this.onResetPage}
        />
        <ImageGallery
          imageNameValue={this.state.imageNameValue}
          onLoadMore={this.onLoadMore}
          page={this.state.page}
        />
        <ToastContainer autoClose={3000} />
      </Box>
    );
  }
}

export default App;
