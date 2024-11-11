import PropTypes from 'prop-types';

interface SearchFormProps {
  setInput: (value: string) => void;
  setSearchBy: (value: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ setInput, setSearchBy }) => {
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
        <label htmlFor="title-radio">Book by Book Title</label>
        <input id="author-radio" type="radio" name="search-by" value="author" />
        <label htmlFor="author-radio">Books by Author</label>
        <button>Submit</button>
      </form>
    </div>
  );
}

SearchForm.propTypes = {
  setInput: PropTypes.func.isRequired,
  setSearchBy: PropTypes.func.isRequired,
}

export default SearchForm;
