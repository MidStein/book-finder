import { useState, useEffect } from "react";

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
              console.error("Error fetching data:", error.message);
            } else {
              console.error("Unexpected error:", error);
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
                  console.error("Error fetching data:", error.message);
                } else {
                  console.error("Unexpected error:", error);
                }
              });
          }
        }
    }
  }, [input, searchBy]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newInput = formData.get('book-name') as string;
    const newSearchBy = formData.get('search-by') as string;

    setInput(newInput);
    setSearchBy(newSearchBy);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="book-name"
          type="text"
          name="book-name"
        />
        <input id="title-radio" type="radio" name="search-by" value="title" />
        <label htmlFor="title-radio">Search Book by Book Title</label>
        <input id="author-radio" type="radio" name="search-by" value="author" />
        <label htmlFor="author-radio">Search Books by Author</label>
        <button>Submit</button>
      </form>

      {
        book ? (
          <div>
            <img src={book.coverUrl} alt={`${book.title}'s cover`} height="300" width="200" />
            <div>{book.title}</div>
            <div>{book.author}</div>
          </div>
        ) : books &&
        (
          <div>
          <ul>
          {
            books.map((book, idx) => {
              return (
                <li key={idx}>
                  <img src={book.coverUrl} alt={`${book.title}'s cover`} height="300" width="200" />
                  <div>{book.title}</div>
                  <div>{book.author}</div>
                </li>
              )
            })
          }
          </ul>
          </div>
        )
      }
    </div>
  );
}

export default App;
