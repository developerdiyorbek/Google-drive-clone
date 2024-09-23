import { collection, getDocs, query, where } from "firebase/firestore";
import PageHeader from "../_components/PageHeader";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TrashItem from "./_components/TrashItem";

const getData = async (uid: string, type: "files" | "folders") => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", true)
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
      <PageHeader label="Trash" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Archived time</TableHead>
            <TableHead>File size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...folders, ...files].map((folder) => (
            <TrashItem key={folder.id} item={folder} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Page;
