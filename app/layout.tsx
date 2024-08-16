import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "./_components/partials";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Shoplexify",
  description: "Online Shop Application made using Next.js and Prisma ORM by Matthew Adrianus Mulyono",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-stretch min-h-screen">
        <Providers>{children}</Providers> 
        <Footer/>
      </body>
    </html>
  );
}
