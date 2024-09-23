import { collection, getDocs, query, where } from "firebase/firestore";
import PageHeader from "../_components/PageHeader";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import SuggestCard from "../_components/SuggestCard";
import { IFolderAndFile } from "@/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ListItem from "../_components/ListItem";

const getData = async (uid: string, type: "files" | "folders") => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    where("isStar", "==", true)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

async function Page() {
  const { userId } = auth();
  const foldersJSON = await getData(userId!, "folders");
  const filesJSON = await getData(userId!, "files");

  const folders = JSON.parse(JSON.stringify(foldersJSON));
  const files = JSON.parse(JSON.stringify(filesJSON));

  return (
    <>
      <PageHeader label="Starred" />
      <div className="text-sm opacity-70 mt-6">Suggested</div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {files.map((file: IFolderAndFile) => (
          <SuggestCard key={file.id} item={file} />
        ))}
      </div>
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
          {folders.map((folder: IFolderAndFile) => (
            <ListItem key={folder.id} item={folder} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Page;
