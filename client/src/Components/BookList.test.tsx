import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BookList from "./BookList";

describe("BookList", () => {
  it("should render an error if there are no books", () => {
    render(<BookList books={[]} />);

    expect(screen.getByText("No books found")).toBeInTheDocument();
  });

  it("should render a list of books", () => {
    render(
      <BookList
        books={[
          {
            id: "id",
            title: "Test title",
            thumbnail: "https://via.placeholder.com/128x193",
            smallThumbnail: "https://via.placeholder.com/128x193",
            authors: ["Test author"],
            language: "nl",
            salebility: "NOT_FOR_SALE",
            buyLink: "NOT_AVAILABLE",
          },
        ]}
      />
    );
    const image = screen.getByAltText("Test title");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/128x193");
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test author")).toBeInTheDocument();
    expect(screen.getByText("Language: nl")).toBeInTheDocument();
    expect(screen.getByText("Not for sale")).toBeInTheDocument();
  });
});
