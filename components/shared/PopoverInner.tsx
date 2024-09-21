import { FileUp, Folder, FolderUp } from "lucide-react";
import { Separator } from "../ui/separator";

function PopoverInner() {
  return (
    <>
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
      >
        <Folder className="size-4" />
        <span>New Folder</span>
      </div>
      <Separator className="my-2" />
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
      >
        <FileUp className="size-4" />
        <span>File Upload</span>
      </div>
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
      >
        <FolderUp className="size-4" />
        <span>Folder Upload</span>
      </div>
    </>
  );
}

export default PopoverInner;
