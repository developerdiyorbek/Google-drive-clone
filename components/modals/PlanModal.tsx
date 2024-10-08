"use client";

import { usePlan } from "@/hooks/usePlan";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import Image from "next/image";
import PlanCard from "../shared/PlanCard";

function PlanModal() {
  const { isOpen, onClose } = usePlan();
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <Image src={"/one.svg"} alt="one" width={50} height={50} />
        </DialogHeader>
        <div className="opacity-75 text-center">
          Choose the Google One plan that is right for you
        </div>
        <div className="grid grid-cols-2 gap-4">
          {planArray.map((plan) => (
            <PlanCard
              key={plan.name}
              name={plan.name}
              description={plan.description}
              options={plan.options}
              price={plan.price}
              priceId={plan.priceId}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlanModal;

const planArray = [
  {
    name: "Basic",
    description: "1.5 GB",
    price: "Free",
    options: "15 GB of storage",
  },
  {
    name: "Pro",
    description: "15 GB",
    price: "10",
    options:
      "100 GB of storage, Access to Google experts,  Share with up to 5 others, Extra member benefits, More Google Photos editing features",
    priceId: "price_1Q2XXUCxdU237iGOG1HyxHgk",
  },
];
