import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { IFolderAndFile } from "@/types";
import { doc, setDoc } from "firebase/firestore";
import {
  Download,
  MoreVertical,
  Pencil,
  Star,
  Trash,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface Props {
  item: IFolderAndFile;
  onStartEditing?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function ListAction({ item, onStartEditing }: Props) {
  const { refresh } = useRouter();

  const onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const type = item.size ? "files" : "folders";
    const ref = doc(db, type, item.id);
    const promise = setDoc(ref, {
      ...item,
      isArchive: true,
      archivedTime: new Date(),
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Archived!",
      error: "Failed to archive.",
    });
  };

  const onStar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    const type = item.size ? "files" : "folders";
    const isStar = item.isStar ? false : true;
    const ref = doc(db, type, item.id);
    const promise = setDoc(ref, {
      ...item,
      isStar,
    }).then(() => refresh());

    toast.promise(promise, {
      loading: "Loading...",
      success: "Starred!",
      error: "Failed to star.",
    });
  };

  const onDownload = () => {
    if (!item.size) {
      toast.error("This is a folder, not file");
      return;
    }

    window.open(item.image, "_blank");
  };

  const onShare = () => {
    if (!item.size) {
      toast.error("You can't share a folder");
      return;
    }

    navigator.clipboard.writeText(item.image);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex items-center space-x-1">
      <div
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
        onClick={onDelete}
      >
        <Trash className="size-4 opacity-50" />
      </div>
      <div
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
        onClick={onStar}
      >
        <Star
          className={cn(
            "size-4",
            item.isStar && "fill-yellow-400 text-yellow-400"
          )}
        />
      </div>
      <Popover>
        <PopoverTrigger className="flex justify-start" asChild>
          <div
            role="button"
            className="p-2 hover:bg-secondary rounded-full transition"
          >
            <MoreVertical className="size-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="px-2 py-2">
          <div
            role="button"
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded"
            onClick={onDownload}
          >
            <Download className="size-4" />
            <span>Download</span>
          </div>
          <div
            role="button"
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded"
            onClick={onStartEditing}
          >
            <Pencil className="size-4" />
            <span>Rename</span>
          </div>
          <Separator className="my-2" />

          <div
            role="button"
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded"
            onClick={onShare}
          >
            <UserPlus className="size-4" />
            <span>Share</span>
          </div>
          <div
            role="button"
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded"
            onClick={onDelete}
          >
            <Trash className="size-4" />
            <span>Move to trash</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ListAction;
