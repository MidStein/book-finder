import { useState, useEffect } from 'react';

import SearchForm from './components/SearchForm';
import Display from './components/Display';

interface Book {
  title: string;
  author: string;
  coverUrl: string;
}

interface ApiResponse {
  docs: {
    title: string;
    author_name: string;
    cover_edition_key: string;
  }[];
}

function App() {
  const [input, setInput] = useState('');
  const [searchBy, setSearchBy] = useState('');

  const [book, setBook] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[] | null>(null);

  useEffect(() => {
    if (input !== '') {
      if (searchBy == 'title') {
        fetch(`https://openlibrary.org/search.json?title=${input}`)
          .then((res) => {
            return res.json() as Promise<ApiResponse>;
          })
          .then((res) => {
            const doc = res.docs[0];
            const resBook: Book = {
              title: doc.title,
              author: doc.author_name[0],
              coverUrl: `https://covers.openlibrary.org/b/olid/${
                res.docs[0].cover_edition_key
              }.jpg`
            }
            setBook(resBook);
          })
          .catch((error: unknown) => {
            if (error instanceof Error) {
              console.error('Error fetching data:', error.message);
            } else {
              console.error('Unexpected error:', error);
            }
          });
        } else {
          if (input !== '') {
            fetch(`https://openlibrary.org/search.json?author=${
              input
            }&sort=rating`)
              .then((res) => {
                return res.json() as Promise<ApiResponse>;
              })
              .then((res) => {
                const resBooks: Book[] = res.docs.slice(0, 20).map((doc) => {
                  return {
                    title: doc.title,
                    author: doc.author_name[0],
                    coverUrl: `https://covers.openlibrary.org/b/olid/${
                      res.docs[0].cover_edition_key
                    }.jpg`
                  };
                })
                setBooks(resBooks);
              })
              .catch((error: unknown) => {
                if (error instanceof Error) {
                  console.error('Error fetching data:', error.message);
                } else {
                  console.error('Unexpected error:', error);
                }
              });
          }
        }
    }
  }, [input, searchBy]);

  return (
    <div>
      <SearchForm setInput={setInput} setSearchBy={setSearchBy} />
      <Display book={book} books={books} />
    </div>
  );
}

export default App;
