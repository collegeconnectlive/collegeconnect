// import { Providers } from "./providers"; // Import the providers wrapper

import { SharedPostProvider } from "@/context/SharedPostContext";

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-gradient-to-tr from-rose-100 to-teal-100">
   <SharedPostProvider>{children}</SharedPostProvider> 
    </div>
  );
}
