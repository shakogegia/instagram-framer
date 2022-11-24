/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useMemo } from 'react';
import classNames from "../utils/class-names";

const width = 1080 / 2

export default function Preview({ id, image, padding = 50, ratio = "4:5", objectFit = "contain" }) {
  const imageSize = useMemo(() => {
    if (ratio === "1:1") return [width, width]
    if (ratio === "4:5") return [width, width * 5 / 4]
    if (ratio === "16:9") return [width, width * 9 / 16]
  }, [ratio])

  return (
    <div className='border-dashed border-2 inline-flex'>
      <div
        id={id}
        className={classNames('bg-white')}
        style={{
          padding: `${padding}px`,
          width: `${imageSize[0]}px`,
          height: `${imageSize[1]}px`,
        }}
      >
        <img
          src={image}
          alt=""
          className={classNames(
            "w-full h-full",
            objectFit === "contain" && "object-contain",
            objectFit === "cover" && "object-cover"
          )}
        />
      </div>
    </div>
  )
}
