import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import PageHeader from "../../_components/PageHeader";
import { db } from "@/lib/firebase";
import { IFolderAndFile } from "@/types";
import Empty from "@/components/shared/Empty";
import SuggestCard from "../../_components/SuggestCard";

interface Props {
  params: { documentId: string };
}

const getFolder = async (folderId: string) => {
  const docRef = doc(db, "folders", folderId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

const getFiles = async (folderId: string, uid: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files: any[] = [];
  const q = query(
    collection(db, "folders", folderId, "files"),
    where("uid", "==", uid),
    where("isArchive", "==", false)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    files.push({ ...doc.data(), id: doc.id });
  });

  return files;
};

async function Page({ params: { documentId } }: Props) {
  const folder = (await getFolder(documentId)) as IFolderAndFile;
  const files = await getFiles(documentId, folder.uid);
  return (
    <>
      <PageHeader label={folder.name} isHome isDocument />
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
