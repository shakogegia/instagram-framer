import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

function generateImage(image, options = {}) {
  return new Promise((resolve, reject) => {
    const id = `canvas-${image.id}`

    const original = document.getElementById(id)
    const node = original.cloneNode(true)

    const dpr = window.devicePixelRatio || 1

    const originalWidth = original.clientWidth * dpr
    // const originalHeight = original.clientHeight * dpr

    let scale = image.downloadRes ? parseInt(image.downloadRes, 10) : 1

    // if (options.scale) {
    //   scale = options.scale
    // } else if (options.width) {
    //   scale = options.width / originalWidth
    // }

    node.style.transform = `scale(${scale})`
    node.style.zIndex = -1

    original.after(node)

    html2canvas(node)
      .then((canvas) => {
        node.remove()

        resolve(canvas.toDataURL('image/png'))
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}

export async function download(image, options = {}) {
  const dataUrl = await generateImage(image, options)
  const scale = image.downloadRes ? `@${image.downloadRes}x` : ''
  saveAs(dataUrl, `framed-image-${new Date().toLocaleDateString()}${scale}.png`)
}

export function downloadZip(images, options = {}) {
  return new Promise(async (resolve) => {
    const dataUris = await Promise.all(
      images.map((image) => generateImage(image, options)),
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
