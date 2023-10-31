import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function generateImage(image) {
  return new Promise((resolve, reject) => {
    const id = `canvas-${image.id}`
    var node = document.getElementById(id)
    html2canvas(node).then((canvas) => {
      resolve(canvas.toDataURL('image/png'))
    })
  })
}

export async function download(image) {
  const dataUrl = await generateImage(image)
  saveAs(dataUrl, `framed-image-${new Date().toLocaleDateString()}.png`)
}

export function downloadZip(images) {
  return new Promise(async (resolve, reject) => {
    const dataUris = await Promise.all(
      images.map((image) => generateImage(image)),
    )

    const zip = new JSZip()
    const img = zip.folder('images')

    dataUris.map((image, index) =>
      img.file(`${index}.png`, image.split(',')[1], { base64: true }),
    )

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, 'framed-images.zip')
      resolve()
    })
  })
}
