"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UserBox() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={`${user?.imageUrl}`} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>

          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>

            <div className="space-y-1">
              <p className="text-sm line-clamp-1">{user?.fullName}</p>
            </div>
          </div>
        </div>

        <div>
          <Link href={"/settings"}>
            <DropdownMenuItem
              asChild
              className="w-full cursor-pointer text-muted-foreground"
            >
              <div role="button">Account</div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            asChild
            className="w-full cursor-pointer text-muted-foreground"
            onClick={() => signOut(() => router.push("/sign-in"))}
          >
            <div role="button">Log out</div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserBox;
