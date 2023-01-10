import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export default function Button({ onClick }) {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      Load More
    </ButtonLoadMore>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
