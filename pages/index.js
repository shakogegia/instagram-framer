/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { useCallback, useMemo, useState } from 'react'
import * as htmlToImage from 'html-to-image';
import { useDropzone } from 'react-dropzone'
import classNames from "../utils/class-names";
import { BsCloudDownload } from "react-icons/bs";
import Head from 'next/head';

const width = 1080/2

export default function Home() {
  const [image, setImage] = useState(null)
  const [padding, setPadding] = useState(10)
  const [ratio, setRatio] = useState("1:1")
  const [objectFit, setObjectFit] = useState("contain")

  const imageSize = useMemo(() => {
    if (ratio === "1:1") return [width, width]
    if (ratio === "4:5") return [width, width*5/4]
    if (ratio === "16:9") return [width, width*9/16]
  }, [ratio])

  function onUpload(img) {
    setImage(img)
  }

  function download() {
    var node = document.getElementById('preview');

    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "filename";
        link.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  return (
    <div>
      <Head>
        <title>Instagram Framer</title>
      </Head>
      <main className='container flex justify-center mx-auto p-16'>
        <div className='flex gap-20 mt-40'>
          <div>
            <div className='border-dashed border-2 inline-flex'>
              <div
                id='preview'
                className={classNames('bg-white')}
                style={{
                  padding: `${padding}px`,
                  width: `${imageSize[0]}px`,
                  height: `${imageSize[1]}px`,
                }}
              >

                {!image && <Dropzone onUpload={onUpload} />}
                {image && <img src={image} alt="" className={classNames("w-full h-full", objectFit === "contain" && "object-contain", objectFit === "cover" && "object-cover")} />}

              </div>
            </div>
          </div>

          <div className='flex flex-col gap-8'>
            <div className='flex gap-2'>
              <button onClick={() => setRatio("1:1")} className={classNames('border-[1px] rounded-sm px-8 py-2 hover:bg-gray-50', ratio === "1:1" && "bg-gray-50")}>1:1</button>
              <button onClick={() => setRatio("4:5")} className={classNames('border-[1px] rounded-sm px-8 py-2 hover:bg-gray-50', ratio === "4:5" && "bg-gray-50")}>4:5</button>
              <button onClick={() => setRatio("16:9")} className={classNames('border-[1px] rounded-sm px-8 py-2 hover:bg-gray-50', ratio === "16:9" && "bg-gray-50")}>16:9</button>
            </div>
            <div className='flex gap-2'>
              <button onClick={() => setObjectFit("contain")} className={classNames('border-[1px] rounded-sm px-8 py-2 hover:bg-gray-50', objectFit === "contain" && "bg-gray-50")}>Contain</button>
              <button onClick={() => setObjectFit("cover")} className={classNames('border-[1px] rounded-sm px-8 py-2 hover:bg-gray-50', objectFit === "cover" && "bg-gray-50")}>Cover</button>
            </div>
            <div className='flex flex-col gap-2'>
              <p>Padding: {padding}</p>
              <input className='w-[200px]' type="range" min={0} max={100} defaultValue={padding} onChange={e => setPadding(e.target.value)} />
            </div>

            <div className='flex gap-2'>
              <button onClick={download} className={classNames('flex items-center gap-4 border-[1px] rounded-sm px-8 py-2 hover:bg-gray-50')}>
                <BsCloudDownload />
                <p>Download</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function Dropzone({ onUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => onUpload(reader.result)
      reader.readAsDataURL(file)
    })

  }, [onUpload])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className='w-full h-full inline-flex justify-center items-center' {...getRootProps()}>
      <input {...getInputProps()} />
      <p className='text-center'>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}