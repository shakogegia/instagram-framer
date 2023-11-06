'use client'
import Footer from '@/components/footer'
import Post from '@/components/post'
import Settings from '@/components/settings'
import { useSideBar } from '@/providers/sidebar-provider'
import { useStore } from '@/providers/store-provider'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import Head from 'next/head'

const seo = {
  title: 'Instagram Framer',
  description: 'Upload your images and get a ready-to-post Instagram post.',
  keywords: 'instagram, post, frame, image, upload',
  url: 'https://www.instagram-framer.app',
}

export default function Home() {
  const { images, selectedImage } = useStore()
  const { sideBar } = useSideBar()

  return (
    <motion.div
      animate={{
        scale: sideBar ? 0.8 : 1,
        opacity: sideBar ? 0.5 : 1,
      }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
    >
      <main className="flex flex-col min-h-screen bg-white dark:bg-black p-12">
        <Head>
          <title>Instagram Framer</title>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
        </Head>

        <div className="max-w-xl mx-auto w-full border-b dark:border-neutral-700 pb-8 mb-8">
          <div className="flex flex-col gap-2 mx-auto text-center">
            <h1 className="font-fsp text-3xl font-light">Instagram Framer</h1>
            <div>
              <p className="text-sm font-semibold">
                Upload your images and get a ready-to-post Instagram post.
              </p>
              <p className="text-xs font-normal">
                No images are stored on our servers.
              </p>
            </div>
          </div>
        </div>

        <div className={classnames('container flex justify-center mx-auto')}>
          <div className="flex gap-8 divide-x dark:divide-neutral-700">
            <Post />

            {images.length > 0 && (
              <div className="hidden md:block">
                <Settings key={selectedImage?.id} />
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </motion.div>
  )
}
