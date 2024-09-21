"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function ModeToggle() {
  const [mount, setMount] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMount(true), []);

  return mount && resolvedTheme === "dark" ? (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={() => setTheme("light")}
      aria-label="mode-toggle-to-light"
    >
      <Sun size={22} />
    </Button>
  ) : (
    <Button
      size={"icon"}
      onClick={() => setTheme("dark")}
      variant={"ghost"}
      aria-label="mode-toggle-to-dark"
    >
      <Moon size={22} />
    </Button>
  );
}

export default ModeToggle;
