import { useState } from "react";

import axios from "axios";
import Input from "./Components/Input";
import BookList, { Book } from "./Components/BookList";

function App() {
  const [title, setTitle] = useState<string>("");
  const [booksData, setBooksData] = useState<Book[]>([]);

  const fetchBooksData = async (title: string) => {
    const { data } = await axios.get<Book[]>(`/books?title=${title}`);
    setBooksData(data);
  };

  return (
    <>
      <header className="w-100 bg-slate-800 p-2 text-slate-200">
        <h1 className="text-lg font-bold">Books</h1>
      </header>
      <main>
        <section className="mt-4">
          <Input setValue={setTitle} onClick={() => fetchBooksData(title)} />
        </section>
        <section className="mt-4">
          <BookList books={booksData} />
        </section>
      </main>
    </>
  );
}

export default App;
