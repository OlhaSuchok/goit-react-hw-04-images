import React, { Component } from 'react';
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

class ImageGallery extends Component {
  state = {
    images: [],
    showModal: false,
    largeImage: '',
    tags: '',
    error: null,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageNameValue;
    const nextName = this.props.imageNameValue;

    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevName !== nextName) {
      this.setState({ images: [] });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      try {
        const {
          data: { hits },
        } = await imagesApi(nextName, nextPage);
        console.log(hits);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: Status.RESOLVED,
        }));
      } catch (error) {
        this.setState({ error, status: Status.REJECTED });
      }
    }
  }

  toggleModal = event => {
    const { showModal } = this.state;
    if (showModal) {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
      }));
    }
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImage: event.target.dataset.image,
      tags: event.target.dataset.tag,
    }));
  };

  render() {
    const { images, showModal, error, status } = this.state;
    const nextName = this.props.imageNameValue;

    if (status === Status.IDLE) {
      return <IdleMessage />;
    }

    if (status === Status.REJECTED) {
      return <RejectedMessage message={error.message} />;
    }

    return (
      <>
        <ImageGalleryItem images={images} onClick={this.toggleModal} />
        {status === Status.PENDING && <Loader />}
        {images.length >= 12 && status !== Status.PENDING && (
          <Button onClick={this.props.onLoadMore} />
        )}
        {images.length === 0 && status !== Status.PENDING && (
          <FailureMessage nextName={nextName} />
        )}
        {showModal && (
          <Modal
            onOpenModal={this.toggleModal}
            largeImage={this.state.largeImage}
            tag={this.state.tags}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;
