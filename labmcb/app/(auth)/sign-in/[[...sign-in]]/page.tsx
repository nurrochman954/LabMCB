'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'

export default function SignInPage() {
 return (
   <div 
     className="flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
     style={{ backgroundImage: 'url(/assets/borobudur.svg)' }}
   >
     {/* Overlay gelap */}
     <div className="absolute inset-0 bg-black bg-opacity-50" />

     {/* Content */}
     <div className="relative"> {/* relative agar berada di atas overlay */}
       <SignIn.Root>
         <SignIn.Step 
           name="start" 
           className="w-full space-y-6 rounded-2xl bg-white/95 bg-gradient-to-br from-white via-white to-[#00AFB9]/5 px-4 py-10 shadow-xl ring-1 ring-black/20 backdrop-blur-md sm:w-96 sm:px-8"
         >
           <header className="text-center">
             <img 
               src="/assets/kembud.png" 
               alt="Lab MCB Logo" 
               className="mx-auto size-20" 
             />
             <h1 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950">
               Masuk ke Lab MCB
             </h1>
           </header>
           
           <Clerk.GlobalError className="block text-sm font-medium text-red-500" />
           
           <div className="space-y-4">
             <Clerk.Field name="identifier" className="space-y-2">
               <Clerk.Label className="text-sm font-semibold text-zinc-950">
                 Username
               </Clerk.Label>
               <Clerk.Input 
                 type="text" 
                 required 
                 className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400" 
               />
               <Clerk.FieldError className="block text-sm font-medium text-red-500" />
             </Clerk.Field>
             
             <Clerk.Field name="password" className="space-y-2">
               <Clerk.Label className="text-sm font-semibold text-zinc-950">
                 Password
               </Clerk.Label>
               <Clerk.Input 
                 type="password" 
                 required 
                 className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400" 
               />
               <Clerk.FieldError className="block text-sm font-medium text-red-500" />
             </Clerk.Field>
           </div>
           
           <SignIn.Action 
             submit 
             className="w-full rounded-md bg-[#00AFB9] px-3.5 py-1.5 text-center text-sm font-semibold text-white shadow outline-none hover:bg-[#0089AA] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#00AFB9] active:text-white/70"
           >
             Masuk
           </SignIn.Action>
           
           <p className="text-center text-sm font-medium text-zinc-600">
             Belum punya akun?{' '}
             <Clerk.Link 
               navigate="sign-up" 
               className="font-semibold text-[#00AFB9] decoration-[#00AFB9]/20 underline-offset-4 outline-none hover:text-[#0089AA] hover:underline focus-visible:underline"
             >
               Buat akun
             </Clerk.Link>
           </p>
         </SignIn.Step>
       </SignIn.Root>
     </div>
   </div>
 )
}