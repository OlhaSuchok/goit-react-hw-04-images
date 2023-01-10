import PropTypes from 'prop-types';

import {
  ImageGalleryItems,
  ImageGalleryImage,
} from './ImageGalleryItem.styled';

import { Gallery } from '../ImageGallery/ImageGallery.styled';

export default function ImageGalleryItem({ images, onClick }) {
  console.log(images);
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItems key={id} onClick={onClick}>
            <ImageGalleryImage
              src={webformatURL}
              alt={tags}
              data-image={largeImageURL}
              data-tag={tags}
            />
          </ImageGalleryItems>
        );
      })}
    </Gallery>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};
