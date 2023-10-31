import html2canvas from 'html2canvas'

export default function download(image) {
  return new Promise((resolve, reject) => {
    const id = `canvas-${image.id}`

    var node = document.getElementById(id)

    html2canvas(node).then((canvas) => {
      var dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `framed-image-${new Date().toLocaleDateString()}.png`
      link.click()
      resolve()
    })
  })
}
