'use client'
import Footer from '@/components/footer'
import Post from '@/components/post'
import Settings from '@/components/settings'
import { useStore } from '@/providers/store-provider'
import classnames from 'classnames'
import Head from 'next/head'

export default function Home() {
  const { images, selectedImage } = useStore()

  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-black p-12">
      <Head>
        <title>Instagram Framer</title>
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

          {images.length > 0 && <Settings key={selectedImage?.id} />}
        </div>
      </div>

      <Footer />
    </main>
  )
}
