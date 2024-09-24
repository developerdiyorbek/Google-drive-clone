"use client";

import { useSubscription } from "@/hooks/useSubscription";
import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import PageHeader from "../_components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dark, shadesOfPurple } from "@clerk/themes";

function Page() {
  const { subscription } = useSubscription();
  const { resolvedTheme } = useTheme();
  return (
    <>
      <PageHeader label="Profile" />
      <Tabs defaultValue="account" className="w-[400px] mt-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="subscription">Manage</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UserProfile
            routing="hash"
            appearance={{
              baseTheme: resolvedTheme === "dark" ? dark : shadesOfPurple,
            }}
          />
        </TabsContent>
        <TabsContent value="subscription">
          <div className="flex space-x-4">
            <div className="border rounded-xl p-4 w-80">
              <p className="text-lg font-bold">Current plan</p>
              <div className="mt-4">
                <div className="flex items-center border-b justify-between pb-2">
                  <p className="opacity-75">Plan: </p>
                  <p>{subscription}</p>
                </div>
                <div className="flex items-center border-b justify-between pb-2 my-1">
                  <p className="opacity-75">Price: </p>
                  <p>{subscription === "Basic" ? "$0" : "$10"}</p>
                </div>
                <div className="flex items-center border-b justify-between pb-2 my-1">
                  <p className="opacity-75">Storage: </p>
                  <p>{subscription === "Basic" ? "1.5 GB" : "15 GB"}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Page;
