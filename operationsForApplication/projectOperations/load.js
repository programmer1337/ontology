let projectList = document.getElementById(`projectList`)
projectList.onclick = function (e) {
  let stroke = e.target.closest('tr')

  if (!stroke.classList.contains('selected')) {
    let items = document.querySelectorAll('.selected')
    Array.from(items).forEach(item => {
      item.classList.remove('selected')
    })
    stroke.classList.add('selected')
  } else if (stroke.classList.contains('selected')) {
    let items = document.querySelectorAll('.item')
    stroke.classList = ''
  }
}

let loadProjectFromPC = document.getElementById(`loadProjectFromPC`)
let loadProject = document.getElementById('loadProject')
let loadProjectModalOpener = document.getElementById('loadProjectModalOpener')
let loadProjectModal = document.getElementById('loadProjectModal')

loadProjectModalOpener.onclick = async function () {
  loadProjectModal.style.display = 'block';

  await fetch(projectStorage).
    then(response => response.json()).
    then(final => {
      massiveOfData = final;
      console.log(massiveOfData);

      while (projectList.firstChild) {
        projectList.removeChild(projectList.firstChild);
      }

      let tr = document.createElement('tr');
      let thName = document.createElement('th');

      thName.innerHTML = 'Имя проекта';
      tr.appendChild(thName);
      projectList.appendChild(tr);

      for (let i = 0; i < massiveOfData.length; i++) {
        let tr = document.createElement('tr');
        tr.setAttribute('id', `${i}`);
        let tdName = document.createElement('td');

        tdName.innerHTML = massiveOfData[i];
        tr.appendChild(tdName);
        projectList.appendChild(tr);
      }
      loadProjectModal.style.display = 'block';
    })
}
loadProject.onclick = async function () {
  selectedProject = document.getElementsByClassName('selected')[0].textContent;

  projectName = selectedProject + '.txt';
  let urlTemp = storage + projectName;

  await fetch(urlTemp).then(response => response.json()).then(final => {
    massiveOfConcepts = [];
    massiveOfRelations = [];
    sessionStorage.clear();

    let result = final;

    sessionStorage.setItem(`projectName`, result.projectName)
    console.log(result)
    if (result.countOfConcepts !== 'null') {
      sessionStorage.setItem(`x`, result.countOfConcepts)
    } else {
      sessionStorage.setItem(`x`, '0')
    }

    if (result.countOfRelations !== 'NaN') {
      sessionStorage.setItem(`countOfRelation`, result.countOfRelations)
    } else {
      sessionStorage.setItem(`countOfRelation`, '0')
    }

    if (result.countOfOperationsResult !== 'null') {
      sessionStorage.setItem(`resultCount`, result.countOfOperationsResult)
    } else {
      sessionStorage.setItem(`resultCount`, '0')
    }

    for (let i = 0; i < result.concepts.length; i++) {
      let concept = {
        ConceptId: result.concepts[i].ConceptId,
        ConceptName: result.concepts[i].ConceptName,
        ConceptPos: result.concepts[i].ConceptPos,
        ConceptLeft: result.concepts[i].ConceptLeft,
        ConceptTop: result.concepts[i].ConceptTop,
        ConceptHeight: result.concepts[i].ConceptHeight,
        ConceptWidth: result.concepts[i].ConceptWidth,
        ConceptCoordX: result.concepts[i].ConceptCoordX,
        ConceptCoordY: result.concepts[i].ConceptCoordY,
        ConceptType: result.concepts[i].ConceptType,
        ConceptValues: result.concepts[i].ConceptValues === null
          ? []
          : result.concepts[i].ConceptValues,
        ConceptColor: result.concepts[i].ConceptColor,
      }
      massiveOfConcepts.push(concept)
    }

    for (let j = 0; j < result.relations.length; j++) {
      let relation
      relation = {
        RelationName: result.relations[j].RelationName,
        RelationBetween: typeof result.relations[j].RelationBetween === 'string'
          ? result.relations[j].RelationBetween.split(',')
          : result.relations[j].RelationBetween,
        RelationVertices: result.relations[j].RelationVertices,
        RelationElementsInConnection: result.relations[j].RelationElementsInConnection !==
        undefined
          ? result.relations[j].RelationElementsInConnection
          : [],
      }
      massiveOfRelations.push(relation)
    }

    for (let i = 0; i < parseInt(sessionStorage.getItem(`resultCount`)); i++) {
      sessionStorage.setItem(`operationResult ${i}`,
        JSON.stringify(result.operationResults[i]))
    }

    sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts));
    sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelations));

    loadProjectModal.style.display = 'none';
    location.reload();
  })
}
loadProjectFromPC.onclick = function () {
  let selectedFileFromPC = document.getElementById('fileFromPC').files[0]
  console.log(selectedFileFromPC)

  let reader = new FileReader()
  reader.readAsText(selectedFileFromPC)

  reader.onload = function () {
    let stringResult = reader.result.toString()
    let obj = JSON.parse(stringResult)

    console.log(obj)

    sessionStorage.clear()

    sessionStorage.setItem(`projectName`, obj.projectName)
    if (obj.countOfConcepts !== 'null') {
      sessionStorage.setItem(`x`, obj.countOfConcepts)
    } else {
      sessionStorage.setItem(`x`, '0')
    }

    if (obj.countOfRelations !== 'NaN') {
      sessionStorage.setItem(`countOfRelation`, obj.countOfRelations)
    } else {
      sessionStorage.setItem(`countOfRelation`, '0')
    }

    if (obj.countOfOperationsResult !== 'null') {
      sessionStorage.setItem(`resultCount`, obj.countOfOperationsResult)
    } else {
      sessionStorage.setItem(`resultCount`, '0')
    }

    for (let i = 0; i < obj.concepts.length; i++) {
      let concept = {
        ConceptId: obj.concepts[i].ConceptId,
        ConceptName: obj.concepts[i].ConceptName,
        ConceptPos: obj.concepts[i].ConceptPos,
        ConceptLeft: obj.concepts[i].ConceptLeft,
        ConceptTop: obj.concepts[i].ConceptTop,
        ConceptHeight: obj.concepts[i].ConceptHeight,
        ConceptWidth: obj.concepts[i].ConceptWidth,
        ConceptCoordX: obj.concepts[i].ConceptCoordX,
        ConceptCoordY: obj.concepts[i].ConceptCoordY,
        ConceptType: obj.concepts[i].ConceptType,
        ConceptValues: obj.concepts[i].ConceptValues === null
          ? []
          : obj.concepts[i].ConceptValues,
        ConceptColor: obj.concepts[i].ConceptColor,
      }
      massiveOfConcepts.push(concept)
    }

    for (let j = 0; j < obj.relations.length; j++) {
      let relation
      relation = {
        RelationName: obj.relations[j].RelationName,
        RelationBetween: typeof obj.relations[j].RelationBetween === 'string'
          ? obj.relations[j].RelationBetween.split(',')
          : obj.relations[j].RelationBetween,
        RelationVertices: obj.relations[j].RelationVertices,
        RelationElementsInConnection: obj.relations[j].RelationElementsInConnection !==
        undefined
          ? obj.relations[j].RelationElementsInConnection
          : [],
      }
      massiveOfRelations.push(relation)
    }

    for (let i = 0; i < parseInt(sessionStorage.getItem(`resultCount`)); i++) {
      sessionStorage.setItem(`operationResult ${i}`,
        JSON.stringify(obj.operationResults[i]))
    }

    console.log()

    sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts))
    sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelations))

    loadProjectModal.style.display = 'none'
    location.reload()
  }
}