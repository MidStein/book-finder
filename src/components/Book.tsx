import PropTypes from 'prop-types';

const Book = ({ book }) => {
  return (
    <div>
      <img src={book.coverUrl} alt={`${book.title}'s cover`} height="300" width="200" />
      <div>{book.title}</div>
      <div>{book.author}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
}

export default Book;
