'use client'
import { useImages } from '@/providers/images-provider'
import ColorPicker from './colorpicker'
import Slider from './slider'
import Label from './label'
import Checkbox from './checkbox'
import Button from './button'
import Select from './select'
import { LuDownload } from 'react-icons/lu'
import download from '@/utils/download'
import { useState } from 'react'

export default function Settings() {
  const { selectedImage, updateImage } = useImages()
  const [isDownloading, setIsDownloading] = useState(false)

  const onDownload = () => {
    setIsDownloading(true)
    download(selectedImage).finally(() => {
      setIsDownloading(false)
    })
  }

  if (!selectedImage) return null

  const { id } = selectedImage

  return (
    <div className="flex flex-col gap-6 pl-8">
      <div className="flex flex-col gap-2">
        <Label>Format</Label>
        <div className="flex gap-2">
          <Button
            onClick={() => updateImage(id, 'ratio', '1:1')}
            isActive={selectedImage.ratio === '1:1'}
          >
            1:1
          </Button>
          <Button
            onClick={() => updateImage(id, 'ratio', '4:5')}
            isActive={selectedImage.ratio === '4:5'}
          >
            4:5
          </Button>
          <Button
            onClick={() => updateImage(id, 'ratio', '16:9')}
            isActive={selectedImage.ratio === '16:9'}
          >
            16:9
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Image fit</Label>
        <div className="flex gap-2">
          <Button
            onClick={() => updateImage(id, 'objectFit', 'contain')}
            isActive={selectedImage.objectFit === 'contain'}
          >
            Contain
          </Button>
          <Button
            onClick={() => updateImage(id, 'objectFit', 'cover')}
            isActive={selectedImage.objectFit === 'cover'}
          >
            Cover
          </Button>
        </div>
      </div>

      <Select
        label="Rotate"
        options={[
          { title: '0°', value: 0 },
          { title: '90°', value: 90 },
          { title: '180°', value: 180 },
          { title: '270°', value: 270 },
        ]}
        defaultValue={selectedImage.rotate}
        onChange={(e) => updateImage(id, 'rotate', e.target.value)}
      />

      <div className="flex gap-4">
        <Checkbox
          id="Horizontal"
          label="Flip Horizontal"
          checked={selectedImage.scaleX === -1}
          onChange={() =>
            updateImage(id, 'scaleX', selectedImage.scaleX === -1 ? 1 : -1)
          }
        />
        <Checkbox
          id="Vertical"
          label="Flip Vertical"
          checked={selectedImage.scaleY === -1}
          onChange={() =>
            updateImage(id, 'scaleY', selectedImage.scaleY === -1 ? 1 : -1)
          }
        />
      </div>

      <Slider
        id="padding"
        label="Padding"
        min={0}
        max={100}
        defaultValue={selectedImage.padding}
        onChange={(e) => updateImage(id, 'padding', e.target.value)}
      />

      <Slider
        id="zoom"
        label="Zoom"
        min={1}
        max={5}
        step={0.1}
        defaultValue={selectedImage.scale}
        onChange={(e) => updateImage(id, 'scale', e.target.value)}
      />

      <Slider
        id="border"
        label="Border"
        min={0}
        max={20}
        defaultValue={selectedImage.border}
        onChange={(e) => updateImage(id, 'border', e.target.value)}
      />

      <ColorPicker
        label="Border Color"
        value={selectedImage.borderColor}
        onChange={(e) => updateImage(id, 'borderColor', e.target.value)}
      />

      <ColorPicker
        label="Background Fill"
        value={selectedImage.bgColor}
        onChange={(e) => updateImage(id, 'bgColor', e.target.value)}
      />

      {/* <div className='flex gap-2'>
        <Button onClick={() => download(id)} className="flex items-center gap-4">
          <BsCloudDownload />
          <p className="flex-1 text-center">Download</p>
        </Button>
      </div> */}

      <div className="flex items-center gap-2" onClick={onDownload}>
        <LuDownload className="w-6 h-6" />
        <Label>{isDownloading ? 'Downloading...' : 'Download'}</Label>
      </div>
    </div>
  )
}
