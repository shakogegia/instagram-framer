/* eslint-disable @next/next/no-img-element */
'use client'
import { useImages } from '@/providers/images-provider'
import { forwardRef, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'

function Preview({ image }, ref) {
  const { images } = useImages()

  const imageRef = useRef(null)
  const containerRef = useRef(null)

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const [dragStartX, setDragStartX] = useState(null)
  const [dragStartY, setDragStartY] = useState(null)

  useEffect(() => {
    setX(0)
    setY(0)
  }, [image.scale])

  function onMouseMove(e) {
    console.log(
      '🚀 ~ file: preview.js:26 ~ onMouseMove ~ dragStartX:',
      dragStartX,
    )
    if (!dragStartX || !dragStartY) return

    const imageBounds = imageRef.current.getBoundingClientRect()
    const containerBounds = containerRef.current.getBoundingClientRect()

    requestAnimationFrame(() => {
      const newY = e.clientY - dragStartY
      const newX = e.clientX - dragStartX

      const canMoveBottom = imageBounds.y + newY < containerBounds.y
      const canMoveTop =
        imageBounds.y + newY + imageBounds.height >
        containerBounds.y + containerBounds.height
      if (canMoveBottom && canMoveTop) {
        setY(newY)
      }

      const canMoveRight = imageBounds.x + newX < containerBounds.x
      const canMoveLeft =
        imageBounds.x + newX + imageBounds.width >
        containerBounds.x + containerBounds.width

      if (canMoveRight && canMoveLeft) {
        setX(newX)
      }
    })
  }

  function onDragStart(e) {
    console.log('onDragStart')
    setDragStartX(e.clientX)
    setDragStartY(e.clientY)
  }

  function onDragStopped(e) {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onDragStopped)
  }

  function onMouseDown(e) {
    onDragStart(e)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onDragStopped)
  }

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onDragStopped)
    }
  }, [])

  return (
    <div
      id={`canvas-${image.id}`}
      className="min-w-full min-h-full flex justify-center"
      ref={ref}
      style={{
        background: image.bgColor,
        padding: `${image.padding}px`,
      }}
    >
      <div
        className={classnames(
          'flex justify-center items-center',
          'w-full h-full max-w-full max-h-full overflow-hidden relative transition-all',
        )}
        onMouseDown={onMouseDown}
        ref={containerRef}
        style={{}}
      >
        <img
          ref={imageRef}
          src={image.image}
          style={{
            border: `${image.border}px solid ${image.borderColor}`,
            transform: `translate(${x}px, ${y}px) rotate(${image.rotate}deg) scale(${image.scale}) scaleX(${image.scaleX}) scaleY(${image.scaleY})`,
            transformOrigin: 'center',
            objectFit: image.objectFit,
            width: image.objectFit === 'cover' ? '100%' : undefined,
            height: image.objectFit === 'cover' ? '100%' : undefined,
            maxWidth: image.objectFit === 'contain' ? '100%' : undefined,
            maxHeight: image.objectFit === 'contain' ? '100%' : undefined,
          }}
          alt="Instagram post preview"
        />
      </div>
    </div>
  )
}

export default forwardRef(Preview)
