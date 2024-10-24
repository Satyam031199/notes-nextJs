"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, IdCardIcon, Trash } from "lucide-react"; // Icons from lucide-react
import { useState } from "react";

interface NoteCardProps {
  id: number;
  title: string;
  onEdit: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
}

export function NoteCard({ id, title, onEdit, onDelete }: NoteCardProps) {
  const [editContent, setEditContent] = useState<string>(title);
  return (
    <Card className="w-full p-1 m-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <div className="space-x-2 flex">
          {/* Edit Note */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            {/* Edit Sheet Content */}
            <SheetContent side="right" className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Edit Note</h2>
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Edit your note content..."
              />
              <Button type="submit" onClick={() => onEdit(id, editContent)}>Save Changes</Button>
            </SheetContent>
          </Sheet>
          {/* Delete Note */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your note and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500" asChild>
                  <Button variant="destructive" onClick={() => onDelete(id)}>
                    Delete
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
    </Card>
  );
}
