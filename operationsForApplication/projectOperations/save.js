let saveProject = document.getElementById(`saveProject`);
let saveProjectOnPC = document.getElementById(`saveProjectOnPC`);

let projectName, json, project;

let saveProjectModalOpener = document.getElementById('saveProjectModalOpener');
let saveProjectModal = document.getElementById('saveProjectModal');

let closeSaveProjectModal = document.getElementById('closeSaveProjectModal');
let closeLoadProjectModal = document.getElementById('closeLoadProjectModal');
let exitButton = document.getElementById(`exitProjectModalOpener`);

saveProjectModalOpener.onclick = function () {
  saveProjectModal.style.display = 'block'

  document.getElementById(
    `saveProjectModalName`).textContent = 'Сохранение проекта '

  document.getElementById(`projectName`).value = sessionStorage.getItem(
    `projectName`)
}
saveProjectOnPC.onclick = function () {
  projectName = document.getElementById(`projectName`).value

  if (checkStringValidation(projectName)) {
    for (let i = 0; i < parseInt(sessionStorage.getItem(`resultCount`)); i++) {
      massiveOfOperationResults[i] = JSON.parse(
        sessionStorage.getItem(`operationResult ${i}`))
    }

    project = {
      projectName: projectName,
      countOfConcepts: sessionStorage.getItem('x'),
      countOfRelations: sessionStorage.getItem(`countOfRelation`),
      countOfOperationsResult: sessionStorage.getItem(`resultCount`),
      concepts: JSON.parse(sessionStorage.getItem('testConcept')),
      relations: JSON.parse(sessionStorage.getItem('testRelation')),
      operationResults: massiveOfOperationResults,
    }
    json = JSON.stringify(project)

    sessionStorage.setItem('projectName', projectName)

    download(json, projectName, 'text/plain')
    saveProjectModal.style.display = 'none'
  }
}
saveProject.onclick = function sendJSON () {
  let tempStrokeEl = document.getElementById(`projectName`)
  projectName = tempStrokeEl.value

  if (checkStringValidation(projectName)) {
    for (let i = 0; i < parseInt(sessionStorage.getItem(`resultCount`)); i++) {
      massiveOfOperationResults[i] = JSON.parse(
        sessionStorage.getItem(`operationResult ${i}`))
    }

    project = {
      projectName: projectName,
      countOfConcepts: sessionStorage.getItem('x'),
      countOfRelations: sessionStorage.getItem(`countOfRelation`),
      countOfOperationsResult: sessionStorage.getItem(`resultCount`),
      concepts: JSON.parse(sessionStorage.getItem('testConcept')),
      relations: JSON.parse(sessionStorage.getItem('testRelation')),
      operationResults: massiveOfOperationResults,
    }
    json = JSON.stringify(project)

    restoreStorage();
    addProject(json)

    saveProjectModal.style.display = 'none'
  }
}

closeLoadProjectModal.onclick = function () {
  const wrapObj = document.querySelectorAll('.selected')
  for (let i = 0; i < wrapObj.length; i++) {
    wrapObj[i].classList.remove('selected')
  }

  loadProjectModal.style.display = 'none'
}
closeSaveProjectModal.onclick = function () {
  saveProjectModal.style.display = 'none'
}

exitButton.onclick = function () {
  sessionStorage.clear()
  location.assign('enterPage.html')
}