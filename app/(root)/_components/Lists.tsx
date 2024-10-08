"use client";

import { IFolderAndFile } from "@/types";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ListItem from "./ListItem";
import { useLayout } from "@/hooks/useLayout";
import SuggestCard from "./SuggestCard";
import Empty from "@/components/shared/Empty";

interface Props {
  folders: IFolderAndFile[];
  files: IFolderAndFile[];
}

function Lists({ folders, files }: Props) {
  const { layout } = useLayout();
  return layout === "list" ? (
    <>
      {[...folders, ...files].length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>File size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...folders, ...files].map((folder) => (
              <ListItem key={folder.id} item={folder} />
            ))}
          </TableBody>
        </Table>
      ) : (
        <Empty />
      )}
    </>
  ) : (
    <>
      <div className="text-sm opacity-70 mt-6">Suggested</div>
      {files.length ? (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {files.map((file) => (
            <SuggestCard key={file.id} item={file} />
          ))}
        </div>
      ) : (
        <Empty sm />
      )}
      <div className="text-sm opacity-70 mt-6">Folders</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>File size</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {folders.map((folder) => (
            <ListItem key={folder.id} item={folder} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Lists;
