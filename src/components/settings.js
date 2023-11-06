'use client'
import { useStore } from '@/providers/store-provider'
import { download, downloadZip } from '@/utils/download'
import { useMemo, useState } from 'react'
import { LuDownload, LuRotateCcw, LuCopyCheck } from 'react-icons/lu'
import Button from './button'
import Checkbox from './checkbox'
import ColorPicker from './colorpicker'
import Label from './label'
import Select from './select'
import Slider from './slider'

const dpr = window.devicePixelRatio || 1

export default function Settings() {
  const {
    images,
    selectedImage,
    updateImage,
    resetImage,
    syncSettings,
    updateSyncSettings,
    resetSetting,
  } = useStore()
  const [isDownloading, setIsDownloading] = useState(false)
  const downloadScaleOptions = useMemo(
    () =>
      [1, 2, 3, 4, 5].map((value) => {
        if (!selectedImage.width) return { title: `${value}x`, value }
        const scale = value * dpr
        const width = scale * selectedImage.width
        const ratio = selectedImage.ratio.split(':')
        const height =
          Math.round(
            (selectedImage.width * parseInt(ratio[1], 10)) /
              parseInt(ratio[0], 10),
          ) * scale
        const title = `${width}x${height}`
        return { title, value }
      }),
    [selectedImage.ratio, selectedImage.width],
  )

  const onDownload = () => {
    if (isDownloading) return
    setIsDownloading(true)
    download(selectedImage).finally(() => {
      setIsDownloading(false)
    })
  }

  const onDownloadZip = () => {
    if (isDownloading) return
    setIsDownloading(true)
    downloadZip(images).finally(() => {
      setIsDownloading(false)
    })
  }

  if (!selectedImage) return null

  const { id } = selectedImage

  return (
    <div className="flex flex-col gap-6 md:pl-8">
      {images.length > 1 && (
        <div className="flex gap-4">
          <Checkbox
            id={id + 'Sync'}
            label="Sync Settings Across Images"
            checked={syncSettings}
            onChange={() => updateSyncSettings(!syncSettings)}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label onDoubleClick={() => resetSetting(id, 'ratio')}>
          Aspect Ratio
        </Label>
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
          <Button
            onClick={() => updateImage(id, 'ratio', '2:3')}
            isActive={selectedImage.ratio === '2:3'}
          >
            2:3
          </Button>
        </div>
      </div>

      <Select
        id={id + 'objectFit'}
        label="Image fit"
        options={[
          { title: 'Contain', value: 'contain' },
          { title: 'Cover', value: 'cover' },
        ]}
        defaultValue={selectedImage.objectFit}
        value={selectedImage.objectFit}
        onChange={(e) => updateImage(id, 'objectFit', e.target.value)}
      />

      <Select
        id={id + 'Rotate'}
        label="Rotate"
        options={[
          { title: '0°', value: 0 },
          { title: '90°', value: 90 },
          { title: '180°', value: 180 },
          { title: '270°', value: 270 },
        ]}
        defaultValue={selectedImage.rotate}
        value={selectedImage.rotate}
        onChange={(e) => updateImage(id, 'rotate', e.target.value)}
      />

      <div className="flex gap-4">
        <Checkbox
          id={id + 'Horizontal'}
          label="Flip Horizontal"
          checked={selectedImage.scaleX === -1}
          onChange={() =>
            updateImage(id, 'scaleX', selectedImage.scaleX === -1 ? 1 : -1)
          }
        />
        <Checkbox
          id={id + 'Vertical'}
          label="Flip Vertical"
          checked={selectedImage.scaleY === -1}
          onChange={() =>
            updateImage(id, 'scaleY', selectedImage.scaleY === -1 ? 1 : -1)
          }
        />
      </div>

      <Slider
        id={id + 'padding'}
        label="Padding"
        min={0}
        max={100}
        value={selectedImage.padding}
        onChange={(e) => updateImage(id, 'padding', e.target.value)}
        onReset={() => resetSetting(id, 'padding')}
      />

      <Slider
        id={id + 'zoom'}
        label="Zoom"
        min={1}
        max={5}
        step={0.1}
        value={selectedImage.scale}
        onChange={(e) => updateImage(id, 'scale', e.target.value)}
        onReset={() => resetSetting(id, 'scale')}
      />

      <Slider
        id={id + 'border'}
        label="Stroke"
        min={0}
        max={20}
        value={selectedImage.border}
        onChange={(e) => updateImage(id, 'border', e.target.value)}
        onReset={() => resetSetting(id, 'border')}
      />

      <ColorPicker
        id={id + 'borderColor'}
        label="Stroke Color"
        value={selectedImage.borderColor}
        onChange={(e) => updateImage(id, 'borderColor', e.target.value)}
      />

      <ColorPicker
        id={id + 'bgColor'}
        label="Background Fill"
        value={selectedImage.bgColor}
        onChange={(e) => updateImage(id, 'bgColor', e.target.value)}
      />

      <Select
        id={id + 'downloadScale'}
        label="Download Resolution"
        options={downloadScaleOptions}
        defaultValue={selectedImage.downloadScale}
        value={selectedImage.downloadScale}
        onChange={(e) => updateImage(id, 'downloadScale', e.target.value)}
      />

      <div className="flex items-center gap-2" onClick={() => resetImage(id)}>
        <LuRotateCcw className="w-6 h-6" />
        <Label className="cursor-pointer">Reset to defaults</Label>
      </div>

      {images.length == 1 && (
        <div className="flex items-center gap-2" onClick={onDownload}>
          <LuDownload className="w-6 h-6" />
          <Label className="cursor-pointer">
            {isDownloading ? 'Downloading...' : 'Download'}
          </Label>
        </div>
      )}

      {images.length > 1 && (
        <div className="flex items-center gap-2" onClick={onDownloadZip}>
          <LuDownload className="w-6 h-6" />
          <Label className="cursor-pointer">
            {isDownloading ? 'Archiving...' : 'Download all images (zip)'}
          </Label>
        </div>
      )}
    </div>
  )
}
