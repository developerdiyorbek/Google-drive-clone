import PageHeader from "@/app/(root)/_components/PageHeader";
import TrashItem from "@/app/(root)/trash/_components/TrashItem";
import Empty from "@/components/shared/Empty";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Props {
  params: { documentId: string };
}

const getFiles = async (folderId: string, uid: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files: any[] = [];
  const q = query(
    collection(db, "folders", folderId, "files"),
    where("uid", "==", uid),
    where("isArchive", "==", true)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    files.push({ ...doc.data(), id: doc.id });
  });

  return files;
};

async function Page({ params: { documentId } }: Props) {
  const { userId } = auth();
  const files = await getFiles(documentId, userId!);
  return (
    <>
      <PageHeader label="Trash" isDocumentPage isHome={false} />
      {files.length === 0 ? (
        <Empty />
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Archived time</TableHead>
              <TableHead>File size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((folder) => (
              <TrashItem key={folder.id} item={folder} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default Page;
