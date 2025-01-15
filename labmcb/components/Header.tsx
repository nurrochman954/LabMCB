'use client'

import React from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
 const { user } = useUser();

 return (
   <header className="bg-primary text-white h-[40px]">
     <div className="flex items-center justify-between h-full">
       {/* Navigasi Kiri */}
       <div></div>

       {/* Navigasi Kanan */}
       {user ? (
         <div className="flex items-center gap-3 h-full">
           <UserButton 
             afterSignOutUrl="/sign-in"
             userProfileMode="modal"
             showName={true}
             appearance={{
               elements: {
                 userButtonBox: "flex items-center gap-2 hover:opacity-80 h-full",
                 userButtonOuterIdentifier: "text-sm font-medium text-white",
                 userButtonPopoverCard: "text-zinc-900",
                 userButtonAvatarBox: "w-8 h-8"
               }
             }}
             userProfileProps={{
               appearance: {
                 variables: {
                   colorPrimary: '#00AFB9',
                   colorText: '#18181B',
                   colorTextSecondary: '#52525B',
                   colorBackground: 'white',
                   colorDanger: '#EF4444',
                   fontFamily: 'inherit',
                 },
                 elements: {
                   rootBox: "w-full",
                   card: "rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/20 backdrop-blur-md",
                   avatarBox: "ring-2 ring-[#00AFB9] ring-offset-2"
                 }
               }
             }}
           />
         </div>
       ) : (
         <Link 
           href="/sign-in" 
           className="font-semibold bg-primary text-white px-4 py-2 hover:bg-secondary h-full flex items-center"
         >
           Masuk
         </Link>
       )}
     </div>
   </header>
 );
};

export default Header;