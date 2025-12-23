import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 md:px-10 lg:px-16 py-10 max-w-[1600px] mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
