let form = document.getElementById('buttonStorage');
let massiveOfRelation;

let modal = document.getElementById("mainModal");

let formName = document.getElementById("formName");
let formType = document.getElementById("formType");
let formColorChanger = document.getElementById("formColorChanger");
let sortButtonAZ = document.getElementById("sortButtonAZ");
let sortButtonZA = document.getElementById("sortButtonZA");
let valuesOfClass = document.getElementById("valueList");
let deleteClassForm = document.getElementById("deleteClassForm");

if(sessionStorage.getItem("x")!==null){
    x = sessionStorage.getItem("x");
}else{
    x = 1;
}

function conceptCreation(concept, xNow){
    let btn = document.createElement('button');
    btn.type = 'button';
    btn.id =  concept.ConceptId;
    btn.innerHTML = concept.ConceptName;
    btn.className = 'conceptButton';

    btn.style.position = concept.ConceptPos;
    btn.style.left = concept.ConceptLeft;
    btn.style.top = concept.ConceptTop;
    btn.style.background = concept.ConceptColor;

    form.appendChild(btn);

    concept.ConceptWidth = document.getElementById(`Concept ${xNow}`).getBoundingClientRect().width;
    concept.ConceptHeight = document.getElementById(`Concept ${xNow}`).getBoundingClientRect().height;

    let origin = new joint.shapes.standard.Rectangle()
    origin.position(concept.ConceptCoordX, concept.ConceptCoordY - 73)
    origin.resize(concept.ConceptWidth, concept.ConceptHeight)
    origin.attr({
        body: {
            rx: 10,
            ry: 10,
            strokeWidth: 0
        }
    })

    original.push(origin)
    origin.addTo(graph)

    bindConceptMoving(btn)
    bindConceptContextMenu(btn)
}
function bindConceptMoving(button) {
    button.onmousedown = function (e) {
        let el = parseInt(button.id.match(/\d+/));

        if (e.which === 1) {
            let coords = getCoords(button);
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;

            button.style.position = 'absolute';
            button.style.zIndex = '15';
            moveAt(e);

            function moveAt(e) {
                button.style.left = e.pageX - shiftX + 'px';
                button.style.top = e.pageY - shiftY + 'px';
            }

            document.onmousemove = function (e) {
                moveAt(e);
                original[el-1].position(document.getElementById(`Concept ${el}`).getBoundingClientRect().x,
                    document.getElementById(`Concept ${el}`).getBoundingClientRect().y - 73)
            };

            button.onmouseup = function () {
                if (sessionStorage.getItem("testConcept")!==null){
                    massiveOfConcepts = JSON.parse(sessionStorage.getItem("testConcept"))
                }else{
                    massiveOfConcepts = [];
                }

                if(sessionStorage.getItem("testRelation")){
                    massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))
                    for (let i = 0; i < massiveOfRelation.length; i++){
                        massiveOfRelation[i].RelationVertices = links[i].vertices();
                    }
                }

                massiveOfConcepts[el-1].ConceptPos = button.style.position;
                massiveOfConcepts[el-1].ConceptLeft = button.style.left;
                massiveOfConcepts[el-1].ConceptTop = button.style.top;
                massiveOfConcepts[el-1].ConceptColor = button.style.background;
                massiveOfConcepts[el-1].ConceptCoordX = button.getBoundingClientRect().x;
                massiveOfConcepts[el-1].ConceptCoordY = button.getBoundingClientRect().y;

                sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts))
                sessionStorage.setItem("testRelation", JSON.stringify(massiveOfRelation))

                document.onmousemove = null;
                button.style.zIndex = '14';
                button.onmouseup = null;
            };

        }
        button.ondragstart = function () {
            return false;
        };

        function getCoords(elem) {
            let box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            }
        }
    }
}
function bindConceptContextMenu (button) {
    button.oncontextmenu = function (event) {
        let massiveOfConcepts = JSON.parse(sessionStorage.getItem(`testConcept`))

        let globalID = parseInt(event.target.id.match(/\d+/))-1;
        console.log(globalID);

        modalValues.value = "";
        if (button.style.background === "") {
            formColorChanger.value = '#2b2b2b';
            formColorChanger.background = '#2b2b2b';
        } else {
            formColorChanger.value = RGBToHex(button.style.background);
            formColorChanger.background = RGBToHex(button.style.background)
        }


        formName.value = massiveOfConcepts[globalID].ConceptName
        formType.value = "Тип: " + massiveOfConcepts[globalID].ConceptType.toLowerCase();
        katex.render('', document.getElementById('formula'));

        modal.style.display = "block";
        document.body.style.position = 'fixed';
        document.body.overflowY = 'hidden';

        sortButtonAZ.onclick = function () {
            let massiveOfValues = JSON.parse(sessionStorage.getItem(`testConcept`))[globalID].ConceptValues
            massiveOfValues.sort();

            while (valuesOfClass.firstChild) {
                valuesOfClass.removeChild(valuesOfClass.firstChild);
            }

            let tr = document.createElement("tr");
            let thName = document.createElement("th");

            thName.innerHTML = "Значения";
            tr.appendChild(thName);
            valuesOfClass.appendChild(tr);

            for (let i = 0; i < massiveOfValues.length; i++) {
                let tr = document.createElement("tr");
                tr.setAttribute('id', `${i + 1}`);
                let tdName = document.createElement("td");

                tdName.innerHTML = massiveOfValues[i];
                tr.appendChild(tdName);
                valuesOfClass.appendChild(tr);
            }

            let massiveOfConcepts = JSON.parse(sessionStorage.getItem(`testConcept`));
            massiveOfConcepts[globalID].ConceptValues = massiveOfValues;
            sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts));
        }
        sortButtonZA.onclick = function () {
            let massiveOfValues = JSON.parse(sessionStorage.getItem(`testConcept`))[globalID].ConceptValues
            massiveOfValues.sort().reverse();

            while (valuesOfClass.firstChild) {
                valuesOfClass.removeChild(valuesOfClass.firstChild);
            }

            let tr = document.createElement("tr");
            let thName = document.createElement("th");

            thName.innerHTML = "Значения";
            tr.appendChild(thName);
            valuesOfClass.appendChild(tr);

            for (let i = 0; i < massiveOfValues.length; i++) {
                let tr = document.createElement("tr");
                tr.setAttribute('id', `${i + 1}`);
                let tdName = document.createElement("td");

                tdName.innerHTML = massiveOfValues[i];
                tr.appendChild(tdName);
                valuesOfClass.appendChild(tr);
            }

            let massiveOfConcepts = JSON.parse(sessionStorage.getItem(`testConcept`));
            massiveOfConcepts[globalID].ConceptValues = massiveOfValues.reverse();
            sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts));
        }

        modalValues.value = "";
        if (massiveOfConcepts[globalID].ConceptType === 'Формульный') {
            formulaConcept(globalID)
        } else {
            restConcept(globalID)
        }

        deleteClassForm.onclick = function(){
            deleteClassButton(globalID)
        };

        return false;
    }
}
function deleteClassButton(globalID) {
    let massiveOfConcepts = JSON.parse(sessionStorage.getItem(`testConcept`)),
        massiveOfRelation = JSON.parse(sessionStorage.getItem(`testRelation`)),
        count = massiveOfConcepts.length;

    for(let j = globalID; j < count; j++) {
        if (j!== count-1) {
            massiveOfConcepts[j] = massiveOfConcepts[j + 1];
            massiveOfConcepts[j].ConceptId = `Concept ${j + 1}`;
        }
    }

    massiveOfConcepts.pop()

    if(massiveOfRelation.length!==0) {
        for (let j = 0; j < massiveOfRelation.length; j++) {
            if (massiveOfRelation[j].RelationBetween.includes(`${globalID}`)
                || massiveOfRelation[j].RelationBetween.includes(globalID)) {
                links[j].remove();

                for (let i = j; i < massiveOfRelation.length; i++) {
                    if (i !== massiveOfRelation.length-1) {
                        links[i] = links[i + 1];
                        links[i].attributes.labels[0].attrs.relId = links[i].attributes.labels[0].attrs.relId-1

                        massiveOfRelation[i] = massiveOfRelation[i+1];
                    }
                }

                links.pop()
                massiveOfRelation.pop();
                j--
            }
        }
        for (let i = 0; i < massiveOfRelation.length; i++) {
            let newConnection = massiveOfRelation[i].RelationBetween;
            if (newConnection[0] >= globalID) {
                newConnection[0]--;
            }
            if (newConnection[1] >= globalID) {
                newConnection[1]--;
            }
            massiveOfRelation[i].RelationBetween = newConnection;
        }

        sessionStorage.setItem("testRelation", JSON.stringify(massiveOfRelation));
        sessionStorage.setItem(`countOfRelation`, `${massiveOfRelation.length}`);
    }

    sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts));
    x--;
    sessionStorage.setItem(`x`, `${x}`);
    location.reload()
}

function RGBToHex(rgb) {
    var rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}