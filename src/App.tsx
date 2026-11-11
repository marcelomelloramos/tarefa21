
import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function refreshBooks() {
    setRefreshKey((previous) => previous + 1);
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Meu Catálogo de Livros</h1>
        <p>
          Organize suas leituras com React,
          TypeScript e uma API REST.
        </p>
      </header>

      <BookForm onBookAdded={refreshBooks} />

      <BookList
        refreshKey={refreshKey}
        onBookRemoved={refreshBooks}
      />
    </main>
  );
}
