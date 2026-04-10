// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./nav"; 
import SessionProvider from "@/app/components/SessionProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Profile App",
  description: "Purdue Profile Application",
  openGraph: {
    title: "Profile App",
    description: "Purdue Profile Application",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
        <Nav />
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}