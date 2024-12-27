"use client";

import { SharedPostProvider } from "@/context/SharedPostContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SharedPostProvider>{children}</SharedPostProvider>;
}
