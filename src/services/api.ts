
import type { Book, NewBook } from "../types/Book";

const baseUrl = (
  import.meta.env.VITE_CRUDCRUD_API_URL || ""
).replace(/\/+$/, "");

function getUrl(path: string): string {
  if (!baseUrl || baseUrl.includes("SUA_CHAVE")) {
    throw new Error(
      "Configure a URL do CrudCrud no arquivo .env.local."
    );
  }

  return `${baseUrl}${path}`;
}

async function checkResponse(response: Response): Promise<void> {
  if (!response.ok) {
    throw new Error(
      `Erro na API (${response.status}). Verifique se o endpoint do CrudCrud ainda está ativo.`
    );
  }
}

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(getUrl("/books"));

  await checkResponse(response);

  return (await response.json()) as Book[];
}

export async function createBook(book: NewBook): Promise<Book> {
  const response = await fetch(getUrl("/books"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  });

  await checkResponse(response);

  return (await response.json()) as Book;
}

export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(
    getUrl(`/books/${encodeURIComponent(id)}`),
    {
      method: "DELETE"
    }
  );

  await checkResponse(response);
}
