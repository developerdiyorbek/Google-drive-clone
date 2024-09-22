"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { IFolderAndFile } from "@/types";
import { useUser } from "@clerk/nextjs";
import { File, Folder, Minus, Save, X } from "lucide-react";
import { format } from "date-fns";
import { byteConverter } from "@/lib/utils";
import ListAction from "./ListAction";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

interface Props {
  item: IFolderAndFile;
}

function ListItem({ item }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.name);
  const inputRef = useRef(null);
  const { refresh } = useRouter();
  const { user } = useUser();

  const onStartEditing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const onSave = () => {
    const type = item.size ? "files" : "folders";
    const ref = doc(db, type, item.id);

    const promise = setDoc(ref, {
      ...item,
      name: value.length ? value : "Untitled",
    }).then(() => {
      refresh();
      setIsEditing(false);
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Success!",
      error: "Failed.",
    });
  };

  return (
    <TableRow className="group cursor-pointer">
      <TableCell className="font-medium">
        {isEditing ? (
          <div className="relative">
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <div className="absolute right-0 top-0 h-full flex items-center space-x-1">
              <Button
                size={"sm"}
                variant={"outline"}
                className="h-full"
                onClick={onSave}
              >
                <Save className="size-4" />
              </Button>
              <Button
                size={"sm"}
                variant={"outline"}
                className="h-full"
                onClick={() => setIsEditing(false)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex items-center space-x-1"
              role="button"
              onClick={onStartEditing}
            >
              {item.size ? (
                <File className="size-4 text-blue-500" />
              ) : (
                <Folder className="size-4 text-gray-500 fill-gray-500" />
              )}
              <span>{item.name}</span>
            </div>
          </>
        )}
      </TableCell>
      <TableCell className="flex items-center space-x-2">
        <Avatar className="size-8">
          <AvatarImage src={user?.imageUrl} />
        </Avatar>
        <span>me</span>
      </TableCell>
      <TableCell>
        {format(new Date(item.timestamp.seconds * 1000), "MMM dd yyyy")}
      </TableCell>
      <TableCell>{item.size ? byteConverter(item.size) : <Minus />}</TableCell>
      <TableCell className="flex justify-end group items-center">
        <ListAction item={item} onStartEditing={onStartEditing} />
      </TableCell>
    </TableRow>
  );
}

export default ListItem;
