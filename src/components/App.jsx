import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box } from 'components/Box/Box';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default function ImageFinger() {
  const [imageNameValue, setImageNameValue] = useState('');
  const [page, setPage] = useState('');

  const handleFormSearchSubmit = imageNameValue => {
    setImageNameValue(imageNameValue);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onResetPage = () => {
    setPage(1);
  };

  return (
    <Box p={20}>
      <Searchbar
        onFormSearchSubmit={handleFormSearchSubmit}
        onResetPage={onResetPage}
      />
      <ImageGallery
        imageNameValue={imageNameValue}
        onLoadMore={onLoadMore}
        page={page}
      />
      <ToastContainer autoClose={3000} />
    </Box>
  );
}
