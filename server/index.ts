import express from "express";
import dotenv from "dotenv";
import path from "path";
import axios from "axios";

dotenv.config();

const app = express();

app.use("/assets", express.static(path.join(__dirname, "./assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/index.html"));
});

interface BookDataResponse {
  id: string;
  thumbnail: string;
  smallThumbnail: string;
  title: string;
  authors: string[];
  language: string;
  salebility: string;
  buyLink: string;
}

app.get("/books/", async (req, res) => {
  const { query } = req;
  if (query.title) {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query.title}`
    );

    if (response.data.totalItems === 0) {
      return res.status(404).send("No books found");
    }

    if (query.all === "true") {
      return res.send(response.data.items);
    }

    const booksData = response.data.items.map((book: any) => {
      const { volumeInfo, saleInfo } = book;
      const bookData: Partial<BookDataResponse> = {
        id: book.id,
        title: volumeInfo.title,
      };
      if (!volumeInfo.imageLinks) {
        bookData.thumbnail = "https://via.placeholder.com/128x193";
        bookData.smallThumbnail = "https://via.placeholder.com/128x193";
      } else {
        bookData.thumbnail = volumeInfo.imageLinks.thumbnail;
        bookData.smallThumbnail = volumeInfo.imageLinks.smallThumbnail;
      }
      if (!volumeInfo.authors) {
        bookData.authors = ["Unknown"];
      } else {
        bookData.authors = volumeInfo.authors;
      }
      if (!volumeInfo.language) {
        bookData.language = "Unknown";
      } else {
        bookData.language = volumeInfo.language;
      }

      if (!saleInfo.saleability) {
        bookData.salebility = "NOT_FOR_SALE";
      } else {
        bookData.salebility = saleInfo.saleability;
      }

      if (!saleInfo.buyLink) {
        bookData.buyLink = "NOT_AVAILABLE";
      } else {
        bookData.buyLink = saleInfo.buyLink;
      }
      return bookData;
    });

    return res.send(booksData);
  }
  res.status(400).send("Please provide a title");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
