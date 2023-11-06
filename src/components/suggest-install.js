import React from 'react'
import { IoShareOutline } from 'react-icons/io5'

export default function SuggestInstall({ title = 'Instagram Framer' }) {
  return (
    <div className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
      <div className="container px-6 py-2 max-w-3xl mx-auto font-light">
        <span>
          Install <strong className="font-extrabold">{title}</strong> on your
          home Screen: Tap the
        </span>{' '}
        <IoShareOutline className="mx-1 w-5 h-5 text-blue-500 inline" />{' '}
        <span>icon and then</span>{' '}
        <span className="ml-1 font-bold">Add to Home Screen</span>.
      </div>
    </div>
  )
}
