let extractText = document.getElementById('extract_data')
let pdfCanvas = document.getElementById('pdf_renderer')
let editDataModal = document.getElementById('editDataModal')
let textAreaForExtractedData = document.getElementById(
  'textAreaForExtractedData')
let saveData = document.getElementById(
  'saveEditing')
let cancelEditing = document.getElementById(
  'cancelEditing')

extractText.addEventListener('click', () => {
  let extractionMethod = document.getElementById('fileType').value

  if (extractionMethod === 'PDFExtractor') {
    pdfExtraction()
  } else if (extractionMethod === 'AIExtractor') {
    aiExtraction()
  } else if (extractionMethod === 'WordExtractor') {
    wordExtraction()
  }
})

function wordExtraction () {
  let file = document.getElementById('sourceFile').files[0]

  let reader = new FileReader()

  reader.readAsText(file)

  reader.onload = function () {
    setResult(reader.result)
    console.log(reader.result)
  }

  reader.onerror = function () {
    console.log(reader.error)
  }
}

function pdfExtraction () {
  pdfState.pdf.getPage(pdfState.currentPage).then(function (page) {
    let textContent = page.getTextContent()

    return textContent.then(function (text) {
      return text.items.map(function (s) {
        return s.str
      }).join('')
    })
  }).then(setResult)
}

async function aiExtraction () {
  let img = new Image()
  img.src = pdfCanvas.toDataURL('image/jpeg', 1)

  recognize(img.src, 'rus').then(setResult)
}

function recognize (file, lang, logger) {
  return Tesseract.recognize(file, lang, { logger }).
    then(({ data: { text } }) => {
      return text
    })
}

function setResult (text) {
  console.log(text);
  editDataModal.style.display = 'block'

  let tempData = sessionStorage.getItem('tempData') === null
    ? ' '
    : sessionStorage.getItem('tempData')
  textAreaForExtractedData.textContent = tempData + ' ' + text
  textAreaForExtractedData.oncontextmenu = function () {
    console.log('qwe')
  }
}

saveData.addEventListener('click', () => {
  let tempData = textAreaForExtractedData.textContent
  sessionStorage.setItem('tempData', tempData)
})

cancelEditing.addEventListener('click', () => {
  editDataModal.style.display = 'none'
})