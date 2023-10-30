'use client'
import Carousel from '@/components/carousel'
import Dropzone from '@/components/dropzone'
import Settings from '@/components/settings'
import { useImages } from '@/providers/images-provider'
import download from '@/utils/download'
import classnames from 'classnames'
import Head from 'next/head'
import {
  LuBookmark,
  LuHeart,
  LuMessageCircle,
  LuMoreHorizontal,
  LuSend,
} from 'react-icons/lu'

export default function Home() {
  const { images, selectedImage } = useImages()

  return (
    <main className="flex flex-col min-h-screen bg-white p-12">
      <Head>
        <title>Instagram Framer</title>
      </Head>

      <div className="max-w-xl mx-auto w-full border-b pb-8 mb-8">
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
        <div className="flex gap-8 divide-x">
          <div className="flex flex-col gap-3 max-w-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <div className="w-10 h-10 rounded-full bg-instagram p-0.5">
                    <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={'/images/aghan_girl.jpeg'}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">Awesome Photographer</p>
                  <p className="text-xs font-normal">Shot on film</p>
                </div>
              </div>
              <div>
                <LuMoreHorizontal className="w-6 h-6" />
              </div>
            </div>
            <div
              className={classnames(
                'w-[512px] rounded overflow-hidden',
                'border',
                !selectedImage?.ratio && 'h-[512px]',
                selectedImage?.ratio === '1:1' && 'h-[512px]',
                selectedImage?.ratio === '4:5' && 'h-[640px]',
                selectedImage?.ratio === '16:9' && 'h-[288px]',
              )}
            >
              {images.length > 0 ? <Carousel /> : <Dropzone />}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <LuHeart className="w-6 h-6" />
                <LuMessageCircle className="w-6 h-6 -scale-x-[1]" />
                <LuSend className="w-6 h-6" />
              </div>
              <div>
                <LuBookmark
                  className="w-6 h-6"
                  onClick={() => download(selectedImage)}
                />
              </div>
            </div>
            <p className="text-sm font-semibold">923 Likes</p>
            <p className="text-sm">
              <span className="font-semibold mr-2">awesome_photographer</span>
              <span>
                I want to share this photo I created with you all. I hope you
                like it! 🏝️ 🌈
              </span>
              <span className="text-[#01376b] block mt-2">
                #film #filmphotography #filmisnotdead #analog #analogphotography
                #istillshootfilm #grainisgood
              </span>
            </p>
          </div>

          {images.length > 0 && <Settings key={selectedImage?.id} />}
        </div>
      </div>

      <footer className="flex flex-col items-center gap-2 text-xs font-normal text-neutral-300 text-center mt-10">
        <p>© 2023 Instagram Framer</p>
        <p>
          If you like this tool, please consider buying me a film. <br /> It
          will help me to keep this tool up and running.
        </p>
        <a
          href="https://ko-fi.com/V7V8DOK22"
          target="_blank"
          rel="noreferrer"
          className="mt-2"
        >
          <img
            height="36"
            style={{ border: '0px', height: '36px' }}
            src="https://storage.ko-fi.com/cdn/kofi5.png?v=3"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </footer>
    </main>
  )
}
