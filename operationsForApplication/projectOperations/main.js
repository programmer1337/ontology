let massiveOfOperationResults = [],
  selectedProject, massiveOfData = [],
  massiveOfConcepts = [], massiveOfRelations = [];

async function restoreStorage () {
  await fetch(projectStorage).then(response => response.json()).then(final => {
    massiveOfData = final;
    console.log(massiveOfData)
    if (!massiveOfData.includes(projectName)) {
      massiveOfData.push(projectName)
      addNewProjectName(massiveOfData)
      console.log('Его тут не было')
    } else {
      console.log('Он тут есть')
    }
  })
}

async function addNewProjectName (massiveOfData) {
 await fetch(storageURL, {
   method: 'POST',
   body: JSON.stringify(massiveOfData),
 })
}

async function addProject (jsonProject) {
  await fetch(requestURL, {
    method: 'POST',
    body: jsonProject,
  })
}

function download (data, filename, type) {
  let file = new Blob([data], { type: type })
  if (window.navigator.msSaveOrOpenBlob)
    window.navigator.msSaveOrOpenBlob(file, filename)
  else { // Others
    let a = document.createElement('a'),
      url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}

function checkStringValidation (stringToCheck) {
  let isValid = true

  if (stringToCheck.length > 64) {
    document.getElementById('projectName').style.color = '#db0000'
    document.getElementById('projectName').value = 'Слишком длинное название'
    setTimeout(function () {
      document.getElementById('projectName').style.color = '#000'
      document.getElementById('projectName').value = projectName
      document.getElementById('projectName').focus()
    }, 600)
    isValid = false
  }
  if (!/^[a-z\sA-Zа-яёА-ЯЁ0-9]+$/.test(stringToCheck)) {
    document.getElementById('projectName').style.color = '#db0000'
    document.getElementById(
      'projectName').value = 'Название содержит недопустимые символы'
    setTimeout(function () {
      document.getElementById('projectName').style.color = '#000'
      document.getElementById('projectName').value = projectName
      document.getElementById('projectName').focus()
    }, 600)
    isValid = false
  }
  if (stringToCheck[0] === ' ') {
    document.getElementById('projectName').style.color = '#db0000'
    document.getElementById(
      'projectName').value = 'Название содержит недопустимые символы'
    setTimeout(function () {
      document.getElementById('projectName').style.color = '#000'
      document.getElementById('projectName').value = projectName
      document.getElementById('projectName').focus()
    }, 600)
    isValid = false
  }
  if (stringToCheck === '') {
    document.getElementById('projectName').style.color = '#db0000'
    document.getElementById('projectName').value = 'Введите название'
    setTimeout(function () {
      document.getElementById('projectName').style.color = '#000'
      document.getElementById('projectName').value = projectName
      document.getElementById('projectName').focus()
    }, 600)
    isValid = false
  }

  return isValid
}