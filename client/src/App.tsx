import { useState } from "react";

import axios from "axios";

interface BooksDataResponse {
  id: string;
  thumbnail: string;
  smallThumbnail: string;
  title: string;
  authors: string[];
  language: string;
  salebility: string;
  buyLink: string;
}

function App() {
  const [title, setTitle] = useState<string>("");
  const [booksData, setBooksData] = useState<BooksDataResponse[]>([]);

  const fetchBooksData = async (title: string) => {
    const { data } = await axios.get<BooksDataResponse[]>(
      `/books?title=${title}`
    );
    setBooksData(data);
  };

  return (
    <div>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <button onClick={() => fetchBooksData(title)}>Search</button>

      <ul>
        {booksData.map((book) => (
          <li key={book.id}>
            <img src={book.thumbnail} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.authors.join(", ")}</p>
            <p>{book.language}</p>
            <p>{book.salebility}</p>
            {book.salebility !== "NOT_FOR_SALE" &&
            book.buyLink !== "NOT AVAILABLE" ? (
              <a href={book.buyLink}>Buy</a>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
