"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { IFolderAndFile } from "@/types";
import { useUser } from "@clerk/nextjs";
import { File, Folder, Minus } from "lucide-react";
import { format } from "date-fns";
import { byteConverter } from "@/lib/utils";
import ListAction from "./ListAction";

interface Props {
  item: IFolderAndFile;
}

function ListItem({ item }: Props) {
  const { user } = useUser();
  return (
    <TableRow className="group cursor-pointer">
      <TableCell className="font-medium">
        <div className="flex items-center space-x-1" role="button">
          {item.size ? (
            <File className="size-4 text-blue-500" />
          ) : (
            <Folder className="size-4 text-gray-500 fill-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
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
        <ListAction item={item} />
      </TableCell>
    </TableRow>
  );
}

export default ListItem;
