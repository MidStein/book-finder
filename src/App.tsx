import { useState, useEffect } from "react";

function App() {
  const [input, setInput] = useState('');
  const [book, setBook] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    if (input !== "") {
      fetch('https://openlibrary.org/search.json?q=the+lord+of+the+rings')
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setAuthor(res.docs[0].author_name[0]);
          setBook(res.docs[0].title);
          setCoverUrl(
            `https://covers.openlibrary.org/b/olid/${
              res.docs[0].cover_edition_key
            }.jpg`
          );
        });
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.elements.namedItem("book-name") as HTMLInputElement;
    setInput(input.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="book-name"
          type="text"
          name="book-name"
        />
        <button>Submit</button>
      </form>
      {coverUrl && <img height="300" src={coverUrl} width="200"/>}
      <div>{book}</div>
      <div>{author}</div>
    </div>
  );
}

export default App;
