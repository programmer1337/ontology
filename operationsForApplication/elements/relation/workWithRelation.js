let modifyRelationModal = document.getElementById('modifyRelationModal');
let relationChangeModalName = document.getElementById(`relationChangeModalName`);
let valStore1 = [], valStore2 = [];

let addConnection = document.getElementById(`addConnection`);
let deleteConnection = document.getElementById(`deleteConnection`);
let backButton = document.getElementById(`backButton`);
let addConnectionButton = document.getElementById(`addConnectionButton`);
let deleteConnectionButton = document.getElementById(`deleteConnectionButton`);
let lookAtConnectedElements = document.getElementById(`lookAtConnectedElements`);

let massiveOfConnected = [], tempMassiveOfSelected;
let str;

let firstTable = document.getElementById(`classList1`);
let secondTable = document.getElementById(`classList2`);

let closeRelationModifyModal = document.getElementById('closeRelationModifyModal');
let closeElementsModal = document.getElementById(`closeElementsModal`);

function saveRelationChanges(currentLinkId){
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))
    if (relationChangeModalName.value !== "" && relationChangeModalName.value !== "Для изменения направления необходимо изменить имя") {

        massiveOfRelation[currentLinkId].RelationName = relationChangeModalName.value
        links[currentLinkId].label().attrs.labelText.text = relationChangeModalName.value
        links[currentLinkId].label(1, relationChangeModalName.value)

        sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelation));

        closeWindow()
    }else{
        relationChangeModalName.style.color = '#db0000';
        relationChangeModalName.value = 'Для изменения направления необходимо изменить имя';
        relationChangeModalName.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            relationChangeModalName.removeAttribute('disabled');
            relationChangeModalName.style.color = '#000000';
            relationChangeModalName.value = '';
            relationChangeModalName.focus()
        }, 2000)
    }

    relationChangeModalName.value = ""
}
function swapRelationOrientation(currentLinkId){
    let tempRelationBetween = [], tempRelationConnected = [], massiveOfRelation = [];
    if (relationChangeModalName.value !== "" && relationChangeModalName.value !== "Для изменения направления необходимо изменить имя") {
        massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))

        tempRelationBetween[0] = massiveOfRelation[currentLinkId].RelationBetween[1]
        tempRelationBetween[1] = massiveOfRelation[currentLinkId].RelationBetween[0]
        massiveOfRelation[currentLinkId].RelationBetween = tempRelationBetween;

        links[currentLinkId].source(original[tempRelationBetween[0]])
        links[currentLinkId].target(original[tempRelationBetween[1]])

        links[currentLinkId].label().attrs.labelText.text = relationChangeModalName.value
        links[currentLinkId].label(1, relationChangeModalName.value)

        if(massiveOfRelation[currentLinkId].RelationElementsInConnection.length !== 0){
            tempRelationConnected[0] = massiveOfRelation[currentLinkId].RelationElementsInConnection[1]
            tempRelationConnected[1] = massiveOfRelation[currentLinkId].RelationElementsInConnection[0]
        }
        massiveOfRelation[currentLinkId].RelationElementsInConnection = tempRelationConnected;

        massiveOfRelation[currentLinkId].RelationName = relationChangeModalName.value;

        sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelation));
        relationChangeModalName.value = ""

        closeWindow()
    }else{
        relationChangeModalName.style.color = '#db0000';
        relationChangeModalName.value = 'Для изменения направления необходимо изменить имя';
        relationChangeModalName.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            relationChangeModalName.removeAttribute('disabled');
            relationChangeModalName.style.color = '#000000';
            relationChangeModalName.value = '';
            relationChangeModalName.focus()
        }, 2000)
    }
}
function workWithConnectedElements(currentLinkId){
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"))

    let elementsInRelation = massiveOfRelation[currentLinkId].RelationBetween;

    let firstInRelation = massiveOfRelation[currentLinkId].RelationBetween[0];
    let secondInRelation = massiveOfRelation[currentLinkId].RelationBetween[1];

    document.getElementById("connectedElementsModalName").textContent
        = "Править отношение " + massiveOfRelation[currentLinkId].RelationName;

    valStore1 = massiveOfConcept[elementsInRelation[0]].ConceptValues;
    valStore2 = massiveOfConcept[elementsInRelation[1]].ConceptValues;

    drawTable(elementsInRelation[0], firstTable, valStore1)
    drawTable(elementsInRelation[1], secondTable, valStore2)

    let table1 = document.getElementById('classList1');
    let table2 = document.getElementById('classList2');
    firstTable.onclick = function (e) {
        cleanTableRows(table1)
        cleanTableRows(table2)

        selectMode0(e, currentLinkId, elementsInRelation[0], elementsInRelation[1]);
    }
    secondTable.onclick = function (e) {
        cleanTableRows(table1)
        cleanTableRows(table2)

        selectMode0(e, currentLinkId, elementsInRelation[0], elementsInRelation[1]);
    }

    addConnection.onclick = function ()  {
        if (document.querySelectorAll('.selected').length === 1) {
            document.getElementById("connectedElementsModalName").textContent = "Добавление связей";

            closeElementsModal.style.display = 'none';
            addConnection.style.display = 'none';
            deleteConnection.style.display = 'none';

            addConnectionButton.style.display = 'inline-block';
            backButton.style.display = 'inline-block';

            if (document.querySelectorAll('.selected')[0].parentElement.id === "classList1") {
                secondTable.onclick = function (e) {
                    selectMode1(0, e, 'addOption');
                }
            } else {
                firstTable.onclick = function (e) {
                    selectMode1(0, e, 'addOption');
                }
            }
        }
    }

    addConnectionButton.onclick = function () {
        tempMassiveOfSelected = document.querySelectorAll(".selected")

        let str = tempMassiveOfSelected[0].id;
        let firstStrokeID = str.slice(-1);
        let secondStrokeID = tempMassiveOfSelected[1].id.slice(-1);

        let massiveOfConnectionFirst, massiveOfConnectionSecond;

        massiveOfConnected = [];

        massiveOfConnected = massiveOfRelation[currentLinkId].RelationElementsInConnection;

        if(massiveOfConnected[0]===undefined) {
            massiveOfConnected[0] = [];
            massiveOfConnected[1] = [];
        }

        if(massiveOfConnected[0][firstStrokeID]===undefined || massiveOfConnected[0][firstStrokeID]===null){
            massiveOfConnectionFirst = []
        }else{
            massiveOfConnectionFirst = massiveOfConnected[0][firstStrokeID]
        }

        if(massiveOfConnected[1][secondStrokeID]===undefined || massiveOfConnected[1][secondStrokeID]===undefined){
            massiveOfConnectionSecond = []
        }else{
            massiveOfConnectionSecond = massiveOfConnected[1][secondStrokeID]
        }

        if(!massiveOfConnectionFirst.includes(massiveOfConcept[secondInRelation].ConceptValues[secondStrokeID])){
            massiveOfConnectionFirst.push(massiveOfConcept[secondInRelation].ConceptValues[secondStrokeID])
            massiveOfConnectionSecond.push(massiveOfConcept[firstInRelation].ConceptValues[firstStrokeID])
        }

        massiveOfConnected[0][firstStrokeID] = massiveOfConnectionFirst;
        massiveOfConnected[1][secondStrokeID] = massiveOfConnectionSecond;

        massiveOfRelation[currentLinkId].RelationElementsInConnection = massiveOfConnected;

        sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelation));

        document.getElementById("connectedElementsModalName").textContent
            = "Править отношение " + massiveOfRelation[currentLinkId].RelationName;

        addConnectionButton.style.display = 'none';
        backButton.style.display = 'none';

        closeElementsModal.style.display = 'inline';
        addConnection.style.display = 'inline-block';
        deleteConnection.style.display = 'inline-block';

        firstTable.onclick = function (e) {
            selectMode0(e, currentLinkId, elementsInRelation[0], elementsInRelation[1]);
        }
        secondTable.onclick = function (e) {
            selectMode0(e, currentLinkId, elementsInRelation[0], elementsInRelation[1]);
        }

        let massiveOfSelectedLength = document.querySelectorAll(".selected").length
        tempMassiveOfSelected = document.querySelectorAll(".selected")
        for(let i = 0; i < massiveOfSelectedLength; i++) {
            tempMassiveOfSelected[i].classList.remove("selected");
        }

        cleanTableRows(secondTable)
    }

    deleteConnection.onclick = function () {
        if (document.querySelectorAll('.selected').length === 1) {
            document.getElementById("connectedElementsModalName").textContent = "Удаление связей";

            closeElementsModal.style.display = 'none';
            addConnection.style.display = 'none';
            deleteConnection.style.display = 'none';

            deleteConnectionButton.style.display = 'inline-block';
            backButton.style.display = 'inline-block';

            if (document.querySelectorAll('.selected')[0].parentElement.id === "classList1") {
                secondTable.onclick = function (e) {
                    selectMode1(0, e, 'deleteOption');
                }
            } else {
                firstTable.onclick = function (e) {
                    selectMode1(0, e, 'deleteOption');
                }
            }
        }
    }

    deleteConnectionButton.onclick = function () {
        tempMassiveOfSelected = document.querySelectorAll(".selected")

        str = tempMassiveOfSelected[0].id;
        let firstStrokeID = str.slice(-1);
        let secondStrokeID = tempMassiveOfSelected[1].id.slice(-1);

        let massiveOfConnectionFirst, massiveOfConnectionSecond;

        massiveOfConnected = [];
        massiveOfConnected = massiveOfRelation[currentLinkId].RelationElementsInConnection;

        if(massiveOfConnected[0]===undefined) {
            massiveOfConnected[0] = [];
            massiveOfConnected[1] = [];
        }

        if(massiveOfConnected[0][firstStrokeID]===undefined){
            massiveOfConnectionFirst = []
        }else{
            massiveOfConnectionFirst = massiveOfConnected[0][firstStrokeID]
        }

        if(massiveOfConnected[1][secondStrokeID]===undefined){
            massiveOfConnectionSecond = []
        }else{
            massiveOfConnectionSecond = massiveOfConnected[1][secondStrokeID]
        }

        console.log(massiveOfConnectionFirst)
        console.log(massiveOfConcept[secondInRelation].ConceptValues)
        console.log(massiveOfConcept[secondInRelation].ConceptValues[secondStrokeID])
        if (massiveOfConnectionFirst.includes(massiveOfConcept[secondInRelation].ConceptValues[secondStrokeID])) {
            massiveOfConnectionFirst.splice(
                massiveOfConnectionFirst.indexOf(
                    massiveOfConcept[secondInRelation].ConceptValues[secondStrokeID]),
                1);
            massiveOfConnectionSecond.splice(
                massiveOfConnectionSecond.indexOf(
                    massiveOfConcept[firstInRelation].ConceptValues[firstStrokeID]),
                1);
        }

        massiveOfConnected[0][firstStrokeID] = massiveOfConnectionFirst;
        massiveOfConnected[1][secondStrokeID] = massiveOfConnectionSecond;

        massiveOfRelation[currentLinkId].RelationElementsInConnection = massiveOfConnected;

        sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelation));

        document.getElementById("connectedElementsModalName").textContent
            = "Править отношение " + massiveOfRelation[currentLinkId].RelationName;


        deleteConnectionButton.style.display = 'none';
        backButton.style.display = 'none';

        closeElementsModal.style.display = 'inline';
        addConnection.style.display = 'inline-block';
        deleteConnection.style.display = 'inline-block';

        firstTable.onclick = function (e) {
            selectMode0(e, currentLinkId, elementsInRelation[0], elementsInRelation[1]);
        }
        secondTable.onclick = function (e) {
            selectMode0(e, currentLinkId, elementsInRelation[0], elementsInRelation[1]);
        }

        let massiveOfSelectedLength = document.querySelectorAll(".selected").length
        tempMassiveOfSelected = document.querySelectorAll(".selected")
        for(let i = 0; i < massiveOfSelectedLength; i++) {
            tempMassiveOfSelected[i].classList.remove("selected");
        }

        cleanTableRows(secondTable)
    }

    backButton.onclick = function () {
        document.getElementById("connectedElementsModalName").textContent
            = "Править отношение " + sessionStorage.getItem(`RelationName ${currentLinkId}`);

        closeElementsModal.style.display = 'inline';
        addConnectionButton.style.display = 'none';
        deleteConnectionButton.style.display = 'none';
        backButton.style.display = 'none';
        addConnection.style.display = 'inline-block';
        deleteConnection.style.display = 'inline-block';

        firstTable.onclick = function (e) {
            selectMode0(e, currentLinkId, elementsInRelation[0], elementsInRelation[1]);
        }
        secondTable.onclick = function (e) {
            selectMode0(e, currentLinkId, elementsInRelation[0], elementsInRelation[1]);
        }

        let massiveOfSelectedLength = document.querySelectorAll(".selected").length
        tempMassiveOfSelected = document.querySelectorAll(".selected")
        for(let i = 0; i < massiveOfSelectedLength; i++) {
            tempMassiveOfSelected[i].classList.remove("selected");
        }
        cleanTableRows(secondTable)
    }
}

function buildTree(currentLinkId){
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"))
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))

    let dataForRelationTree = {
            nodes: [],
            edges: [],
        },
        newBranch, levelNow = 2, spaceNodeNow = 4, spaceEdgeNow = 3,
        relBetween = massiveOfRelation[currentLinkId].RelationBetween,
        firstInRelationId = relBetween[0], secondInRelationId = relBetween[1],
        relName = massiveOfRelation[currentLinkId].RelationName;

    document.getElementById("relationModalName").textContent
        = "Отношение " + relName

    addNode(dataForRelationTree, "spaceNode-1", relName, "#537bb1", 1)
    addNode(dataForRelationTree, "spaceNode-2","", "#537bb1", 0)
    addNode(dataForRelationTree, "spaceNode-3","", "#537bb1", 1)

    addEdge(dataForRelationTree, "spaceEdge-1","spaceNode-1", "spaceNode-2", "#97c2fc")
    addEdge(dataForRelationTree, "spaceEdge-2","spaceNode-2", "spaceNode-3", "#97c2fc")

    for(let i = 0; i < massiveOfConcept[firstInRelationId].ConceptValues.length; i++){
        if(massiveOfRelation[currentLinkId].RelationElementsInConnection.length!==0){
            let secondElementStorage = massiveOfRelation[currentLinkId].RelationElementsInConnection[0][i]

            for(let j = 0; j < secondElementStorage.length; j++){
                if(spaceNodeNow === 4){
                    addNode(dataForRelationTree, `spaceNode-${spaceNodeNow}`, "", "#537bb1", levelNow)
                    addEdge(dataForRelationTree,`spaceEdge-${spaceEdgeNow}`,`spaceNode-${spaceNodeNow-1}`,`spaceNode-${spaceNodeNow}`)
                }else{
                    addNode(dataForRelationTree, `spaceNode-${spaceNodeNow}`, "", "#537bb1", levelNow)
                    addEdge(dataForRelationTree,`spaceEdge-${spaceEdgeNow}`,`spaceNode-${spaceNodeNow-2}`,`spaceNode-${spaceNodeNow}`)
                }
                spaceNodeNow++
                spaceEdgeNow++

                let positionOfElement = massiveOfConcept[secondInRelationId].ConceptValues.indexOf(secondElementStorage[j])
                newBranch = createBranch(i, positionOfElement, currentLinkId, spaceNodeNow, levelNow)
                /*console.log(newBranch)*/
                for(let i = 0; i < newBranch.nodes.length; i++){
                    dataForRelationTree.nodes.push(newBranch.nodes[i])
                }
                for(let i = 0; i < newBranch.edges.length; i++){
                    dataForRelationTree.edges.push(newBranch.edges[i])
                }
                /*console.log(dataForRelationTree)*/
                if(spaceNodeNow > 5){
                    addEdge(dataForRelationTree,`spaceEdge-${spaceEdgeNow}`,`spaceNode-${spaceNodeNow-3}`,`spaceNode-${spaceNodeNow}`)
                }else{
                    addEdge(dataForRelationTree,`spaceEdge-${spaceEdgeNow}`,`spaceNode-${spaceNodeNow-2}`,`spaceNode-${spaceNodeNow}`)
                }
                spaceNodeNow++
                spaceEdgeNow++
                levelNow++
            }
        }
    }

    let options = {
        nodes: {
            shape: "dot",
            size: 6,
        },
        layout: {
            hierarchical: {
                direction: "UD",
                levelSeparation: 100,
                nodeSpacing: 150,
            },
        },
        physics: false,
    };
    let relationNetwork = buildNetwork(document.getElementById("relationShowingBlock"), dataForRelationTree, options);
}

function addNode(massive, id, label, color, level) {
    if (/[А-ЯЁ]/gi.test(label) || label === "" || label === "𝚲") {
        massive.nodes.push({
            id: id,
            label: label,
            level: level,
            font: { multi: true },
            color: color,
        });
    } else {
        let testInCorner = htmlTitle(katex.renderToString(label).replaceAll("\"", "\'"))

        let elements = testInCorner.getElementsByTagName("mrow");

        let formulaInStroke = ""
        for (let i = 0; i < elements[0].childNodes.length; i++) {
            formulaInStroke += elements[0].childNodes[i].textContent
        }

        massive.nodes.push({
            id: id,
            label: formulaInStroke,
            level: level,
            color: color,
        });
    }
}
function addEdge(massive, id, from, to, color) {
    massive.edges.push({
        id: id,
        from: from,
        to: to,
        color: {color: color},
    });
}
function closeWindow(){
    modifyRelationModal.style.left = 0 + 'px';
    modifyRelationModal.style.top = 0 + 'px';
    modifyRelationModal.style.display = 'none';
}

function selectMode0(e, currLink, firstElement, secondElement){
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"))

    let stroke = e.target.closest('tr');

    if (!stroke.classList.contains('selected')) {
        let all = document.querySelectorAll('.selected');
        all.forEach(function (el) {
            el.classList = '';
        })
        let table1 = document.querySelector('#classList1');
        let table2 = document.querySelector('#classList2');

        for (let row of table1.rows) {
            row.style.background = "";
        }
        for (let row of table2.rows) {
            row.style.background = "";
        }

        stroke.classList.toggle(`selected`)
        if(stroke.parentElement.id === "classList1"){
            let selected = stroke.id.slice(-1);
            let connectedElementsStore

            if(massiveOfRelation[currLink].RelationElementsInConnection.length!==0
                && massiveOfRelation[currLink].RelationElementsInConnection[0].length!==0) {

                connectedElementsStore = massiveOfRelation[currLink].RelationElementsInConnection[0][selected];
            }else connectedElementsStore = ["error_storage_empty"];

            selectConnectedElements(secondTable, connectedElementsStore, massiveOfConcept[secondElement].ConceptType)
        }else if(stroke.parentElement.id === "classList2"){
            let selected = stroke.id.slice(-1);
            let connectedElementsStore

            if(massiveOfRelation[currLink].RelationElementsInConnection.length!==0
                && massiveOfRelation[currLink].RelationElementsInConnection[1].length!==0) {

                connectedElementsStore = massiveOfRelation[currLink].RelationElementsInConnection[1][selected];
            }else connectedElementsStore = ["error_storage_empty"];

            selectConnectedElements(firstTable, connectedElementsStore, massiveOfConcept[firstElement].ConceptType)
        }

    } else if (stroke.classList.contains('selected')) {
        stroke.classList = '';

        drawTable(firstElement, firstTable, massiveOfConcept[firstElement].ConceptValues);
        drawTable(secondElement, secondTable, massiveOfConcept[secondElement].ConceptValues);
    }
}
function selectMode1(countOfElem, e, option) {
    let stroke = e.target.closest('tr');

    if (option === 'addOption') {
        if (!stroke.classList.contains('selected') && countOfElem < 1 && stroke.style.background !== "rgb(181, 129, 219)") {
            stroke.classList.toggle('selected');
            countOfElem++;
        } else if (stroke.classList.contains('selected')) {
            stroke.classList = '';
            countOfElem--;
        }
    }
    if (option === 'deleteOption'){
        if (!stroke.classList.contains('selected') && countOfElem < 1 && stroke.style.background === "rgb(181, 129, 219)") {
            stroke.style.background = "#b3b3b3";
            stroke.classList.toggle('selected');
            countOfElem++;
        } else if (stroke.classList.contains('selected')) {
            stroke.classList = '';
            stroke.style.background = "rgb(181, 129, 219)";
            countOfElem--;
        }
    }
}

function drawTable(element, tableLink, massiveOfElements) {
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"));

    while (tableLink.firstChild) {
        tableLink.removeChild(tableLink.firstChild);
    }

    let tr = document.createElement("tr");
    let thName = document.createElement("th");

    thName.innerHTML = "Элементы класса " + massiveOfConcept[element].ConceptName;
    tr.appendChild(thName);
    tableLink.appendChild(tr);

    let massiveOfValues = massiveOfElements

    if (massiveOfConcept[element].ConceptType === 'Формульный') {
        for (let i = 0; i < massiveOfValues.length; i++) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `class-${element}-stroke${i}`);
            let tdName = document.createElement("td");

            let modalVal = massiveOfValues[i];

            tdName.innerHTML = katex.renderToString(modalVal);
            tr.appendChild(tdName);
            tableLink.appendChild(tr);
        }
    } else {
        for (let i = 0; i < massiveOfValues.length; i++) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `class-${element}-stroke${i}`);
            let tdName = document.createElement("td");

            tdName.innerHTML = massiveOfValues[i];
            tr.appendChild(tdName);
            tableLink.appendChild(tr);
        }
    }
}
function selectConnectedElements(table, connectedElements, type){
    if(type === "Формульный"){
        let massiveOfSelectedElements = table.getElementsByClassName("katex-mathml")
        /*document.getElementsByClassName("katex-mathml")[0].innerText*/
        for (let i = 0; i < massiveOfSelectedElements.length; i++) {
            if (connectedElements.includes(massiveOfSelectedElements[i].firstChild.firstChild.lastChild.textContent)) {
                table.rows[i + 1].style.background = "#B581DB";
            }
        }
    }
    else{
        for (let i = 1; i < table.rows.length; i++) {
            if (connectedElements.includes(table.rows[i].cells[0].textContent)) {
                table.rows[i].style.background = "#B581DB";
            }
        }
    }
}
function cleanTableRows(table) {
    for (let row of table.rows) {
        row.style.background = "";
    }
}
function htmlTitle(html) {
    const container = document.createElement("div");
    container.innerHTML = html;
    return container;
}
function createBranch(firstInRelation, secondInRelation, relationId, spaceNodeNumber, level){
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"))
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))

    let massiveForBranch = {
            nodes: [],
            edges: [],
        },
        relBetween = massiveOfRelation[relationId].RelationBetween,
        tempStorageForFirst = massiveOfConcept[relBetween[0]].ConceptValues,
        tempStorageForSecond = massiveOfConcept[relBetween[1]].ConceptValues,
        connectedDataMassive = massiveOfRelation[relationId].RelationElementsInConnection[0][firstInRelation];

    addNode(massiveForBranch, `spaceNode-${spaceNodeNumber}`,
        "","#537bb1", level)

    addNode(massiveForBranch,
        `r_${relationId} Node-${tempStorageForFirst[firstInRelation]}->${tempStorageForSecond[secondInRelation]}`,
        tempStorageForFirst[firstInRelation], "#537bb1", level + 1)

    addNode(massiveForBranch,
        `r_${relationId} Node-${tempStorageForSecond[secondInRelation]}<-${tempStorageForFirst[firstInRelation]}`,
        tempStorageForSecond[secondInRelation], "#537bb1", level + 1)

    addEdge(massiveForBranch, `r_${relationId} from:SN${spaceNodeNumber} to:${firstInRelation}:${tempStorageForFirst[firstInRelation]}`,
        `spaceNode-${spaceNodeNumber}`,
        `r_${relationId} Node-${tempStorageForFirst[firstInRelation]}->${tempStorageForSecond[secondInRelation]}`)

    addEdge(massiveForBranch, `r_${relationId} from:SN${spaceNodeNumber} to:${secondInRelation}:${tempStorageForSecond[secondInRelation]}`,
        `spaceNode-${spaceNodeNumber}`,
        `r_${relationId} Node-${tempStorageForSecond[secondInRelation]}<-${tempStorageForFirst[firstInRelation]}`)

    return massiveForBranch
}


closeElementsModal.onclick = function() {
    lookAtConnectedElements.style.display = "none";
    modifyRelationModal.style.display = "block";

    let massiveOfSelectedLength = document.querySelectorAll(".selected").length
    tempMassiveOfSelected = document.querySelectorAll(".selected")
    for (let i = 0; i < massiveOfSelectedLength; i++) {
        tempMassiveOfSelected[i].classList.remove("selected");
    }
    cleanTableRows(firstTable)
    cleanTableRows(secondTable)
}
closeRelationModifyModal.onclick = function() {
    document.getElementById(`relationChangeModalName`).value = ""

    let massiveOfSelectedLength = document.querySelectorAll(".selected").length
    tempMassiveOfSelected = document.querySelectorAll(".selected")
    for (let i = 0; i < massiveOfSelectedLength; i++) {
        tempMassiveOfSelected[i].classList.remove("selected");
    }
    cleanTableRows(firstTable)
    cleanTableRows(secondTable)
}
