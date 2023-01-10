import PropTypes from 'prop-types';
import { RejectedText } from './RejectedMessage.styled';

export default function RejectedMessage({ message }) {
  return <RejectedText>{message}</RejectedText>;
}

RejectedMessage.propTypes = {
  message: PropTypes.string,
};
