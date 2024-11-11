import PropTypes from 'prop-types';

import Book from './Book';

const Display = ({ book, books }) => {
  return (
    <div>
      {
        book ? (
          <Book book={book} />
        ) : books &&
        (
          <div>
          <ul>
          {
            books.map((book, idx) => {
              return (
                <li key={idx}>
                  <Book book={book} />
                </li>
              )
            })
          }
          </ul>
          </div>
        )
      }
    </div>
  )
}

// Display.propTypes = {
//   book: PropTypes.object.isRequired,
//   books: PropTypes.object.isRequired,
// }

export default Display;
