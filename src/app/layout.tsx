import { Header } from './Header'
import { Footer } from './Footer'
import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        <>
          <Header />
          <main className="py-8">{children}</main>
          <Footer />
        </>
      </body>
    </html>
  )
}