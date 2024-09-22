"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IFolderAndFile } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import ListAction from "./ListAction";

interface Props {
  item: IFolderAndFile;
}

function SuggestCard({ item }: Props) {
  const { user } = useUser();
  return (
    <div className="bg-secondary py-4 group">
      <div className="flex items-center space-x-2 ml-[18px] mb-1" role="button">
        <Paperclip className="size-4 text-blue-500" />
        <span className="text-sm opacity-70">{item.name}</span>
      </div>
      <div className="relative size-52 mx-auto">
        <Image src={item.image} alt={item.name} fill className="rounded" />
      </div>

      <div className="flex items-center w-full justify-between space-x-2 mt-4">
        <div className="flex items-center space-x-2 ml-[18px]">
          <Avatar className="size-6">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
          <span className="opacity-75">me</span>
        </div>

        <ListAction item={item} />
      </div>
    </div>
  );
}

export default SuggestCard;
