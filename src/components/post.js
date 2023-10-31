'use client'
import Carousel from '@/components/carousel'
import Dropzone from '@/components/dropzone'
import { useStore } from '@/providers/store-provider'
import { download } from '@/utils/download'
import classnames from 'classnames'
import {
  LuBookmark,
  LuHeart,
  LuMessageCircle,
  LuMoreHorizontal,
  LuSend,
} from 'react-icons/lu'
import Label from './label'
import { useState } from 'react'

const width = {
  xs: 320,
  sm: 384,
  md: 448,
  lg: 512,
}

export default function Post() {
  const { images, selectedImage } = useStore()
  const [isDownloading, setIsDownloading] = useState(false)

  const onDownload = () => {
    if (selectedImage) {
      setIsDownloading(true)
      download(selectedImage).finally(() => {
        setIsDownloading(false)
      })
    }
  }

  return (
    <div className="flex flex-col gap-3 max-w-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <div className="w-10 h-10 rounded-full bg-instagram p-0.5">
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={'/images/aghan_girl.jpeg'}
                  alt="Avatar"
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
          'rounded overflow-hidden',
          'border dark:border-neutral-700 transition-all',
          'w-[512px] rounded overflow-hidden',
          'border dark:border-neutral-700 transition-all',
          !selectedImage?.ratio && 'h-[512px]',
          selectedImage?.ratio === '1:1' && 'h-[512px]',
          selectedImage?.ratio === '4:5' && 'h-[640px]',
          selectedImage?.ratio === '16:9' && 'h-[288px]',
          selectedImage?.ratio === '2:3' && 'h-[768px]',
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
        <div
          className={classnames(
            'flex items-center gap-2',
            !!selectedImage && 'cursor-pointer',
          )}
          onClick={onDownload}
        >
          {!!selectedImage && (
            <Label className={classnames(!!selectedImage && 'cursor-pointer')}>
              {isDownloading ? 'Downloading...' : 'Download'}
            </Label>
          )}
          <LuBookmark className="w-6 h-6" />
        </div>
      </div>
      <p className="text-sm font-semibold">923 Likes</p>
      <p className="text-sm">
        <span className="font-semibold mr-2">awesome_photographer</span>
        <span>
          I want to share this photo I created with you all. I hope you like it!
          🏝️ 🌈
        </span>
        <span className="text-[#01376b] dark:text-neutral-50 block mt-2">
          #film #filmphotography #filmisnotdead #analog #analogphotography
          #istillshootfilm #grainisgood
        </span>
      </p>
    </div>
  )
}
