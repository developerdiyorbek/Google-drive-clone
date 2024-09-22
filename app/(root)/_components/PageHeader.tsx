"use client";

import PopoverInner from "@/components/shared/PopoverInner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLayout } from "@/hooks/useLayout";
import { ChevronDown, LayoutPanelTop, TableProperties } from "lucide-react";

interface Props {
  label: string;
  isHome?: boolean;
}

function PageHeader({ label, isHome }: Props) {
  const { setLayout, layout } = useLayout();
  return (
    <div className="w-full flex items-center justify-between">
      {isHome ? (
        <Popover>
          <PopoverTrigger>
            <div className="px-4 py-2 hover:bg-secondary transition rounded-full flex items-center space-x-2">
              <h2 className="text-xl">{label}</h2>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className="px-0 py-2">
            <PopoverInner />
          </PopoverContent>
        </Popover>
      ) : (
        <div className="text-xl">{label}</div>
      )}

      {isHome && (
        <div className="flex items-center space-x-2">
          {layout === "list" ? (
            <div
              role="button"
              onClick={() => setLayout("grid")}
              className="p-2 hover:bg-secondary rounded-full transition"
            >
              <TableProperties className="w-5 h-5" />
            </div>
          ) : (
            <div
              role="button"
              onClick={() => setLayout("list")}
              className="p-2 hover:bg-secondary rounded-full transition"
            >
              <LayoutPanelTop className="w-5 h-5" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
