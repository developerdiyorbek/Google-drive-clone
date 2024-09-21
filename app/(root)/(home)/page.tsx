import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

function Page() {
  return (
    <section>
      <Button>Salom</Button>
      <UserButton />
    </section>
  );
}

export default Page;
