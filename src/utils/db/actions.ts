import { db } from "./dbConfig";
import { notes, users } from "./schema";
import { desc, eq } from "drizzle-orm";

export async function createOrUpdateUser(
  clerkUserId: string,
  email: string,
  name: string
) {
  try {
    console.log("Creating or updating user:", clerkUserId, email, name);

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkUserId))
      .limit(1)
      .execute();

    if (existingUser) {
      const [updatedUser] = await db
        .update(users)
        .set({ name, email })
        .where(eq(users.clerkId, clerkUserId))
        .returning()
        .execute();
      console.log("Updated user:", updatedUser);
      return updatedUser;
    }
    const [newUser] = await db
      .insert(users)
      .values({ clerkId: clerkUserId, email, name })
      .returning()
      .execute();
    console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return null;
  }
}

export async function getUserNotes(clerkId: string) {
  try {
    console.log("Fetching notes for user:", clerkId);

    const userNotes = await db
      .select({ id: notes.id, content: notes.content })
      .from(notes)
      .where(eq(notes.userId, clerkId)) // Ensure clerkId matches data type
      .orderBy(desc(notes.id))
      .execute();

    console.log("Fetched notes:", userNotes);
    return userNotes;
  } catch (error) {
    console.error("Error fetching user notes:", error);
    return [];
  }
}

export async function createNote(content: string, userId: string) {
  try {
    console.log("Creating new note");
    const [newNote] = await db
      .insert(notes)
      .values({content, userId})
      .returning()
      .execute();
    console.log("New note created:", newNote);
    return newNote;
  } catch (error) {
    console.error("Error creating note: ", error);
    return null;
  }
}

export async function deleteNote(noteId: number) {
  try {
    const deletedNote = await db
      .delete(notes)
      .where(eq(notes.id, noteId))
      .returning()
      .execute();

    if (deletedNote.length > 0) {
      console.log("Note deleted:", deletedNote[0]);
      return true;
    } else {
      console.warn("No note found with the given ID:", noteId);
      return false;
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    return false;
  }
}

export async function updateNote(noteId: number, newContent: string) {
  try {
    const updatedNote = await db
      .update(notes)
      .set({ content: newContent })
      .where(eq(notes.id, noteId))
      .returning()
      .execute();

    if (updatedNote.length > 0) {
      console.log("Note updated:", updatedNote[0]);
      return true;
    } else {
      console.warn("No note found with the given ID:", noteId);
      return false;
    }
  } catch (error) {
    console.error("Error updating note:", error);
    return false;
  }
}