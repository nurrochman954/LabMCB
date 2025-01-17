// app/(root)/page.tsx
import { currentUser } from '@clerk/nextjs/server'
import { syncUserWithDB } from '@/lib/auth'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TopBar from "@/components/TopBar"
import Hero from "@/components/Hero"
import TentangKami from "@/components/TentangKami"
import PendaftaranAnalisis from "@/components/PendaftaranAnalisis"
import PenyewaanAlat from "@/components/PenyewaanAlat"
import Berita from "@/components/Berita"

export default async function HomePage() {
  // Get Clerk user & sync ke database
  const user = await currentUser()
  if (user) {
    const dbUser = await syncUserWithDB()
    if (!dbUser) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          Error syncing user
        </div>
      )
    }
  }

  const slides = [
    { src: "/assets/berita1.jpg" },
    { src: "/assets/berita2.jpg" },
    { src: "/assets/berita3.jpeg"},
  ];

  // Komponen harus dibungkus dalam elemen root
  return (
    <main>
      <Header />
      <TopBar />
      <Hero />
      <Berita slides={slides}/>
      <PendaftaranAnalisis />
      <PenyewaanAlat />
      <TentangKami />
      <Footer />
    </main>
  );
}