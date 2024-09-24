import FolderModal from "@/components/modals/FolderModal";
import PlanModal from "@/components/modals/PlanModal";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { ChildProps } from "@/types";

function Layout({ children }: ChildProps) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="w-full min-h-[90vh] relative top-[10vh] pl-72 bg-[#F6F9FC] dark:bg-[#1F1F1F] p-4">
        <section className="h-[85vh] p-8 rounded-md bg-white dark:bg-black  ml-4">
          {children}
        </section>
      </main>

      <FolderModal />
      <PlanModal />
    </>
  );
}

export default Layout;
