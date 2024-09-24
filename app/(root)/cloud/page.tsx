import { collection, getDocs, query, where } from "firebase/firestore";
import PageHeader from "../_components/PageHeader";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import Storage from "@/components/shared/Storage";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ListItem from "../_components/ListItem";
import { IFolderAndFile } from "@/types";

const getData = async (uid: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = [];
  const q = query(
    collection(db, "files"),
    where("uid", "==", uid),
    where("isArchive", "==", false)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

async function Page() {
  const { userId } = auth();
  const files = await getData(userId!);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalSize = files.reduce((acc: any, file: any) => acc + file.size, 0);

  return (
    <>
      <PageHeader label="Storage" />
      <Storage totalSize={totalSize} />
      <Table className="mt-4">
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
          {files.map((folder: IFolderAndFile) => (
            <ListItem
              key={folder.id}
              item={JSON.parse(JSON.stringify(folder))}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Page;
