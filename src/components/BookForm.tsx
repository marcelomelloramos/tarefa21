
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { BookStatus } from "../types/Book";
import { createBook } from "../services/api";

interface BookFormProps {
  onBookAdded: () => void;
}

export default function BookForm({
  onBookAdded
}: BookFormProps) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] =
    useState<BookStatus>("Não lido");

  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim() || !author.trim()) {
      setError("Preencha o título e o autor.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await createBook({
        title: title.trim(),
        author: author.trim(),
        status
      });

      setTitle("");
      setAuthor("");
      setStatus("Não lido");

      onBookAdded();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível cadastrar o livro."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Cadastrar livro</h2>

      <label htmlFor="title">Título</label>
      <input
        id="title"
        type="text"
        value={title}
        placeholder="Ex.: Dom Casmurro"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value)
        }
        required
      />

      <label htmlFor="author">Autor</label>
      <input
        id="author"
        type="text"
        value={author}
        placeholder="Ex.: Machado de Assis"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setAuthor(event.target.value)
        }
        required
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={status}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setStatus(event.target.value as BookStatus)
        }
      >
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={saving}>
        {saving ? "Salvando..." : "Adicionar livro"}
      </button>
    </form>
  );
}
