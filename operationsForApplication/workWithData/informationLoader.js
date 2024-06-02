let loadInformationModalOpener = document.getElementById(
  'loadInformationModalOpener')
let loadInformationModal = document.getElementById('loadInformationModal')
let loadInformationFromSource = document.getElementById(
  'loadInformationFromSource')

let sourceFile, path

let pdfState = {
  pdf: null,
  currentPage: 1,
  pageCount: 1,
  scale: 1,
}

loadInformationModalOpener.addEventListener('click', () => {
  loadInformationModal.style.display = 'block'
})

loadInformationFromSource.addEventListener('click', async () => {
  sourceFile = document.getElementById('sourceFile').files[0]

  let extension = ''
  const parts = sourceFile.name.split('.')
  if (parts.length > 1) extension = parts.pop()

  if (extension === 'pdf') {
    let formData = new FormData()
    formData.append('file', sourceFile)

    let fileName = sourceFile.name

    await fetch(saveTempFile, {
      method: 'POST',
      body: formData,
    }).then(() => {
      path = tempFilesPath + fileName

      pdfjsLib.getDocument(path).promise.then((pdf) => {
        pdfState.pdf = pdf
        pdfState.pageCount = pdf._pdfInfo.numPages
        pdfState.currentPage = 1
        pdfState.scale = 1

        document.getElementById('current_page').value = String(1)
        document.getElementById('current_page').max = pdfState.pageCount

        document.getElementById('page_count').textContent = 'из ' +
          pdfState.pageCount

        render()

      }).catch(pdfError => {
        console.log(pdfError)
      })
    })
  } else if (extension === 'txt') {
    wordExtraction()
  }
})

function render () {
  pdfState.pdf.getPage(pdfState.currentPage).then(page => {

    let pdfCanvas = document.getElementById('pdf_renderer')
    let context = pdfCanvas.getContext('2d')
    let viewport = page.getViewport({ scale: pdfState.scale })

    pdfCanvas.width = viewport.width
    pdfCanvas.height = viewport.height

    page.render({
      canvasContext: context,
      viewport: viewport,
    })
  })
}

document.getElementById('go_previous').addEventListener('click', () => {
  if (pdfState.pdf == null
    || pdfState.currentPage === 1) return
  pdfState.currentPage -= 1
  document.getElementById('current_page').value = pdfState.currentPage
  render()
})

document.getElementById('go_next').addEventListener('click', () => {
  if (pdfState.pdf == null
    || pdfState.currentPage + 1 > pdfState.pageCount)
    return

  pdfState.currentPage += 1
  document.getElementById('current_page').value = pdfState.currentPage
  render()
})

document.getElementById('current_page').addEventListener('keypress', (e) => {
  if (pdfState.pdf == null) return

  if (e.code === 'Enter') {
    let desiredPage =
      document.getElementById('current_page').valueAsNumber

    if (desiredPage >= 1
      && desiredPage <= pdfState.pageCount) {
      pdfState.currentPage = desiredPage
      document.getElementById('current_page').value = desiredPage
      render()
    }
  }
})

document.getElementById('increase_image').addEventListener('click', () => {
  if (pdfState.pdf == null) return

  pdfState.scale -= 0.25
  render()
})

document.getElementById('reduce_image').addEventListener('click', () => {
  if (pdfState.pdf == null) return

  pdfState.scale += 0.25
  render()
})
