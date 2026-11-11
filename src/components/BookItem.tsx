
import { useState } from "react";
import type { Book } from "../types/Book";
import { deleteBook } from "../services/api";

interface BookItemProps {
  book: Book;
  onBookRemoved: () => void;
}

export default function BookItem({
  book,
  onBookRemoved
}: BookItemProps) {
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");

  async function handleRemove() {
    setRemoving(true);
    setError("");

    try {
      await deleteBook(book._id);
      onBookRemoved();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível remover o livro."
      );
      setRemoving(false);
    }
  }

  return (
    <article className="book-item">
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>Autor: {book.author}</p>

        <span
          className={
            book.status === "Lido"
              ? "status-badge read"
              : "status-badge unread"
          }
        >
          {book.status}
        </span>
      </div>

      <button
        type="button"
        className="remove-button"
        onClick={handleRemove}
        disabled={removing}
      >
        {removing ? "Removendo..." : "Remover"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </article>
  );
}
