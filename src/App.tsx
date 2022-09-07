import { useState } from "react";
import api from "./api";
import NoteCard from "./components/NoteCard";
import type { Note } from "./types";

function App() {
  const [notes, setNotes] = useState<Note[]>(() => api.notes.list());

  function handleArchived(id: Note["id"]) {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id !== id) return note;
        return {
          ...note,
          archived: !note.archived,
        };
      })
    );
  }

  function handleDelete(id: Note["id"]) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  }
//[TODO]: MODAL, EDIT MODE, ARCHIVED TABS
  return (
    <main>
      <div style={{ marginBottom: 24 }}>
        <h1>Mis Notas</h1>
        <button className="nes-btn">Crear Nota</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
          gap: 24,
        }}
      >
        {notes.map((note) => (
          <NoteCard
            onDelete={handleDelete}
            onArchive={handleArchived}
            key={note.id}
            note={note}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
