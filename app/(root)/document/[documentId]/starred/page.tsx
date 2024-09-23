import PageHeader from "@/app/(root)/_components/PageHeader";
import SuggestCard from "@/app/(root)/_components/SuggestCard";
import Empty from "@/components/shared/Empty";
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
    where("isArchive", "==", false),
    where("isStar", "==", true)
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
      <PageHeader label="Starred" isDocumentPage isHome={false} />
      {files.length === 0 ? (
        <Empty />
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {files.map((file) => (
            <SuggestCard item={file} key={file.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default Page;
