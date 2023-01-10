import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import RejectedMessage from '../RejectedMessage/RejectedMessage';
import IdleMessage from '../IdleMessage/IdleMessage';
import FailureMessage from '../FailureMessage/FailureMessage';
import Button from '../Button/Button';
import { imagesApi } from '../services/images-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ imageNameValue, onLoadMore, page }) {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  // const componentDidUpdate = async (prevProps, prevState) => {
  //   const prevName = prevProps.imageNameValue;
  //   const prevPage = prevProps.page;

  //   if (prevName !== imageNameValue) {
  //     setImages([]);
  //   }

  //   if (prevName !== imageNameValue || prevPage !== page) {
  //     setStatus(Status.PENDING);

  //     try {
  //       const {
  //         data: { hits },
  //       } = await imagesApi(imageNameValue, page);
  //       console.log(hits);

  //       setImages(prevState => [...prevState, ...hits]);
  //       setStatus(Status.RESOLVED);
  //     } catch (error) {
  //       setStatus(Status.REJECTED);
  //       setError(Status.REJECTED);
  //     }
  //   }
  // };

  // useEffect(() => {
  console.log('Привіт');
  console.log(images);

  setStatus(Status.PENDING);
  try {
    const {
      data: { hits },
    } = imagesApi(imageNameValue, page);
    console.log(hits);

    setImages(prevState => [...prevState, ...hits]);
    setStatus(Status.RESOLVED);
  } catch (error) {
    setStatus(Status.REJECTED);
    setError(Status.REJECTED);
  }
  // }, [imageNameValue, page]);

  useEffect(() => {
    setImages([]);
  }, [imageNameValue]);

  const toggleModal = event => {
    if (showModal) {
      setShowModal(!showModal);
    }
    if (event.target.nodeName !== 'IMG') {
      return;
    }

    setShowModal(!showModal);
    setLargeImage(event.target.dataset.image);
    setTags(event.target.dataset.tag);
  };

  const nextName = imageNameValue;

  if (status === Status.IDLE) {
    return <IdleMessage />;
  }

  if (status === Status.REJECTED) {
    return <RejectedMessage message={error.message} />;
  }
  console.log(images);

  return (
    <>
      <ImageGalleryItem images={images} onClick={toggleModal} />
      {status === Status.PENDING && <Loader />}
      {images.length >= 12 && status !== Status.PENDING && (
        <Button onClick={onLoadMore} />
      )}
      {images.length === 0 && status !== Status.PENDING && (
        <FailureMessage nextName={nextName} />
      )}
      {showModal && (
        <Modal onOpenModal={toggleModal} largeImage={largeImage} tag={tags} />
      )}
    </>
  );
}
