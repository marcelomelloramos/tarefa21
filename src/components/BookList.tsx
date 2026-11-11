
import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { getBooks } from "../services/api";
import BookItem from "./BookItem";

interface BookListProps {
  refreshKey: number;
  onBookRemoved: () => void;
}

export default function BookList({
  refreshKey,
  onBookRemoved
}: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadBooks() {
      setLoading(true);
      setError("");

      try {
        const data = await getBooks();

        if (active) {
          setBooks(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar os livros."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      active = false;
    };
  }, [refreshKey, retryKey]);

  return (
    <section className="book-list">
      <h2>Livros cadastrados</h2>

      {loading && <p>Carregando livros...</p>}

      {!loading && error && (
        <div>
          <p className="error-message">{error}</p>
          <button
            type="button"
            onClick={() => setRetryKey((value) => value + 1)}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <p className="empty-message">
          Nenhum livro cadastrado ainda.
        </p>
      )}

      {!loading && !error && (
        <div className="books-grid">
          {books.map((book) => (
            <BookItem
              key={book._id}
              book={book}
              onBookRemoved={onBookRemoved}
            />
          ))}
        </div>
      )}
    </section>
  );
}
