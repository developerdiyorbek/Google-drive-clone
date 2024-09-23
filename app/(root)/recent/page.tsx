import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import PageHeader from "../_components/PageHeader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ListItem from "../_components/ListItem";
import Empty from "@/components/shared/Empty";

const getData = async (uid: string, type: "files" | "folders") => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    limit(4)
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
      <PageHeader label="Recent" />
      {[...files, ...folders].length ? (
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
  );
}

export default Page;
