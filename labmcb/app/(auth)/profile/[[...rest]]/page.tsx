'use client'

import { UserProfile } from "@clerk/nextjs";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <div 
      className="flex min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/assets/borobudur.svg)' }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative w-full max-w-4xl mx-auto py-10 px-4">
        {/* Tombol Kembali - posisi diubah ke top-4 */}
        <Link 
          href="/" 
          className="absolute left-6 top-0 inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Kembali
        </Link>

        <UserProfile 
          path="/profile"
          routing="path"
          appearance={{
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
              card: "rounded-2xl bg-white/95 bg-gradient-to-br from-white via-white to-[#00AFB9]/5 shadow-xl ring-1 ring-black/20 backdrop-blur-md",
              navbar: "border-b border-zinc-200",
              navbarButton: "text-sm font-medium text-zinc-600 hover:text-zinc-950",
              headerTitle: "text-base font-semibold tracking-tight text-zinc-950",
              headerSubtitle: "text-sm text-zinc-600",
              
              // Form elements
              formButtonPrimary: 
                "rounded-md bg-[#00AFB9] px-3.5 py-1.5 text-center text-sm font-semibold text-white shadow outline-none hover:bg-[#0089AA] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#00AFB9] active:text-white/70",
              formButtonReset: "text-sm font-medium text-red-500 hover:text-red-600",
              formFieldLabel: "text-sm font-semibold text-zinc-950",
              formFieldInput: 
                "w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950",
              formFieldError: "text-sm font-medium text-red-500",
              
              // Profile sections
              profileSectionTitleText: "text-sm font-semibold text-zinc-950",
              profileSectionContent: "space-y-3",
              profileSectionPrimaryButton: 
                "rounded-md bg-[#00AFB9] px-3.5 py-1.5 text-center text-sm font-semibold text-white shadow outline-none hover:bg-[#0089AA] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#00AFB9]",
              profileSectionDangerButton:
                "rounded-md bg-red-500 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none hover:bg-red-600",
              
              // Page specific
              pageScrollBox: "space-y-4",
              page: "space-y-4 p-4",
              
              // Avatar
              avatarBox: "ring-2 ring-[#00AFB9] ring-offset-2",
              
              // Alert & messages
              alert: "rounded-lg bg-red-50 p-3 text-red-500",
              alertText: "text-sm",
              
              // Tables & lists
              tableHeader: "text-sm font-medium text-zinc-600",
              tableCell: "text-sm text-zinc-950",
              
              // Dividers & misc
              dividerLine: "border-zinc-200",
              dividerText: "text-sm text-zinc-600 bg-white px-2",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePage;