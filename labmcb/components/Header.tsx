'use client'

import React from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
 const { user } = useUser();

 return (
   <header className="bg-primary text-white relative">
     <div className="flex items-center justify-between">
       {/* Navigasi Kiri */}
       <div></div>

       {/* Navigasi Kanan */}
       {user ? (
         <SignOutButton>
           <button className="font-semibold bg-red-500 text-white px-4 py-2 hover:bg-red-600">
             Keluar
           </button>
         </SignOutButton>
       ) : (
         <Link 
           href="/sign-in" 
           className="font-semibold bg-primary text-white px-4 py-2 hover:bg-secondary"
         >
           Masuk
         </Link>
       )}
     </div>
   </header>
 );
};

export default Header;