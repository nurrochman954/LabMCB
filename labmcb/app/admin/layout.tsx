import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "../globals.css";

const geistSans = Geist({
 variable: "--font-geist-sans", 
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Lab MCB",
 description: "Laboratorium Material Cagar Budaya",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
   <ClerkProvider>
     <html lang="id">
       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         {children}
       </body>
     </html>
   </ClerkProvider>
 );
}