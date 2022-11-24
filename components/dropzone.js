/* eslint-disable react/no-unescaped-entities */
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ onUpload }) {
  const onDrop = useCallback(async(acceptedFiles) => {
    const images = await Promise.all(
      acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onabort = () => reject()
          reader.onerror = () => reject()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      })
    )
    onUpload(images)
  }, [onUpload])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className='w-full h-full inline-flex justify-center items-center' {...getRootProps()}>
      <input {...getInputProps()} />
      <p className='text-center'>Drag 'n' drop some images here, or click to select files</p>
    </div>
  )
}