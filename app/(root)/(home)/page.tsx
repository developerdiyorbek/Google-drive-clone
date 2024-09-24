import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import PageHeader from "../_components/PageHeader";
import Lists from "../_components/Lists";

const getData = async (uid: string, type: "files" | "folders") => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    where("isDocument", "==", false)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

async function Page() {
  const { userId } = auth();
  const folders = await getData(userId!, "folders");
  const files = await getData(userId!, "files");

  return (
    <>
      <PageHeader label="My drive" isHome />
      <Lists
        folders={JSON.parse(JSON.stringify(folders))}
        files={JSON.parse(JSON.stringify(files))}
      />
    </>
  );
}

export default Page;
