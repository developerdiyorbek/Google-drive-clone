import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "../ui/button";
import { HelpCircle, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import UserBox from "./UserBox";

function Navbar() {
  const { userId } = auth();
  return (
    <header className="h-[10vh] fixed inset-0 z-30 bg-[#F6F9FC] dark:bg-[#1F1F1F]">
      <div className="flex items-center justify-between my-4 mx-6">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image
              src="/googleDriveIcon.png"
              alt="logo"
              width={40}
              height={40}
            />
            <span className="pl-2 text-xl opacity-75">Drive</span>
          </div>
        </Link>

        <div className="flex items-center gap-x-2">
          <ModeToggle />
          <Button variant={"ghost"} size={"icon"}>
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Settings className="w-5 h-5" />
          </Button>
          {userId && <UserBox />}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
