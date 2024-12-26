import { SharedPostProvider } from "@/context/SharedPostContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="h-[100%] bg-gradient-to-tr from-rose-100 to-teal-100 z-20">
        <SharedPostProvider>{children}</SharedPostProvider>
      </div>
  );
}
