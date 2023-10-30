'use client'
import { v4 as uuidv4 } from 'uuid'
import { createContext, useContext, useMemo, useState } from 'react'

const defaultSettings = {
  padding: 50,
  border: 2,
  borderColor: '#000000',
  ratio: '4:5',
  objectFit: 'contain',
  bgColor: '#ffffff',
  rotate: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
}

const ImagesContext = createContext([])

export const useImages = () => useContext(ImagesContext)

export const ImagesProvider = ({ children }) => {
  const [store, setStore] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedImage = useMemo(
    () => store[selectedIndex],
    [store, selectedIndex],
  )

  function selectPrevImage() {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? store.length - 1 : prevIndex - 1,
    )
  }

  function selectNextImage() {
    setSelectedIndex((prevIndex) =>
      prevIndex === store.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const updateImage = (id, key, value) => {
    const newStore = store.map((image) => {
      if (image.id === id) {
        return {
          ...image,
          [key]: value,
        }
      }
      return image
    })
    setStore(newStore)
  }

  const setImages = (images) => {
    setStore(
      images.map((image) => ({
        id: uuidv4(),
        ...defaultSettings,
        image,
      })),
    )
  }

  const selectImage = (index) => {
    setSelectedIndex(index)
  }

  const contextValue = {
    images: store,
    updateImage,
    setImages,
    selectedIndex,
    selectedImage,
    selectPrevImage,
    selectNextImage,
    selectImage,
  }

  return (
    <ImagesContext.Provider value={contextValue}>
      {children}
    </ImagesContext.Provider>
  )
}