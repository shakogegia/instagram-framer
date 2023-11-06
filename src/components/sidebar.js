'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useSideBar } from '@/providers/sidebar-provider'
import Settings from './settings'
import { useStore } from '@/providers/store-provider'

export function Sidebar() {
  const { sideBar, setSideBar } = useSideBar()
  const { images, selectedImage } = useStore()
  return (
    <AnimatePresence>
      {sideBar && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
            onClick={() => setSideBar((sideBar) => !sideBar)}
            className="bg-transparent px-5 fixed h-full w-full flex items-center justify-center top-0 left-0"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{
              x: 0,
            }}
            exit={{
              x: '100%',
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed bg-white dark:bg-black shadow-lg top-0 right-0 w-full max-w-sm h-screen p-5"
          >
            {images.length > 0 && <Settings key={selectedImage?.id} />}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
