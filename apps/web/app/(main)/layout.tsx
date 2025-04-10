import type React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-max min-h-screen w-full flex-col overflow-y-scroll">
      {children}
    </div>
  );
}
