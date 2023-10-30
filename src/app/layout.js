import { Inter } from 'next/font/google'
import './globals.css'
import { ImagesProvider } from '@/providers/images-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Instagram Framer',
  description: 'Upload your images and get a ready-to-post Instagram post.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ImagesProvider>{children}</ImagesProvider>
      </body>
    </html>
  )
}
