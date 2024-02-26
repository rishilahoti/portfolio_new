import "./globals.css"
import { Inter } from "next/font/google"
import Header from './components/Header';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rishi Lahoti",
  description: "developed by rishi",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}