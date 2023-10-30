import * as htmlToImage from 'html-to-image'

export default function download(image) {
  return new Promise((resolve, reject) => {
    const id = `canvas-${image.id}`

    var node = document.getElementById(id)

    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = `framed-image-${new Date().toLocaleDateString()}.png`
        link.click()
        console.log('saved')
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })
      .finally(() => {
        resolve()
      })
  })
}
