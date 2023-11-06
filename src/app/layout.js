import { StoreProvider } from '@/providers/store-provider'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SideBarContext, SideBarProvider } from '@/providers/sidebar-provider'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/providers/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Instagram Framer',
  description: 'Upload your images and get a ready-to-post Instagram post.',
  keywords: 'instagram, post, frame, image, upload',
  image: '/meta.png',
  url: 'https://www.instagram-framer.app',
  manifest: '/manifest.webmanifest',
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
        <ThemeProvider>
          <SideBarProvider>
            <StoreProvider>
              {children}
              <Sidebar />
            </StoreProvider>
          </SideBarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
