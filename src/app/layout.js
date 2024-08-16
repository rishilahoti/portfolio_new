import "./globals.css"
import Header from '../components/Header';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata = {
  title: "Rishi Lahoti",
  description: "developed by rishi",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="P2_1zWxkE0R-QmgUGw4dGpmHqVlIO0X-SaoFDdH-ciM" />
      </head>
      <body >
        <Header />
        <SpeedInsights/>
        <Analytics/>
        {children}
      </body>
    </html>
  )
}