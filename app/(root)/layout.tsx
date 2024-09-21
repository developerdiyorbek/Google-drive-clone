import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import { ChildProps } from "@/types";

function Layout({ children }: ChildProps) {
  return (
    <main>
      <Navbar />
      <Sidebar />
      <section>{children}</section>
    </main>
  );
}

export default Layout;
