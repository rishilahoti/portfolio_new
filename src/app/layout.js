import "./globals.css"
import { Inter } from "next/font/google"
import Header from '../components/Header';
import { Head } from "next/document";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Rishi Lahoti",
  description: "developed by rishi",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-site-verification" content="P2_1zWxkE0R-QmgUGw4dGpmHqVlIO0X-SaoFDdH-ciM" />
      </Head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}