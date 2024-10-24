"use client";

import { createNote, deleteNote, getUserNotes } from "@/utils/db/actions";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NoteCard } from "./NoteCard";
import { CirclePlus } from "lucide-react";

interface UserNotes {
  id: number;
  content: string;
}

export default function Home() {
  const { userId, isSignedIn, isLoaded } = useAuth();
  const [notes, setNotes] = useState<UserNotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState<string>("");

  const handleSaveNote = async () => {
    if (newNote.trim() && userId) {
      // Ensure userId is not null/undefined
      try {
        const savedNote = await createNote(newNote, userId);
        if (savedNote) {
          setNotes([
            ...notes,
            { id: savedNote.id, content: savedNote.content },
          ]); // Add the saved note
        }
        setNewNote(""); // Clear input
      } catch (error) {
        console.error("Failed to save note:", error);
      }
    }
  };

  const handleEdit = (id: number) => {
    console.log("Editing note:", id);
    // Add your edit logic here (e.g., open a modal or sheet)
  };

  const handleDelete = async (id: number) => {
    const success = await deleteNote(id);
    if (success) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } else {
      console.error("Failed to delete note.");
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      if (userId) {
        const fetchedNotes = await getUserNotes(userId);
        setNotes(fetchedNotes || []);
      }
      setLoading(false);
    };

    if (isSignedIn) {
      fetchNotes();
    } else {
      setLoading(false);
    }
  }, [isSignedIn, userId]);

  if (!isLoaded) {
    return <div className="text-2xl container mx-auto mt-20">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="text-2xl container mx-auto mt-20">
        You need to Sign-In first
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-2xl container mx-auto mt-20">Loading notes...</div>
    );
  }

  return (
    <div className="text-2xl container mx-auto mt-28 w-screen">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl ml-3">Your Notes</h1>
        {/* Sheet Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="mr-3">
              <CirclePlus />
              Add Note
            </Button>
          </SheetTrigger>

          {/* Sheet Content */}
          <SheetContent side="right" className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Add a New Note</h2>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Write your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={handleSaveNote}>
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      {notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.content}
              onEdit={() => handleEdit(note.id)}
              onDelete={() => handleDelete(note.id)}
            />
          ))}
        </ul>
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}
