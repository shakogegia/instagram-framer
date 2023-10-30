'use client'
import { useImages } from '@/providers/images-provider'
import { useEffect, useRef } from 'react'
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'
import classnames from 'classnames'
import Preview from './preview'

export default function Carousel() {
  const imageRefs = useRef([])

  const {
    images,
    selectPrevImage,
    selectNextImage,
    selectImage,
    selectedIndex,
  } = useImages()

  const canSelectPrevImage = images.length > 1 && selectedIndex > 0
  const canSelectNextImage =
    images.length > 1 && selectedIndex < images.length - 1

  useEffect(() => {
    imageRefs.current[selectedIndex].scrollIntoView({
      behavior: 'smooth',
    })
  }, [selectedIndex])

  return (
    <div className="h-full relative group">
      <div className="w-full h-full flex overflow-hidden">
        {images.map((item) => (
          <Preview
            ref={(el) => imageRefs.current.push(el)}
            key={item.id}
            image={item}
          />
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((item, index) => (
            <button
              key={item.id}
              className={classnames(
                'w-2 h-2 rounded-full bg-white border',
                index !== selectedIndex && 'bg-opacity-70',
              )}
              onClick={() => selectImage(index)}
            />
          ))}
        </div>
      )}

      {canSelectPrevImage && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            className="w-6 h-6 rounded-full flex justify-center items-center shadow-lg bg-white bg-opacity-90 opacity-50 transition-opacity group-hover:opacity-100"
            onClick={selectPrevImage}
          >
            <PiCaretLeftBold className="w-4 text-black" />
          </button>
        </div>
      )}

      {canSelectNextImage && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            className="w-6 h-6 rounded-full flex justify-center items-center shadow-lg bg-white bg-opacity-90 opacity-50 transition-opacity group-hover:opacity-100"
            onClick={selectNextImage}
          >
            <PiCaretRightBold className="w-4 text-black" />
          </button>
        </div>
      )}
    </div>
  )
}
