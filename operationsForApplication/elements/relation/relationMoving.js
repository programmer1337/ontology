let addRelation = document.getElementById(`addRelation`);
let addRelationCreationModal = document.getElementById(`addRelationCreationModal`);
let spanRelationCreationModal = document.getElementById(`closeRelationCreationModal`);
let relationName = document.getElementById(`relationCreationModalName`);

let relationClassList = document.getElementById("relationClassList");

let modifyRelation = document.getElementById('modifyRelation');

let cancelShowingRelationClasses = document.getElementById("cancelShowingRelationClasses")
let closeRelationShowingModal = document.getElementById("closeRelationShowingModal")

let cancelAllChosen = document.getElementById(`cancelAllChosen`)

let relationModalName = document.getElementById(`relationName`);
let saveRelationInModal = document.getElementById(`saveRelationInModal`);
let swapOrientation = document.getElementById(`swapOrientation`);
let deleteRelation = document.getElementById(`deleteRelation`);

let connectedElements = document.getElementById(`connectedElements`);
let buildTreeForRelation = document.getElementById(`buildTreeForRelation`)
/*let lookAtConnectedElements = document.getElementById(`lookAtConnectedElements`);*/

let viewRelationClasses = document.getElementById("viewRelationClasses");
let createRelationButton = document.getElementById('createRelation');
let currentId;

let elements = [], el, relationBetween = [];
let countOfRelation, nameOfRelation, countOfStroke;

if (sessionStorage.getItem(`countOfRelation`) !== null) {
    countOfRelation = parseInt(sessionStorage.getItem(`countOfRelation`));
} else {
    countOfRelation = 1;
}

let temp, s = [];
let massiveOfLinks = [], massiveOfVert = [];

addRelation.onclick = function () {
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"));
    countOfStroke = 0
    addRelationCreationModal.style.display = "block";
    document.body.style.position = 'fixed';
    document.body.overflowY = 'hidden';

    relationName.focus();

    while (relationClassList.firstChild) {
        relationClassList.removeChild(relationClassList.firstChild);
    }

    let tr = document.createElement("tr");
    let thName = document.createElement("th");
    let thType = document.createElement("th");

    thName.innerHTML = "Имена классов";
    thType.innerHTML = "Типы классов"
    tr.appendChild(thName);
    tr.appendChild(thType);
    tr.setAttribute('id', 'title')
    relationClassList.appendChild(tr);

    for (let i = 0; i < massiveOfConcept.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute('id', `${i}`);
        let tdName = document.createElement("td");
        let tdType = document.createElement("td");

        tdName.innerHTML = massiveOfConcept[i].ConceptName;
        tdType.innerHTML = massiveOfConcept[i].ConceptType;
        tr.appendChild(tdName);
        tr.appendChild(tdType);
        relationClassList.appendChild(tr);
    }

    relationClassList.onclick = function (e) {
        let stroke = e.target.closest('tr');

        if (!stroke.classList.contains('selected') && countOfStroke !== 2
            && stroke.id !== "title") {
            stroke.classList.toggle('selected');

            let cell = stroke.insertCell(-1);
            cell.setAttribute("class", "numberOfStroke")
            cell.textContent = `${countOfStroke + 1}`

            /*stroke.cells[0].textContent = (countOfStroke + 1) + "\t" + stroke.cells[0].textContent*/
            countOfStroke++;
        } else if (stroke.classList.contains('selected')) {
            stroke.classList = '';
            if (stroke.cells[2].textContent === "1" && countOfStroke === 2) {
                document.getElementsByClassName("selected")[0].cells[2].textContent = "1"
            }
            stroke.deleteCell(stroke.cells.length - 1)

            /*stroke.cells[0].textContent = stroke.cells[0].textContent.slice(2)*/
            countOfStroke--;
        }
    }
}
spanRelationCreationModal.onclick = function () {
    addRelationCreationModal.style.display = "none";
    relationName.value = "";

    const wrapObj = document.querySelectorAll('.selected');
    for (let i = 0; i < wrapObj.length; i++) {
        wrapObj[i].classList.remove('selected');
    }
}
cancelAllChosen.onclick = function () {
    let tempMassiveOfSelected = document.querySelectorAll(".selected")
    for (let i = 0; i < tempMassiveOfSelected.length; i++) {
        tempMassiveOfSelected[i].deleteCell(tempMassiveOfSelected[i].cells.length - 1)
        tempMassiveOfSelected[i].classList.remove("selected");
    }
    countOfStroke = 0
}

createRelationButton.onclick = function createLineBetweenRelation() {
    let massiveOfSelectedConcepts = document.getElementsByClassName("selected")

    if (massiveOfSelectedConcepts.length === 2) {
        if (massiveOfSelectedConcepts[0].cells[2].textContent === "1") {
            relationBetween[0] = massiveOfSelectedConcepts[0].id
            relationBetween[1] = massiveOfSelectedConcepts[1].id
        } else {
            relationBetween[0] = massiveOfSelectedConcepts[1].id
            relationBetween[1] = massiveOfSelectedConcepts[0].id
        }

        el = document.getElementById(`Concept ${currentId}`);
        saveRelation(relationBetween)
    } else if (document.getElementsByClassName('selected').length === 1) {

        relationBetween[0] = massiveOfSelectedConcepts[0].id
        relationBetween[1] = massiveOfSelectedConcepts[0].id
        saveRelation(relationBetween)
    } else {
        relationName.style.color = '#db0000';
        relationName.value = 'Не выбран класс';
        relationName.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            relationName.removeAttribute('disabled');
            relationName.style.color = '#000000';
            relationName.value = '';
            relationName.focus()
        }, 1000)
    }
}
if (sessionStorage.getItem(`testRelation`).length !== 0) {
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))

    console.log("inFirstCreation")

    for (let i = 0; i < massiveOfRelation.length; i++) {
        for (let j = 0; j < 2; j++) {
            temp = massiveOfRelation[i].RelationBetween[j];
            elements[j + 1] = {
                id: parseInt(temp)
            }
        }
        drawLine(
            elements[1].id,
            elements[2].id,
            i
        )
    }
}

paper.on('link:mouseenter', function (linkView) {
    let tools;
    tools = [
        new joint.linkTools.Vertices({
            snapRadius: 0,
            redundancyRemoval: false
        }),
    ];

    linkView.addTools(new joint.dia.ToolsView({
        name: 'onhover',
        tools: tools
    }));
});
paper.on('link:mouseleave', function (linkView) {
    if (!linkView.hasTools('onhover')) return;
    linkView.removeTools();

    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))
    for (let i = 0; i < massiveOfRelation.length; i++) {
        massiveOfRelation[i].RelationVertices = links[i].vertices();
    }
    sessionStorage.setItem("testRelation", JSON.stringify(massiveOfRelation))
});
paper.on('myclick:circle', function (linkView, evt) {
    evt.stopPropagation();
    let link = linkView.model;
    let t = (link.attr('c1/atConnectionRatio') > .2) ? .2 : .9;
    let transitionOpt = {
        delay: 100,
        duration: 2000,
        timingFunction: joint.util.timing.inout
    };
    link.transition('attrs/c1/atConnectionRatio', t, transitionOpt);
    link.transition('attrs/c2/atConnectionRatio', t, transitionOpt);
});

paper.on('link:contextmenu', function (linkView) {
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"))

    let currentLink = linkView.model;
    let currentLinkId = currentLink.attributes.labels[0].attrs.relId;
    console.log(currentLinkId)

    let elementsInRelation, textLine;

    relationModalName.value = massiveOfRelation[currentLinkId].RelationName;

    elementsInRelation = massiveOfRelation[currentLinkId].RelationBetween;

    textLine = massiveOfConcept[elementsInRelation[0]].ConceptName
        + " и " + massiveOfConcept[elementsInRelation[1]].ConceptName
        + " находятся в отношении " + "\""
        + massiveOfRelation[currentLinkId].RelationName + "\"";

    let writeDescription = document.getElementById("writeDescription");
    writeDescription.textContent = textLine;

    modifyRelationModal.style.display = 'block'

    saveRelationInModal.onclick = function () {
        saveRelationChanges(currentLinkId);
    }

    swapOrientation.onclick = function () {
        swapRelationOrientation(currentLinkId)
    }

    connectedElements.onclick = function () {
        modifyRelationModal.style.display = "none";
        lookAtConnectedElements.style.display = "block";

        workWithConnectedElements(currentLinkId)
    }

    buildTreeForRelation.onclick = function () {
        modifyRelationModal.style.display = 'none'
        viewRelationClasses.style.display = 'block'

        buildTree(currentLinkId)
    }
    cancelShowingRelationClasses.onclick = function () {
        viewRelationClasses.style.display = "none";
        modifyRelationModal.style.display = "block"

        document.body.style.position = '';
        document.body.overflowY = '';
    }
    closeRelationShowingModal.onclick = function () {
        viewRelationClasses.style.display = "none";
        modifyRelationModal.style.display = "block"

        document.body.style.position = '';
        document.body.overflowY = '';
    }


    deleteRelation.onclick = function () {
        links[currentLinkId].remove()

        for (let i = currentLinkId; i < massiveOfRelation.length; i++) {
            if (i !== massiveOfRelation.length - 1) {
                links[i] = links[i + 1];
                links[i].attributes.labels[0].attrs.relId = links[i].attributes.labels[0].attrs.relId - 1
                massiveOfRelation[i] = massiveOfRelation[i + 1];
            }
        }

        links.pop()
        massiveOfRelation.pop()

        sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelation));
        sessionStorage.setItem(`countOfRelation`, `${massiveOfRelation.length}`);

        modifyRelationModal.style.left = 0 + 'px';
        modifyRelationModal.style.top = 0 + 'px';
        modifyRelationModal.style.display = 'none';
    }
})

function saveRelation(relations) {
    let relation, massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"));

    if (document.getElementById(`relationCreationModalName`).value !== '') {
        nameOfRelation = document.getElementById(`relationCreationModalName`).value;
    } else {
        nameOfRelation = `Relation ${countOfRelation}`;
        countOfRelation++;
    }

    relation = {
        RelationName: nameOfRelation,
        RelationBetween: relations,
        RelationVertices: [],
        RelationElementsInConnection: []
    }

    massiveOfRelation.push(relation);
    sessionStorage.setItem(`testRelation`, JSON.stringify(massiveOfRelation));

    drawLine(relations[0], relations[1], massiveOfRelation.length - 1);
    sessionStorage.setItem(`countOfRelation`, massiveOfRelation.length);

    const wrapObj = document.querySelectorAll('.selected');
    for (let i = 0; i < wrapObj.length; i++) {
        wrapObj[i].classList.remove('selected');
    }

    addRelationCreationModal.style.display = "none";
    relationName.value = "";
}

function drawLine(id1, id2, numberOfLink) {
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"));
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"));

    if (id1 !== id2) {
        links[numberOfLink] = new joint.shapes.standard.Link({
            source: {id: original[id1].id},
            target: {id: original[id2].id},
            connector: {name: 'smooth'},
            attrs: {
                line: {
                    stroke: '#000000',
                    strokeWidth: 2,
                    targetMarker: {
                        'd': 'M 15 -7 -2 0 15 7 Z',
                        'stroke': '#000000',
                        'fill': '#000000',
                    }
                }
            }
        });
        links[numberOfLink].appendLabel({
            markup: [{
                tagName: 'rect',
                selector: 'labelBody'
            }, {
                tagName: 'text',
                selector: 'labelText'
            }],
            attrs: {
                relId: numberOfLink,
                labelText: {
                    text: massiveOfRelation[numberOfLink].RelationName,
                    fill: '#000000',
                    fontFamily: 'sans-serif',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle'
                },
                labelBody: {
                    ref: 'labelText',
                    refX: -5,
                    refY: -5,
                    refWidth: '100%',
                    refHeight: '100%',
                    refWidth2: 10,
                    refHeight2: 10,
                    stroke: '#000000',
                    fill: 'white',
                    strokeWidth: 2,
                    rx: 5,
                    ry: 5
                }
            }
        });

        massiveOfVert = massiveOfRelation[numberOfLink].RelationVertices
        links[numberOfLink].vertices(massiveOfVert);

        links[numberOfLink].addTo(graph)
    } else if (id1 === id2) {
        links[numberOfLink] = new joint.shapes.standard.Link({
            source: {id: original[id1].id},
            target: {id: original[id2].id},
            vertices: [
                {
                    x: massiveOfConcept[id1].ConceptCoordX - 45,
                    y: massiveOfConcept[id1].ConceptCoordY - 60
                },
                {
                    x: massiveOfConcept[id1].ConceptCoordX - 30,
                    y: massiveOfConcept[id1].ConceptCoordY - 90
                },
            ],
            connector: {name: 'smooth'},
            attrs: {
                line: {
                    stroke: '#000000',
                    strokeWidth: 2,
                    sourceMarker: {
                        'stroke': '#000000',
                        'fill': '#000000',
                    },
                    targetMarker: {
                        'd': 'M 15 -7 -2 0 15 7 Z',
                        'stroke': '#000000',
                        'fill': '#000000',
                    }
                }
            }
        });
        links[numberOfLink].appendLabel({
            markup: [{
                tagName: 'rect',
                selector: 'labelBody'
            }, {
                tagName: 'text',
                selector: 'labelText'
            }],
            attrs: {
                relId: numberOfLink,
                labelText: {
                    text: massiveOfRelation[numberOfLink].RelationName,
                    fill: '#000000',
                    fontFamily: 'sans-serif',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle'
                },
                labelBody: {
                    ref: 'labelText',
                    refX: -5,
                    refY: -5,
                    refWidth: '100%',
                    refHeight: '100%',
                    refWidth2: 10,
                    refHeight2: 10,
                    stroke: '#000000',
                    fill: 'white',
                    strokeWidth: 2,
                    rx: 5,
                    ry: 5
                }
            }
        });

        if (massiveOfRelation[numberOfLink].RelationVertices.length !== 0) {
            massiveOfVert = massiveOfRelation[numberOfLink].RelationVertices
            links[numberOfLink].vertices(massiveOfVert);
        }

        links[numberOfLink].addTo(graph)
    }
}

function updateLine() {
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"))
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))

    if (countOfRelation !== 0) {
        for (let i = 0; i < massiveOfRelation.length; i++) {
            massiveOfRelation[i].RelationVertices = links[i].vertices();
        }
        sessionStorage.setItem("testRelation", JSON.stringify(massiveOfRelation))

        massiveOfLinks = []
        for (let i = 0; i < massiveOfConcept.length; i++) {
            s[i] = {
                x: document.getElementById(`Concept ${i + 1}`).getBoundingClientRect().x,
                y: document.getElementById(`Concept ${i + 1}`).getBoundingClientRect().y - 73,
                width: document.getElementById(`Concept ${i + 1}`).getBoundingClientRect().width,
                height: document.getElementById(`Concept ${i + 1}`).getBoundingClientRect().height
            }

            original[i].position(s[i].x, s[i].y)
        }
    }
}
