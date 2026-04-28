import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Netflix Clone - Watch TV Shows Online, Watch Movies Online',
  description: 'Netflix clone built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-white min-h-screen font-sans antialiased overflow-x-hidden">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
