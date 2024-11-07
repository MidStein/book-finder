import { useState } from 'react'

function App() {
  const [bookName, setBookName] = useState('');
  const handleChange = (e) => {
    setBookName(e.target.value);
  }

  return (
    <div>
      <form>
        <input id="book-name" type="text" name="book-name" value={bookName} onChange={handleChange}/>
      </form>
      {bookName}
    </div>
  )
}

export default App
