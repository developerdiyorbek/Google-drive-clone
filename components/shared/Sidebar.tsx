"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import LinkItem from "./LinkItem";
import { Progress } from "../ui/progress";

function Sidebar() {
  return (
    <aside className="h-[90vh] fixed w-72 top-[10vh] left-0 z-30 bg-[#F6F9FC] dark:bg-[#1F1F1F]">
      <div className="flex flex-col p-3">
        <Button className="w-fit h-12 rounded-full px-6">
          <Plus />
          <span>New</span>
        </Button>

        <div className="flex flex-col space-y-6 mt-8">
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <LinkItem icon={link.icon} label={link.label} path={link.path} />
            </Link>
          ))}
          <div className="flex flex-col space-y-2 mx-4">
            <Progress className="h-2" value={30} />
            <span>20MB of 1.5GB used</span>

            <Button className="rounded-full" variant={"outline"}>
              Get more storage
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
