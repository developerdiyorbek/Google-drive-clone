import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { IFolderAndFile } from "@/types";
import {
  Download,
  MoreVertical,
  Pencil,
  Star,
  Trash,
  UserPlus,
} from "lucide-react";

interface Props {
  item: IFolderAndFile;
}

function ListAction({ item }: Props) {
  return (
    <div className="flex items-center space-x-1">
      <div
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Trash className="size-4 opacity-50" />
      </div>
      <div
        role="button"
        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition opacity-0 group-hover:opacity-100"
      >
        <Star className="size-4 opacity-50" />
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
          >
            <Download className="size-4" />
            <span>Download</span>
          </div>
          <div
            role="button"
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded"
          >
            <Pencil className="size-4" />
            <span>Rename</span>
          </div>
          <Separator className="my-2" />

          <div
            role="button"
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded"
          >
            <UserPlus className="size-4" />
            <span>Share</span>
          </div>
          <div
            role="button"
            className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm rounded"
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
