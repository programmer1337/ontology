let listOfResultsButton = document.getElementById("listOfResults");
let checkOperationResult = document.getElementById("checkOperationResult");
let closeOperationResultModal = document.getElementById("closeOperationResultModal")
let operationResultList = document.getElementById("operationResultList");
let operationResult = [];
let showOperationResult = document.getElementById("showOperationResult")
let countOfSelectedResult = 0;

function htmlTitle(html) {
    const container = document.createElement("div");
    container.innerHTML = html;
    return container;
}

function fillNetworkInfo(nameOfElement, nOfRelation, nameOfSecondClass, massiveOfEl) {
    let nodes = [], edges = [];

    addNode("Node-1", nameOfElement, "#537bb1", nodes)
    addNode("Node-2", nOfRelation, "#537bb1", nodes)
    addNode("Node-3", nameOfSecondClass, "#537bb1", nodes)

    nodes[0]["level"] = 1;
    nodes[1]["level"] = 0;
    nodes[2]["level"] = 1;

    addEdge("Edge-1", "Node-1", "Node-2", "#97c2fc", edges)
    addEdge("Edge-2", "Node-2", "Node-3", "#97c2fc", edges)

    massiveOfEl = massiveOfEl.toString()

    let countOfDrewNode = 4, countOfDrewEdge = 3, levelNow = 2, countOfSpaceNode = 1, countOfSpaceEdge = 1;
    for (let i = 0; i < massiveOfEl.split(',').length; i++) {
        if (massiveOfEl.split(',')[i] !== "null") {
            if (i === massiveOfEl.split(',').length - 1) {
                addNode(`spaceNode-${countOfSpaceNode}`, "𝚲", "#537bb1", nodes)
            } else {
                addNode(`spaceNode-${countOfSpaceNode}`, "", "#537bb1", nodes)
            }
            addNode(`Node-${countOfDrewNode}`, massiveOfEl.split(',')[i], "#97c2fc", nodes)
            nodes[countOfDrewNode]["level"] = levelNow;
            nodes[countOfDrewNode - 1]["level"] = levelNow;

            if (i === 0) {
                addEdge(`Edge-${countOfDrewEdge}`, `Node-${countOfDrewNode - 1}`, `spaceNode-${countOfSpaceNode}`, "#97c2fc", edges)
                countOfDrewEdge++;
                addEdge(`Edge-${countOfDrewEdge}`, `Node-${countOfDrewNode - 1}`, `Node-${countOfDrewNode}`, "#97c2fc", edges)
                countOfDrewEdge++;
            } else {
                addEdge(`Edge-${countOfDrewEdge}`, `spaceNode-${countOfSpaceNode - 1}`, `spaceNode-${countOfSpaceNode}`, "#97c2fc", edges)
                countOfDrewEdge++;
                addEdge(`Edge-${countOfDrewEdge}`, `spaceNode-${countOfSpaceNode - 1}`, `Node-${countOfDrewNode}`, "#97c2fc", edges)
                countOfDrewEdge++;
            }

            countOfDrewNode += 2;
            countOfSpaceNode++;
            countOfSpaceEdge++;
            levelNow++;
        }
    }

    let data = {
        nodes: nodes,
        edges: edges,
    };
    return data;
}
function buildNetwork(container, data, options){
    let network;
    return network = new vis.Network(container, data, options);
}
function addNode(id, label, color, nodes) {
    if (/[А-ЯЁ]/gi.test(label) || label === "" || label === "𝚲") {
        nodes.push({
            id: id,
            label: label,
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

        nodes.push({
            id: id,
            label: formulaInStroke,
            color: color,
        });
    }
}
function addEdge(id, from, to, color, edges) {
    edges.push({
        id: id,
        from: from,
        to: to,
        color: {color: color},
    });
}

function createHeaderForTableInOperationsWindow(operationResultList){
    while (operationResultList.firstChild) {
        operationResultList.removeChild(operationResultList.firstChild);
    }

    let tr = document.createElement("tr");
    let thOperationName = document.createElement("th");
    let thOperationType = document.createElement("th")
    let thOperationResult = document.createElement("th");
    let thOperationClassElement = document.createElement("th");
    let thOperationRelation = document.createElement("th");
    let thOperationTo = document.createElement("th");

    thOperationName.innerHTML = "Название операции"
    thOperationType.innerHTML = "Тип операции"
    thOperationClassElement.innerHTML = "Элемент класса"
    thOperationRelation.innerHTML = "Отношение"
    thOperationTo.innerHTML = "Краевой класс"
    thOperationResult.innerHTML = "Результат операции"

    tr.appendChild(thOperationName);
    tr.appendChild(thOperationType);
    tr.appendChild(thOperationClassElement);
    tr.appendChild(thOperationRelation);
    tr.appendChild(thOperationTo);
    tr.appendChild(thOperationResult);

    operationResultList.appendChild(tr);
}
function createStrokeForTableInOperationWindow(i, tr){
    let tdOperationName = document.createElement("td");
    let tdOperationClassElement = document.createElement("td");
    let tdOperationRelation = document.createElement("td");
    let tdOperationType = document.createElement("td");
    let tdOperationResult = document.createElement("td");
    let tdOperationTo = document.createElement("td");

    tdOperationName.innerHTML = operationResult[i].operationName;
    tdOperationClassElement.innerHTML = operationResult[i].classElement;
    tdOperationRelation.innerHTML = operationResult[i].relationName;
    tdOperationType.innerHTML = operationResult[i].operation;

    let element, strokeOfFate="",
        tempMassiveOfResultElements = operationResult[i].elements.toString().split(",");

    console.log(tempMassiveOfResultElements)

    for(element of tempMassiveOfResultElements){
        if(element.includes("\\") && tempMassiveOfResultElements.indexOf(element) !== tempMassiveOfResultElements.length - 1){
            strokeOfFate += element + " , "
        }else if(tempMassiveOfResultElements.length === 1){
            strokeOfFate += element.replace(" ", "\\ ")
            console.log(strokeOfFate)
        }else if (!element.includes("\\") && tempMassiveOfResultElements.indexOf(element) !== tempMassiveOfResultElements.length - 1){
            strokeOfFate += element + ",\\ "
            console.log(strokeOfFate)
        }else{
            strokeOfFate += element
        }
    }

    tdOperationResult.innerHTML = katex.renderToString(strokeOfFate);

    tdOperationTo.innerHTML = operationResult[i].to;

    tr.appendChild(tdOperationName);
    tr.appendChild(tdOperationType);
    tr.appendChild(tdOperationClassElement);
    tr.appendChild(tdOperationRelation);
    tr.appendChild(tdOperationTo);
    tr.appendChild(tdOperationResult);
}

listOfResultsButton.onclick = function (){
    checkOperationResult.style.display = "block";

    createHeaderForTableInOperationsWindow(operationResultList)

    for(let i = 0; i < parseInt(sessionStorage.getItem(`resultCount`)); i++) {
        operationResult[i] = JSON.parse(sessionStorage.getItem(`operationResult ${i}`));
    }

    for(let i = 0; i < parseInt(sessionStorage.getItem(`resultCount`)); i++) {
        let tr = document.createElement("tr");
        tr.setAttribute('id', `${i}`);

        createStrokeForTableInOperationWindow(i, tr)
        operationResultList.appendChild(tr);
    }
}

operationResultList.onclick = function (event){
    let stroke = event.target.closest('tr');

    checkOperationResult.style.display = "none";
    showOperationResult.style.display = "block"

    let options = {
        nodes: {
            shape: "dot",
            size: 6,
        },
        layout: {
            hierarchical: {
                direction: "UD",
                levelSeparation: 40,
                nodeSpacing: 200,
            },
        },
        physics: false,
    }
    let placeForShowing = document.getElementById("operationShowingBlock")
    let dataResultForShowingBlock = JSON.parse(sessionStorage.getItem(`operationResult ${stroke.id}`)).dataForTree
    let showNetwork = buildNetwork(placeForShowing, dataResultForShowingBlock, options);

/*    if (!stroke.classList.contains('selected')) {
        for(let selectedItem of document.getElementsByClassName('selected'))
        {
            console.log(selectedItem)
            if(selectedItem.id !== stroke.id)
                selectedItem.classList = ""
        }

        stroke.classList.toggle('selected');
    }else if(stroke.classList.contains('selected')) {
        stroke.classList = '';
    }*/
}

let closeOperationShowingModal = document.getElementById("closeOperationShowingModal");
closeOperationShowingModal.onclick = function() {
    showOperationResult.style.display = "none";
    checkOperationResult.style.display = "block";
}