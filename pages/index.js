import Head from 'next/head';
import { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Button from "../components/button";
import Dropzone from "../components/dropzone";
import Preview from "../components/preview";
import Settings from "../components/settings";

export default function Home() {
  const [images, setImages] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)

  function onUpload(_images) {
    setImages(_images.map(image => ({
      id: id(10),
      padding: 50,
      ratio: "4:5",
      objectFit: "contain",
      image,
    })))
    setSelectedIndex(0)
  }

  function onSettingsChanged(image) {
    return function (settings) {
      setImages(images.map(_image => _image.id === image.id ? { ...image, ...settings } : _image))
    }
  }

  const canGoLeft = selectedIndex > 0
  const canGoRight = selectedIndex < images.length - 1

  function goLeft() {
    if (!canGoLeft) return
    setSelectedIndex(selectedIndex - 1)
  }

  function goRight() {
    if (!canGoRight) return
    setSelectedIndex(selectedIndex + 1)
  }

  const selectedImage = images[selectedIndex]

  return (
    <div>
      <Head>
        <title>Instagram Framer</title>
      </Head>
      <main className='container flex flex-col justify-center mx-auto p-16'>

        <div className='flex justify-center mt-20'>
          {images.length === 0 && (
            <div className='border-4 border-dashed w-[500px] h-[350px]'>
              <Dropzone onUpload={onUpload} />
            </div>
          )}

          {images.length > 0 && (
            <div className='flex items-center gap-4'>
              <Button disabled={!canGoLeft} onClick={goLeft}><BsArrowLeft /></Button>
              <p>{selectedIndex + 1}:{images.length}</p>
              <Button disabled={!canGoRight} onClick={goRight}><BsArrowRight /></Button>
            </div>
          )}
        </div>

        <div className='flex gap-20 mt-12'>
          {selectedImage && (
            <>
              <Preview
                image={selectedImage.image}
                id={selectedImage.id}
                padding={selectedImage.padding}
                ratio={selectedImage.ratio}
                objectFit={selectedImage.objectFit}
              />
              <Settings
                image={selectedImage.image}
                id={selectedImage.id}
                onChange={onSettingsChanged(selectedImage)}
              />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

function id(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
