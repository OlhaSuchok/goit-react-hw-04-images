import PropTypes from 'prop-types';
import { FailureText, FailureValue } from './FailureMessage.styled';

export default function FailureMessage({ nextName }) {
  return (
    <FailureText>
      Пошук за запитом <FailureValue>«{nextName}» </FailureValue>не дав
      результатів, <br /> введіть інше значення.
    </FailureText>
  );
}

FailureMessage.propTypes = {
  nextName: PropTypes.string.isRequired,
};
