import { Inter } from 'next/font/google'
import './globals.css'
import { ImagesProvider } from '@/providers/images-provider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Instagram Framer',
  description: 'Upload your images and get a ready-to-post Instagram post.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YF91R7D90K"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-1KJJ787RMR');
            `}
        </Script>
        <ImagesProvider>{children}</ImagesProvider>
      </body>
    </html>
  )
}
