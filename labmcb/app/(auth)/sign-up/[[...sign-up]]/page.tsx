'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'

export default function SignUpPage() {
  return (
    <div 
      className="flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: 'url(/assets/borobudur.svg)' }}
    >
      {/* Background overlay */} 
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Main content */}
      <div className="relative">
        <SignUp.Root>
          <SignUp.Step
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
                Buat Akun Lab MCB
              </h1>
            </header>

            <Clerk.GlobalError className="block text-sm font-medium text-red-500" />

            <div className="space-y-4">
              <Clerk.Field name="firstName" className="space-y-2">
                <Clerk.Label className="text-sm font-semibold text-zinc-950">
                  Nama Depan
                </Clerk.Label>
                <Clerk.Input 
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                />
                <Clerk.FieldError className="block text-sm font-medium text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="lastName" className="space-y-2">
                <Clerk.Label className="text-sm font-semibold text-zinc-950">
                  Nama Belakang
                </Clerk.Label>
                <Clerk.Input 
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                />
                <Clerk.FieldError className="block text-sm font-medium text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="username" className="space-y-2">
                <Clerk.Label className="text-sm font-semibold text-zinc-950">
                  Username
                </Clerk.Label>
                <Clerk.Input 
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                />
                <Clerk.FieldError className="block text-sm font-medium text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="emailAddress" className="space-y-2">
                <Clerk.Label className="text-sm font-semibold text-zinc-950">
                  Alamat Email
                </Clerk.Label>
                <Clerk.Input 
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                />
                <Clerk.FieldError className="block text-sm font-medium text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="password" className="space-y-2">
                <Clerk.Label className="text-sm font-semibold text-zinc-950">
                  Password
                </Clerk.Label>
                <Clerk.Input 
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                  type="password"
                />
                <Clerk.FieldError className="block text-sm font-medium text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="passwordConfirm" className="space-y-2">
                <Clerk.Label className="text-sm font-semibold text-zinc-950">
                  Konfirmasi Password
                </Clerk.Label>
                <Clerk.Input 
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                  type="password"
                />
                <Clerk.FieldError className="block text-sm font-medium text-red-500" />
              </Clerk.Field>
            </div>

            <SignUp.Action
              submit
              className="w-full rounded-md bg-[#00AFB9] px-3.5 py-1.5 text-center text-sm font-semibold text-white shadow outline-none hover:bg-[#0089AA] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#00AFB9] active:text-white/70"
            >
              Daftar Sekarang
            </SignUp.Action>

            <p className="text-center text-sm font-medium text-zinc-600">
              Sudah punya akun?{' '}
              <Clerk.Link
                navigate="sign-in"
                className="font-semibold text-[#00AFB9] decoration-[#00AFB9]/20 underline-offset-4 outline-none hover:text-[#0089AA] hover:underline focus-visible:underline"
              >
                Masuk
              </Clerk.Link>
            </p>
          </SignUp.Step>

          <SignUp.Step 
            name="verifications"
            className="w-full space-y-6 rounded-2xl bg-white/95 bg-gradient-to-br from-white via-white to-[#00AFB9]/5 px-4 py-10 shadow-xl ring-1 ring-black/20 backdrop-blur-md sm:w-96 sm:px-8"
          >
            <SignUp.Strategy name="email_code">
              <header className="text-center">
                <img 
                  src="/assets/kembud.png" 
                  alt="Lab MCB Logo" 
                  className="mx-auto size-20"
                />
                <h1 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950">
                  Verifikasi Email
                </h1>
                <p className="mt-2 text-sm text-zinc-600">
                  Silakan cek email Anda untuk kode verifikasi
                </p>
              </header>

              <Clerk.Field name="code" className="space-y-2">
                <Clerk.Label className="text-sm font-semibold text-zinc-950">
                  Kode Verifikasi
                </Clerk.Label>
                <Clerk.Input 
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm font-medium outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                />
                <Clerk.FieldError className="block text-sm font-medium text-red-500" />
              </Clerk.Field>

              <SignUp.Action
                submit
                className="w-full rounded-md bg-[#00AFB9] px-3.5 py-1.5 text-center text-sm font-semibold text-white shadow outline-none hover:bg-[#0089AA] focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-[#00AFB9] active:text-white/70"
              >
                Verifikasi Email
              </SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
        </SignUp.Root>
      </div>
    </div>
  )
}