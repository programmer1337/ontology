let x;
if(sessionStorage.getItem("x")!==null){
    console.log("inMainScript")
    x = sessionStorage.getItem('x');
}else{
    x = 1;
    console.log("inMainScript")
    sessionStorage.setItem("testConcept", JSON.stringify([]))
    sessionStorage.setItem("testRelation", JSON.stringify([]))
}
let nameOfProject, nameOfClass;

let typeSelect = document.getElementById('typeSelect');
let addConcept = document.getElementById('addConcept');
let className = document.getElementById("classCreationModalName");
let classColorChanger = document.getElementById("classColorChanger");
let saveClass = document.getElementById("saveClass");
let viewClass = document.getElementById("viewClass");

let classViewModal = document.getElementById("classViewModal");
let classCreationModal = document.getElementById('classCreationModal');
let relationViewModal = document.getElementById("relationViewModal");

let deleteAll = document.getElementById('deleteAll')

let closeClassCreationModal = document.getElementById('closeClassCreationModal');
let closeClassViewModal = document.getElementById("closeClassViewModal");
let closeRelationViewModal = document.getElementById("closeRelationViewModal");

let viewRelation = document.getElementById("viewRelation");

if (sessionStorage.getItem("testConcept")!==null){
    massiveOfConcepts = JSON.parse(sessionStorage.getItem("testConcept"))
    for(let i = 0; i < massiveOfConcepts.length; i++) {
        conceptCreation(massiveOfConcepts[i], i + 1);
    }
}else{
    massiveOfConcepts = [];
}

addConcept.onclick = function (){
    className.value = '';

    typeSelect.options[0].setAttribute('selected', 'selected');

    classCreationModal.style.display = "block";
    classColorChanger.value = '#9a9aff';
    className.focus();
}

saveClass.onclick = function addButton() {
    let concept, massiveOfConcepts = JSON.parse(sessionStorage.getItem("testConcept"));
    if (isCorrect(className)) {
        if (className.value !== "") {
            nameOfClass = className.value;
        } else {
            nameOfClass = `Concept${x}`;
        }

        concept={
            ConceptId: `Concept ${x}`,
            ConceptName: nameOfClass,
            ConceptPos: 'absolute',
            ConceptLeft: 65 + 'px',
            ConceptTop: 125 + 'px',
            ConceptWidth: 120,
            ConceptHeight: 60,
            ConceptCoordX: 15,
            ConceptCoordY: 15,
            ConceptValues: [],
            ConceptType: document.getElementById("typeSelect").value,
            ConceptColor: document.getElementById("classColorChanger").value
        }
        conceptCreation(concept, x)

        console.log(original)

        massiveOfConcepts.push(concept)
        sessionStorage.setItem(`testConcept`, JSON.stringify(massiveOfConcepts))
        x++;
        sessionStorage.setItem('x', `${x}`);

        classCreationModal.style.display = "none";
        typeSelect.options[0].removeAttribute('selected');
        classCreationModal.style.left = 0 + 'px';
        classCreationModal.style.top = 0 + 'px';
    }
}

viewClass.onclick = function (){
    massiveOfConcepts = JSON.parse(sessionStorage.getItem("testConcept"))
    classViewModal.style.display = "block";
    document.body.style.position = 'fixed';
    document.body.overflowY = 'hidden';

    let classList = document.getElementById("classList");

    while (classList.firstChild) {
        classList.removeChild(classList.firstChild);
    }

    let tr = document.createElement("tr");
    let thName = document.createElement("th");
    let thType = document.createElement("th");

    thName.innerHTML = "Имена классов";
    thType.innerHTML = "Типы классов"
    tr.appendChild(thName);
    tr.appendChild(thType);
    classList.appendChild(tr);

    for(let i = 0; i < massiveOfConcepts.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute('id', `${i}`);
        let tdName = document.createElement("td");
        let tdType = document.createElement("td");

        tdName.innerHTML = massiveOfConcepts[i].ConceptName;
        tdType.innerHTML = massiveOfConcepts[i].ConceptType;
        tr.appendChild(tdName);
        tr.appendChild(tdType);
        classList.appendChild(tr);
    }

/*    classList.addEventListener('click', e => {
        let id = e.target.closest('tr').id;
        console.log(id);

        if (id) {
            classViewModal.style.display = "none";
            modal.style.display = "block";
            n.value = sessionStorage.getItem(`name ${id}`);
            nType.value = "Тип: " + sessionStorage.getItem(`Type ${id}`).toLowerCase();

            while (valuesOfClass.firstChild) {
                valuesOfClass.removeChild(valuesOfClass.firstChild);
            }

            let functions = document.getElementById('function');
            modalValues.value = "";
            if(sessionStorage.getItem(`Type ${id}`) === 'Формульный') {
                addModalValues.textContent = 'Добавить формулу в класс';
                let tr = document.createElement("tr");
                let thName = document.createElement("th");

                thName.innerHTML = "Формулы";
                tr.appendChild(thName);
                valuesOfClass.appendChild(tr);

                katex.render('', document.getElementById('formula'));

                phrase.style.display = 'none';
                functions.style.display = 'flex';

                functions.onclick = function(e){
                    let type, operations;
                    if(e.target.nextElementSibling !== null) {
                        type = e.target.nextElementSibling.tagName;
                        operations = document.getElementById(e.target.nextElementSibling.id);
                    }else{
                        type = 'zero';
                        operations = 'null';
                    }

                    if(operations!=='null' && operations.classList.contains('show') && type!== 'BUTTON'){
                        operations.classList.remove('show');
                    }else if(operations!=='null' && !operations.classList.contains('show') && type!== 'BUTTON'){
                        for(let i = 1; i<7; i++) {
                            document.getElementById(`functionList${i}`).classList.remove('show');
                        }
                        operations.classList.toggle('show');
                    }

                    if(type === 'BUTTON' || type === 'zero'){
                        stringCreation(e.target.id);
                        for(let i = 1; i<7; i++) {
                            document.getElementById(`functionList${i}`).classList.remove('show');
                        }
                    }
                }

                let modalVal
                modalValues.oninput = function () {
                    modalValues.value = modalValues.value.replace('*', `⨯`)
                    modalVal = modalValues.value;

                    katex.render(modalVal, document.getElementById('formula'));
                }

            }else{
                addModalValues.textContent = 'Добавить значение';

                let tr = document.createElement("tr");
                let thName = document.createElement("th");

                thName.innerHTML = "Значения";
                tr.appendChild(thName);
                valuesOfClass.appendChild(tr);

                let font = document.getElementById("valueList");
                font.style.fontSize = '16px';
                phrase.style.display = 'block'
                functions.style.display = 'none';
            }

            if(sessionStorage.getItem(`Type ${id}`) === 'Символьный') {
                if (sessionStorage.getItem(`valueStorage ${id}`) !== null) {
                    addModalValues.textContent = 'Добавить значение';
                    let massiveOfValues = sessionStorage.getItem(`valueStorage ${id}`).split(',');
                    console.log(massiveOfValues);

                    for (let i = 0; i < massiveOfValues.length; i++) {
                        let tr = document.createElement("tr");
                        tr.setAttribute('id', `${i + 1}`);
                        let tdName = document.createElement("td");

                        tdName.innerHTML = massiveOfValues[i];
                        tr.appendChild(tdName);
                        valuesOfClass.appendChild(tr);
                    }
                }
            }else if(sessionStorage.getItem(`Type ${id}`) === 'Формульный') {
                if (sessionStorage.getItem(`valueStorage ${id}`) !== null) {
                    addModalValues.textContent = 'Добавить формулу в класс';
                    let font = document.getElementById("valueList");
                    font.style.fontSize = '14pt';

                    let massiveOfValues = sessionStorage.getItem(`valueStorage ${id}`).split(',');
                    console.log(massiveOfValues);

                    for (let i = 0; i < massiveOfValues.length; i++) {
                        let tr = document.createElement("tr");
                        tr.setAttribute('id', `${i + 1}`);
                        let tdName = document.createElement("td");


                        let modalVal = massiveOfValues[i];

                        tdName.innerHTML = katex.renderToString(modalVal);
                        tr.appendChild(tdName);
                        valuesOfClass.appendChild(tr);
                    }
                }
            }

            addModalValues.onclick = function () {
                console.log(id);
                addModalValuesInStorage(id);
            }

            changeModalValues.onclick = function (){
                changeModalValueInStorage(id);
            }

            let btnClass = document.getElementById(`Concept ${id}`);

            if (btnClass.style.background === "") {
                newColorForm.value = '#2b2b2b';
                newColorForm.background = '#2b2b2b';
            } else {
                newColorForm.value = RGBToHex(btnClass.style.background);
                newColorForm.background = RGBToHex(btnClass.style.background)
            }

            let sortButtonAZ = document.getElementById("sortButtonAZ");
            let sortButtonZA = document.getElementById("sortButtonZA");

            sortButtonAZ.onclick = function () {
                let massiveOfValues = sessionStorage.getItem(`valueStorage ${id}`).split(',');

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
                        let tdName = document.createElement("td");

                        tdName.innerHTML = massiveOfValues[i];
                        tr.appendChild(tdName);
                        valuesOfClass.appendChild(tr);
                    }

                sessionStorage.setItem(`valueStorage ${id}`, `${massiveOfValues.sort()}`);
            }
            sortButtonZA.onclick = function () {
                let massiveOfValues = sessionStorage.getItem(`valueStorage ${id}`).split(',');

                massiveOfValues.sort();
                sessionStorage.setItem(`valueStorage ${id}`, `${massiveOfValues.reverse()}`);

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
                    let tdName = document.createElement("td");

                    tdName.innerHTML = massiveOfValues[i];
                    tr.appendChild(tdName);
                    valuesOfClass.appendChild(tr);
                }
            }

            formSave.onclick = function () {
                let rep = 0;
                btnClass.style.background = newColorForm.value;

                for (let j = 1; j < sessionStorage.getItem('x'); j++) {
                    if (j!==id && id!==1 && n.value.toLowerCase() === sessionStorage.getItem(`name ${j}`).toLowerCase()) {
                        repeat = 1;
                        n.style.color = '#db0000';
                        n.value = 'Имя занято';
                        n.setAttribute('disabled', 'disabled');
                        setTimeout(function (){
                            n.removeAttribute('disabled');
                            n.style.color = '#fff';
                            n.value = '';
                            n.focus();
                        },2000)
                        console.log("Повтор");
                    }
                }
                if (rep === 0 && n.value !=='' && n.value !=='Имя занято') {
                    btnClass.textContent = n.value;
                    sessionStorage.setItem(`name ${id}`, n.value);
                    modal.style.display = "none";
                }

                for(let i = 1; i<7; i++) {
                    document.getElementById(`functionList${i}`).classList.remove('show');
                }

                sessionStorage.setItem(`buttonColor ${id}`, newColorForm.value);
            }

            /!*deleteClassForm.onclick = function deleteClassButton() {
                sessionStorage.removeItem(`Concept ${id}`);
                sessionStorage.removeItem(`name ${id}`);
                sessionStorage.removeItem(`pos ${id}`);
                sessionStorage.removeItem(`left ${id}`);
                sessionStorage.removeItem(`top ${id}`);
                sessionStorage.removeItem(`height ${id}`);
                sessionStorage.removeItem(`width ${id}`);
                sessionStorage.removeItem(`buttonColor ${id}`);
                sessionStorage.removeItem(`CoordinateX ${id}`);
                sessionStorage.removeItem(`CoordinateY ${id}`);
                sessionStorage.removeItem(`Type ${id}`);
                sessionStorage.removeItem(`valueStorage ${id}`);

                btnClass.remove();

                for(let j = id; j < parseInt(sessionStorage.getItem(`x`)); j++) {
                    if(j+1!==parseInt(sessionStorage.getItem(`x`))) {
                        let button = document.getElementById(`Concept ${j+1}`)
                        button.id = `Concept ${j}`;

                        sessionStorage.setItem(`ConceptId ${j}`, `Concept ${j}`);
                        sessionStorage.setItem(`name ${j}`, button[j].textContent);
                        sessionStorage.setItem(`pos ${j}`, button[j].style.position);
                        sessionStorage.setItem(`left ${j}`, button[j].style.left);
                        sessionStorage.setItem(`top ${j}`, button[j].style.top);
                        sessionStorage.setItem(`height ${j}`, `${button[j].offsetHeight}`);
                        sessionStorage.setItem(`width ${j}`, `${button[j].offsetWidth}`);
                        sessionStorage.setItem(`CoordinateX ${j}`, `${button[j].getBoundingClientRect().x}`);
                        sessionStorage.setItem(`CoordinateY ${j}`, `${button[j].getBoundingClientRect().y}`);
                        sessionStorage.setItem(`Type ${j}`, document.getElementById("typeSelect").value);
                        sessionStorage.setItem(`buttonColor ${j}`, `${button[j].style.background}`);
                    }
                }

                x--;

                let countOfDeletedLinks = 0, countOfRel = 0;
                for (let j = 1; j < parseInt(sessionStorage.getItem(`countOfRelation`)) + 1; j++) {
                    console.log(sessionStorage.getItem(`RelationBetween ${j}`));
                    if(sessionStorage.getItem(`RelationBetween ${j}`).includes(`${id}`)){
                        sessionStorage.removeItem(`RelationBetween ${j}`)
                        sessionStorage.removeItem(`RelationName ${j}`)

                        links[j].remove();
                        countOfDeletedLinks++;
                    }

                }

                countOfRel = parseInt(sessionStorage.getItem(`countOfRelation`)) - countOfDeletedLinks;
                sessionStorage.setItem(`countOfRelation`, `${countOfRel}`)
                sessionStorage.setItem(`x`, `${x}`);

                location.reload();
            }*!/
            deleteClassForm.onclick = function deleteClassButton() {
                let conceptNow = parseInt(id)
                console.log(conceptNow)
                let conceptCount = parseInt(sessionStorage.getItem(`x`))

                for (let j = 1; j < conceptCount; j++) {
                    button[j] = document.getElementById(`Concept ${j}`)
                }

                for (let j = conceptNow; j < conceptCount; j++) {
                    if (j + 1 !== conceptCount) {
                        button[j] = button[j + 1];
                        button[j].id = `Concept ${j}`;

                        sessionStorage.setItem(`ConceptId ${j}`, `Concept ${j}`);
                        sessionStorage.setItem(`name ${j}`, button[j].textContent);
                        sessionStorage.setItem(`pos ${j}`, button[j].style.position);
                        sessionStorage.setItem(`left ${j}`, button[j].style.left);
                        sessionStorage.setItem(`top ${j}`, button[j].style.top);
                        sessionStorage.setItem(`height ${j}`, `${button[j].offsetHeight}`);
                        sessionStorage.setItem(`width ${j}`, `${button[j].offsetWidth}`);
                        sessionStorage.setItem(`CoordinateX ${j}`, `${button[j].getBoundingClientRect().x}`);
                        sessionStorage.setItem(`CoordinateY ${j}`, `${button[j].getBoundingClientRect().y}`);
                        sessionStorage.setItem(`Type ${j}`, sessionStorage.getItem(`Type ${j + 1}`));
                        sessionStorage.setItem(`buttonColor ${j}`, `${button[j].style.background}`);
                    }
                }

                sessionStorage.removeItem(`ConceptId ${conceptCount - 1}`)
                sessionStorage.removeItem(`name ${conceptCount - 1}`)
                sessionStorage.removeItem(`pos ${conceptCount - 1}`)
                sessionStorage.removeItem(`left ${conceptCount - 1}`)
                sessionStorage.removeItem(`top ${conceptCount - 1}`)
                sessionStorage.removeItem(`height ${conceptCount - 1}`)
                sessionStorage.removeItem(`width ${conceptCount - 1}`)
                sessionStorage.removeItem(`CoordinateX ${conceptCount - 1}`)
                sessionStorage.removeItem(`CoordinateY ${conceptCount - 1}`)
                sessionStorage.removeItem(`Type ${conceptCount - 1}`)
                sessionStorage.removeItem(`buttonColor ${conceptCount - 1}`)
                button.splice(conceptCount - 1, 1)

                let countOfRel;
                if(parseInt(sessionStorage.getItem(`countOfRelation`))!=null){
                    countOfRel = parseInt(sessionStorage.getItem(`countOfRelation`))
                }else{
                    countOfRel = 1
                }
                for (let j = 1; j < countOfRel + 1; j++) {
                    if (sessionStorage.getItem(`RelationBetween ${j}`).split(",").includes(`${conceptNow}`)) {
                        console.log(sessionStorage.getItem(`RelationBetween ${j}`))
                        for (let i = j; i < countOfRel + 1; i++) {
                            if (i !== countOfRel) {
                                links[i] = links[i + 1];

                                sessionStorage.setItem(`RelationName ${i}`, sessionStorage.getItem(`RelationName ${i + 1}`))
                                sessionStorage.setItem(`RelationBetween ${i}`, sessionStorage.getItem(`RelationBetween ${i + 1}`))
                                sessionStorage.setItem(`vertices ${i}`, sessionStorage.getItem(`vertices ${i + 1}`));
                            }
                        }

                        sessionStorage.removeItem(`RelationName ${countOfRel}`);
                        sessionStorage.removeItem(`RelationBetween ${countOfRel}`);
                        sessionStorage.removeItem(`vertices ${countOfRel}`);
                        links.splice(countOfRel, 1);

                        countOfRel--
                        j--
                        console.log(links)
                        console.log(countOfRel)
                    }
                }
                for (let i = 1; i < countOfRel + 1; i++) {
                    let newConnection = sessionStorage.getItem(`RelationBetween ${i}`).split(",")
                    if (newConnection[0] >= conceptNow ) {
                        newConnection[0]--
                    }
                    if (newConnection[1] >= conceptNow ) {
                        newConnection[1]--
                    }
                    sessionStorage.setItem(`RelationBetween ${i}`, `${newConnection}`)
                }



                x--;
                sessionStorage.setItem(`countOfRelation`, `${countOfRel}`)
                sessionStorage.setItem(`x`, `${x}`);
                location.reload();
            }
            return false;
        }
    });

    valuesOfClass.onclick = function (e) {
        if (sessionStorage.getItem(`Type ${id}`)!==`Неструктурированный`) {
            leftButton(e, id);
        }
    }

    valuesOfClass.oncontextmenu = function(e) {
        rightButton(e, id);
        return false;
    }*/
}
viewRelation.onclick = function (){
    relationViewModal.style.display = "block";
    document.body.style.position = 'fixed';
    document.body.overflowY = 'hidden';

    let relationList = document.getElementById("relationList");

    while (relationList.firstChild) {
        relationList.removeChild(relationList.firstChild);
    }

    let tr = document.createElement("tr");
    let thNumber = document.createElement("th");
    let thName = document.createElement("th");

    thNumber.innerHTML = "#"
    thName.innerHTML = "Имена отношений";
    tr.appendChild(thNumber);
    tr.appendChild(thName);
    relationList.appendChild(tr);

    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"));
    for(let i = 0; i < massiveOfRelation.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute('id', `${i}`);
        let tdName = document.createElement("td");
        let tdNumber = document.createElement("td");

        tdNumber.innerHTML = `${i+1}`
        tdName.innerHTML = massiveOfRelation[i].RelationName;
        tr.appendChild(tdNumber);
        tr.appendChild(tdName);
        relationList.appendChild(tr);
    }

    relationList.onclick = function (e){
        relationViewModal.style.display = "none"
        viewRelationClasses.style.display = "block"

        let id = e.target.closest('tr').id;

        buildTree(id)

        cancelShowingRelationClasses.onclick = function() {
            viewRelationClasses.style.display = "none";
            relationViewModal.style.display = "block"

            document.body.style.position = '';
            document.body.overflowY = '';
        }
        closeRelationShowingModal.onclick = function() {
            viewRelationClasses.style.display = "none";
            relationViewModal.style.display = "block"

            document.body.style.position = '';
            document.body.overflowY = '';
        }
    }
}

closeClassCreationModal.onclick = function() {
    classCreationModal.style.left = 0 + 'px';
    classCreationModal.style.top = 0 + 'px';
    typeSelect.options[0].removeAttribute('selected');
    classCreationModal.style.display = "none";
}
closeClassViewModal.onclick = function() {
    classViewModal.style.display = "none";
    document.body.style.position = '';
    document.body.overflowY = '';
}
closeRelationViewModal.onclick = function() {
    relationViewModal.style.display = "none";
    document.body.style.position = '';
    document.body.overflowY = '';
}

deleteAll.onclick = function deleteConcepts(){
    nameOfProject = sessionStorage.getItem("projectName")

    sessionStorage.clear();

    sessionStorage.setItem("projectName", `${nameOfProject}`)
    location.reload();
}

function isCorrect(className) {
    let massiveOfConcepts = JSON.parse(sessionStorage.getItem("testConcept"));
    let selectedType = document.getElementById("typeSelect").value;
    let isCorrect = true, nameIsReserved;
    for (let i = 0; i < massiveOfConcepts.length; i++) {
        if (className.value.toLowerCase() === massiveOfConcepts[i].ConceptName.toLowerCase()) {
            nameIsReserved = true;
            break;
        }
    }

    if(className.value === ""){
        className.style.color = '#db0000';
        className.value = 'Введите имя';
        className.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            className.removeAttribute('disabled');
            className.style.color = '#000';
            className.value = '';
            className.focus();
        }, 800)
        return false;
    }

    if (nameIsReserved === true) {
        className.style.color = '#db0000';
        className.value = 'Имя занято';
        className.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            className.removeAttribute('disabled');
            className.style.color = '#000';
            className.value = '';
            className.focus();
        }, 800)
        return false;
    }

    if (selectedType === "Выберите тип" || selectedType === "Тип не выбран") {
        typeSelect.options[0].textContent = "Тип не выбран";
        typeSelect.options[0].setAttribute('selected', 'selected');
        typeSelect.style.color = `#b11616`;
        setTimeout(function () {
            typeSelect.options[0].setAttribute('selected', 'selected');
            typeSelect.options[0].textContent = "Выберите тип";
            typeSelect.style.color = `#000000`;
        }, 800);
        return false;
    }

    return isCorrect;
}





