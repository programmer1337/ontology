let request1 = new XMLHttpRequest();

let createModalOpener = document.getElementById("createProjectModalOpener")
let createProjectModal = document.getElementById("createProjectModal");
let createProjectButton = document.getElementById(`createProjectButton`);

let renameModalOpener = document.getElementById("renameProjectButton")
let renameModal = document.getElementById("renameProjectModal")
let renameProject = document.getElementById("renameProject")

let loadProjectModalOpener = document.getElementById("loadProjectModalOpener")
let loadProjectFromPC = document.getElementById("loadProjectFromPC")
let loadProjectModal = document.getElementById("loadProjectModal")
let loadProject = document.getElementById("loadProject");

let projectList = document.getElementById(`projectList`)

let closeCreateModal = document.getElementById("closeCreateProjectModal");
let closeLoadModal = document.getElementById("closeLoadProjectModal");
let closeRenameModal = document.getElementById("closeRenameProjectModal");

let lastNameOfProject, newNameOfProject, tempName, nameError,
    posOfName, massiveOfNames, massiveOfData, json,
    projectName, projectRename;

let massiveOfConcepts = [], massiveOfRelations = [];

createModalOpener.onclick = function() {
    createProjectModal.style.display = "block";
}
createProjectButton.onclick = function sendJSON() {
    sessionStorage.clear();

    projectName = document.getElementById('projectName').value
    let projectStroke = document.getElementById('projectName')
    if (checkStringValidation(projectName, projectStroke)) {
        checkNameInStorage(projectName)
    }
}

loadProjectModalOpener.onclick = function() {
    loadProjectModal.style.display = "block";

    let httpC = new XMLHttpRequest();
    httpC.responseType = 'json';

    httpC.open("GET", projectStorage);
    httpC.send()

    httpC.onload = function() {
        massiveOfData = httpC.response;
        console.log(massiveOfData)

        while (projectList.firstChild) {
            projectList.removeChild(projectList.firstChild);
        }

        let tr = document.createElement("tr");
        let thName = document.createElement("th");

        thName.innerHTML = "Имя проекта";
        tr.appendChild(thName);
        projectList.appendChild(tr);

        for (let i = 0; i < massiveOfData.length; i++) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `${i}`);
            let tdName = document.createElement("td");

            tdName.innerHTML = massiveOfData[i];
            tr.appendChild(tdName);
            projectList.appendChild(tr);

        }

        loadProjectModal.style.display = "block";
    }
}
projectList.onclick = function(e){
    let stroke = e.target.closest('tr');
    let items;

    if (!stroke.classList.contains('selected')) {
        items = document.querySelectorAll('.selected')
        Array.from(items).forEach(item => {
            item.classList.remove('selected')
        })
        stroke.classList.add('selected');
    } else if (stroke.classList.contains('selected')) {
        stroke.classList = "";
    }
};

loadProject.onclick = function loadJSON(){
    let selectedProject = document.getElementsByClassName('selected')[0].textContent;

    projectName = selectedProject+".txt"
    let urlTemp = storage + projectName;
    let httpc = new XMLHttpRequest();

    httpc.responseType = 'json';

    httpc.open("GET", urlTemp);
    httpc.send()

    httpc.onload = function() {
        let result = httpc.response;

        console.log(result)

        sessionStorage.clear();

        sessionStorage.setItem(`projectName`, result.projectName);
        if(result.countOfConcepts !== "null"){
            sessionStorage.setItem(`x`, result.countOfConcepts)
        }else{
            sessionStorage.setItem(`x`, "0")
        }

        if(result.countOfRelations !== "null"){
            sessionStorage.setItem(`countOfRelation`, result.countOfRelations);
        }else{
            sessionStorage.setItem(`countOfRelation`, "0");
        }

        if(result.countOfOperationsResult !== "null"){
            sessionStorage.setItem(`resultCount`, result.countOfOperationsResult);
        }else{
            sessionStorage.setItem(`resultCount`, "0");
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
                ConceptValues: result.concepts[i].ConceptValues===null?[]:result.concepts[i].ConceptValues,
                ConceptColor: result.concepts[i].ConceptColor
            }
            massiveOfConcepts.push(concept)
        }

        for (let j = 0; j < result.relations.length; j++){
            let relation;
            relation = {
                RelationName: result.relations[j].RelationName,
                RelationBetween: typeof result.relations[j].RelationBetween === "string"
                    ? result.relations[j].RelationBetween.split(",")
                    : result.relations[j].RelationBetween,
                RelationVertices: result.relations[j].RelationVertices,
                RelationElementsInConnection: result.relations[j].RelationElementsInConnection !== undefined
                    ? result.relations[j].RelationElementsInConnection
                    : []
            }
            massiveOfRelations.push(relation)
        }

        for (let i = 0; i < parseInt(sessionStorage.getItem(`resultCount`));i++) {
            sessionStorage.setItem(`operationResult ${i}`, JSON.stringify(result.operationResults[i]));
        }

        sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts))
        sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelations))

        loadProjectModal.style.display = "none";
        location.assign("index.html");
    }
}
loadProjectFromPC.onclick = function (){
    let selectedFileFromPC = document.getElementById('fileFromPC').files[0];
    console.log(selectedFileFromPC)

    let reader = new FileReader();
    reader.readAsText(selectedFileFromPC);

    reader.onload = function() {
        let stringResult = reader.result.toString()
        let obj = JSON.parse(stringResult);

        sessionStorage.clear();

        sessionStorage.setItem(`projectName`, obj.projectName);
        if(obj.countOfConcepts !== "null"){
            sessionStorage.setItem(`x`, obj.countOfConcepts)
        }else{
            sessionStorage.setItem(`x`, "0")
        }

        if(obj.countOfRelations !== "NaN"){
            sessionStorage.setItem(`countOfRelation`, obj.countOfRelations);
        }else{
            sessionStorage.setItem(`countOfRelation`, "0");
        }

        if(obj.countOfOperationsResult !== "null"){
            sessionStorage.setItem(`resultCount`, obj.countOfOperationsResult);
        }else{
            sessionStorage.setItem(`resultCount`, "0");
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
                ConceptValues: obj.concepts[i].ConceptValues===null?[]:obj.concepts[i].ConceptValues,
                ConceptColor: obj.concepts[i].ConceptColor
            }
            massiveOfConcepts.push(concept)
        }

        for (let j = 0; j < obj.relations.length; j++){
            let relation;
            relation = {
                RelationName: obj.relations[j].RelationName,
                RelationBetween: typeof obj.relations[j].RelationBetween === "string"
                    ? obj.relations[j].RelationBetween.split(",")
                    : obj.relations[j].RelationBetween,
                RelationVertices: obj.relations[j].RelationVertices,
                RelationElementsInConnection: obj.relations[j].RelationElementsInConnection !== undefined
                    ? obj.relations[j].RelationElementsInConnection
                    : []
            }
            massiveOfRelations.push(relation)
        }

        console.log(massiveOfRelations)

        for (let i = 0; i < parseInt(sessionStorage.getItem(`resultCount`)); i++) {
            sessionStorage.setItem(`operationResult ${i}`, JSON.stringify(obj.operationResults[i]));
        }

        sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts))
        sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelations))

        loadProjectModal.style.display = "none";
        location.assign("index.html");
    }
}

renameModalOpener.onclick = function() {
    let selectedProject = document.getElementsByClassName('selected')[0];
    if(selectedProject === undefined){
    }else {
        projectRename = selectedProject.textContent;
        document.getElementById("projectRename").value = projectRename;

        loadProjectModal.style.display = "none";
        renameModal.style.display = "block";
    }
}
renameProject.onclick = async function (){
    let response = await fetch(projectStorage);

    if (response.ok) {
        let result = await response.json();

        tempName = document.getElementById("projectRename").value;
        nameError = 0;

        massiveOfData=[];
        console.log(result);
        if (result!==undefined) {
            massiveOfData = result;
            posOfName = massiveOfData.indexOf(selectedProject.textContent);
        }

        for (let i = 0; i < parseInt(result.length);i++)
        {
            if(tempName === result[i])
            {
                nameError = 1;
                console.log("такое имя уже есть")
            }
        }

        if(nameError === 1) {
            document.getElementById("projectRename").style.color = '#db0000'
            document.getElementById("projectRename").value = "Имя занято"
            setTimeout(function (){
                document.getElementById("projectRename").style.color = '#000';
                document.getElementById("projectRename").value = tempName;
                document.getElementById("projectRename").focus();
            },600)
        }else {
            lastNameOfProject = selectedProject.textContent + ".txt";
            newNameOfProject = tempName + ".txt"

            let renameStroke = document.getElementById("projectRename")

            if(checkStringValidation(tempName, renameStroke)){
                request1.open("POST", renameURL, true);
                request1.setRequestHeader("Content-Type", "application/json");

                massiveOfNames = [lastNameOfProject, newNameOfProject]
                console.log(massiveOfNames)

                json = JSON.stringify(massiveOfNames);

                request1.send(json);

                massiveOfData.splice(posOfName, 1, tempName);

                addNewProjectName(massiveOfData)

                while (projectList.firstChild) {
                    projectList.removeChild(projectList.firstChild);
                }

                let tr = document.createElement("tr");
                let thName = document.createElement("th");

                thName.innerHTML = "Имя проекта";
                tr.appendChild(thName);
                projectList.appendChild(tr);

                for (let i = 0; i < result.length; i++) {
                    let tr = document.createElement("tr");
                    tr.setAttribute('id', `${i}`);
                    let tdName = document.createElement("td");

                    tdName.innerHTML = result[i];
                    tr.appendChild(tdName);
                    projectList.appendChild(tr);
                }

                renameModal.style.display = "none";
                loadProjectModal.style.display = "block";
            }
        }
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
}

closeCreateModal.onclick = function() {
    document.getElementById("projectName").value = ""
    createProjectModal.style.display = "none";
}
closeLoadModal.onclick = function() {
    const wrapObj = document.querySelectorAll('.selected');
    for(let i = 0; i < wrapObj.length; i++) {
        wrapObj[i].classList.remove('selected');
    }

    loadProjectModal.style.display = "none";
}
closeRenameModal.onclick = function() {
    renameModal.style.display = "none";
    loadProjectModal.style.display = "block";
}


function addNewProjectName(massiveOfData){
    let http2 = new XMLHttpRequest();

    http2.open("POST", storageURL)
    http2.send(JSON.stringify(massiveOfData))
}
function checkStringValidation(stringToCheck, htmlStroke){
    let isValid = true
    let lastValue = htmlStroke.value

    if(stringToCheck.length > 64){
        htmlStroke.style.color = '#db0000'
        htmlStroke.value = "Слишком длинное название"
        setTimeout(function () {
            htmlStroke.style.color = '#000';
            htmlStroke.value = lastValue;
            htmlStroke.focus();
        }, 600)
        return false
    }
    if(!/^[a-z\sA-Zа-яёА-ЯЁ\d]+$/.test(stringToCheck)){
        htmlStroke.style.color = '#db0000'
        htmlStroke.value = "Название содержит недопустимые символы"
        setTimeout(function () {
            htmlStroke.style.color = '#000';
            htmlStroke.value = lastValue;
            htmlStroke.focus();
        }, 600)
        return false
    }
    if(stringToCheck[0]===" "){
        htmlStroke.style.color = '#db0000'
        htmlStroke.value = "Название содержит недопустимые символы"
        setTimeout(function () {
            htmlStroke.style.color = '#000';
            htmlStroke.value = lastValue;
            htmlStroke.focus();
        }, 600)
        return false
    }
    if(stringToCheck===""){
        htmlStroke.style.color = '#db0000'
        htmlStroke.value = "Введите название"
        setTimeout(function () {
            htmlStroke.style.color = '#000';
            htmlStroke.value = lastValue;
            htmlStroke.focus();
        }, 600)
        return false
    }
    return isValid
}
function checkNameInStorage(projectName){
    let httpC = new XMLHttpRequest();
    httpC.responseType = 'json';

    httpC.open("GET", projectStorage);
    httpC.send()

    httpC.onload = function() {
        massiveOfData = httpC.response;
        console.log(massiveOfData)
        if(!massiveOfData.includes(projectName)) {
            massiveOfData.push(projectName);
            console.log("Его тут нет")

            sessionStorage.setItem('projectName', projectName)
            sessionStorage.setItem('testConcept', JSON.stringify([]))
            sessionStorage.setItem('testRelation', JSON.stringify([]))
            createProjectModal.style.display = "none";
            location.assign("index.html");
        }else {
            document.getElementById("projectName").style.color = '#db0000'
            document.getElementById("projectName").value = "Имя занято"
            setTimeout(function (){
                document.getElementById("projectName").style.color = '#000';
                document.getElementById("projectName").value = projectName;
                document.getElementById("projectName").focus();
            },600)
        }
    };
}
