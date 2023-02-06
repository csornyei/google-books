export interface Book {
  id: string;
  thumbnail: string;
  smallThumbnail: string;
  title: string;
  authors: string[];
  language: string;
  salebility: string;
  buyLink: string;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (books.length === 0) {
    return <p className="text-center">No books found</p>;
  }

  return (
    <ul className="flex flex-col md:flex-row md:flex-wrap">
      {books.map((book) => (
        <li
          key={book.id}
          className="flex flex-row rounded px-4 pb-4 text-center md:w-1/4 md:flex-col md:px-0"
        >
          <img
            src={book.thumbnail}
            alt={book.title}
            className="mx-auto h-48 w-32"
          />
          <div className="flex-grow px-4 pt-2 pb-8 md:flex-grow-0">
            <h3 className="font-bold">{book.title}</h3>
            <p>{book.authors.join(", ")}</p>
            <p className="mb-4 text-sm font-thin text-slate-600">
              Language: {book.language}
            </p>
            {book.salebility !== "NOT_FOR_SALE" &&
            book.buyLink !== "NOT AVAILABLE" ? (
              <a href={book.buyLink} className="rounded bg-green-300 px-4 py-2">
                Buy
              </a>
            ) : (
              <p>Not for sale</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
