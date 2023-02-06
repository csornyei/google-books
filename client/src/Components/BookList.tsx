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
  return (
    <ul className="flex flex-col md:flex-row md:flex-wrap">
      {books.map((book) => (
        <li key={book.id} className="rounded text-center md:w-1/4">
          <img src={book.thumbnail} alt={book.title} className="mx-auto h-48" />
          <div className="px-4 pt-2 pb-8">
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
