"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { IFolderAndFile } from "@/types";
import { File, Folder, Minus, MoreVertical, Trash, Undo } from "lucide-react";
import { format } from "date-fns";
import { byteConverter } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { deleteObject, ref } from "firebase/storage";

interface Props {
  item: IFolderAndFile;
}

function TrashItem({ item }: Props) {
  const { refresh } = useRouter();
  const type = item.size ? "files" : "folders";

  const onRestore = () => {
    const ref = doc(db, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      isArchive: false,
      archivedTime: null,
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Restored!",
      error: "Failed to restore",
    });
  };

  const onDelete = () => {
    const refs = doc(db, type, item.id);
    let promise;

    if (type === "folders") {
      promise = deleteDoc(refs).then(() => refresh());
    } else {
      promise = deleteObject(ref(storage, item.image)).then(() => {
        deleteDoc(refs).then(() => refresh());
      });
    }

    toast.promise(promise, {
      loading: "Loading...",
      success: "Deleted!",
      error: "Failed to delete.",
    });
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-1" role="button">
          {item.size ? (
            <File className="size-4 text-blue-500" />
          ) : (
            <Folder className="size-4 text-gray-500 fill-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
      </TableCell>
      <TableCell>
        {format(
          new Date(item.archivedTime.seconds * 1000),
          "MMM dd, hh:mm a, yyyy"
        )}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end group">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MoreVertical className="size-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent forceMount side="left" className="p-0 py-2">
            <div
              role="button"
              className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded"
              onClick={onRestore}
            >
              <Undo className="size-4" />
              <span>Restore</span>
            </div>
            <ConfirmModal onConfirm={onDelete}>
              <div
                role="button"
                className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded w-full"
              >
                <Trash className="size-4" />
                <span>Delete</span>
              </div>
            </ConfirmModal>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}

export default TrashItem;
