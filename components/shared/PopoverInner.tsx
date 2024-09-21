"use client";

import { FileUp, Folder, FolderUp } from "lucide-react";
import { Separator } from "../ui/separator";
import { useFolder } from "@/hooks/useFolder";
import { ChangeEvent, useRef } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function PopoverInner() {
  const { onOpen } = useFolder();
  const { user } = useUser();

  const inputRef = useRef(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    let image = "";
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        image = e.target?.result as string;
      };
    }

    const promise = addDoc(collection(db, "files"), {
      name: file.name,
      type: file.type,
      size: file.size,
      image,
      uid: user?.id,
      timestamp: serverTimestamp(),
      isArchive: false,
    }).then((docs) => {
      const refs = ref(storage, `files/${docs.id}/image`);
      uploadString(refs, image, "data_url").then(() => {
        getDownloadURL(refs).then((url) => {
          updateDoc(doc(db, "files", docs.id), {
            image: url,
          });
        });
      });
    });

    toast.promise(promise, {
      loading: "Uploading...",
      success: "Uploaded",
      error: "Error uploading file",
    });
  };

  return (
    <>
      <div
        className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
        role="button"
        onClick={onOpen}
      >
        <Folder className="size-4" />
        <span>New Folder</span>
      </div>
      <Separator className="my-2" />
      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
        >
          <FileUp className="size-4" />
          <span>File Upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>

      <label>
        <div
          className="flex items-center hover:bg-secondary transition py-2 px-4 space-x-2 text-sm"
          role="button"
        >
          <FolderUp className="size-4" />
          <span>Folder Upload</span>
        </div>
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
    </>
  );
}

export default PopoverInner;
