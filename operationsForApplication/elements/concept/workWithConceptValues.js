let functions = document.getElementById('function');
let valueList = document.getElementById('valueList');
let phrase = document.getElementById('search-text')

let modalValues = document.getElementById("modalValues");

let addModalValues = document.getElementById("addModalValues");
let changeModalValues = document.getElementById("changeModalValues");
let deleteModal = document.getElementById("deleteModal");

let clean = document.getElementById("clean")

let deleteValue = document.getElementById("deleteValue");
let cancelDeleteValue = document.getElementById("cancelDeleteValue");
let formSave = document.getElementById("saveForm");
let globalID, valueLeftId;

clean.onclick = function () {
    modalValues.value = ""
    katex.render("", document.getElementById('formula'));
}

phrase.onkeyup = function () {
    tableSearch();
}
formSave.onclick = function () {
    let className = document.getElementById("formName")
    let nameReserved = true;
    if(className.value === ""){
        className.style.color = '#db0000';
        className.value = 'Введите имя';
        className.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            className.removeAttribute('disabled');
            className.style.color = '#ffffff';
            className.value = '';
            className.focus();
        }, 800)
        return false;
    }
    for (let i = 0; i < massiveOfConcepts.length; i++) {
        if (className.value.toLowerCase() === massiveOfConcepts[i].ConceptName.toLowerCase() && i !== globalID) {
            nameReserved = false;
            break;
        }
    }
    if (nameReserved) {
        document.getElementById(`Concept ${globalID + 1}`).style.background = document.getElementById("formColorChanger").value;

        massiveOfConcepts[globalID].ConceptName = className.value;
        massiveOfConcepts[globalID].ConceptColor = document.getElementById("formColorChanger").value;
        sessionStorage.setItem("testConcept", JSON.stringify(massiveOfConcepts));

        document.getElementById(`Concept ${globalID + 1}`).textContent = className.value;
        document.getElementById("mainModal").style.display = "none";
    } else {
        className.style.color = '#db0000';
        className.value = 'Имя занято';
        className.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            className.removeAttribute('disabled');
            className.style.color = '#ffffff';
            className.value = '';
            className.focus();
        }, 800)
        return false;
    }
}

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

function formulaConcept(id) {
    massiveOfConcepts = JSON.parse(sessionStorage.getItem(`testConcept`))
    globalID = id;

    while (valueList.firstChild) {
        valueList.removeChild(valueList.firstChild);
    }

    addModalValues.textContent = 'Добавить формулу в класс';

    let tr = document.createElement("tr");
    let thName = document.createElement("th");

    thName.innerHTML = "Формулы";
    tr.appendChild(thName);
    valueList.appendChild(tr);

    let font = document.getElementById("valueList");
    font.style.fontSize = '14pt';

    phrase.style.display = 'none'
    functions.style.display = 'flex';

    functions.onclick = function (e) {
        let type, operations;
        if (e.target.nextElementSibling !== null) {
            type = e.target.nextElementSibling.tagName;
            operations = document.getElementById(e.target.nextElementSibling.id);
        } else {
            type = 'zero';
            operations = 'null';
        }

        if (operations !== 'null' && operations.classList.contains('show') && type !== 'BUTTON') {
            operations.classList.remove('show');
        } else if (operations !== 'null' && !operations.classList.contains('show') && type !== 'BUTTON') {
            for (let i = 1; i < 7; i++) {
                document.getElementById(`functionList${i}`).classList.remove('show');
            }
            operations.classList.toggle('show');
        }

        if (type === 'BUTTON' || type === 'zero') {
            stringCreation(e.target.id);
            for (let i = 1; i < 7; i++) {
                document.getElementById(`functionList${i}`).classList.remove('show');
            }
        }
    }

    let modalVal
    modalValues.oninput = function () {
        modalVal = modalValues.value;

        katex.render(modalVal, document.getElementById('formula'));
    }

    let fontOfList = document.getElementById("valueList");
    fontOfList.style.fontSize = '14pt';

    for (let i = 0; i < massiveOfConcepts[id].ConceptValues.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute('id', `${i}`);
        let tdName = document.createElement("td");

        let modalVal = massiveOfConcepts[id].ConceptValues[i];

        tdName.innerHTML = katex.renderToString(modalVal);
        tr.appendChild(tdName);
        valueList.appendChild(tr);
    }

    addModalValues.onclick = function () {
        addFormulaValue(id, massiveOfConcepts[id].ConceptValues, massiveOfConcepts[id].ConceptValues.length)
    }
    changeModalValues.onclick = function () {
        changeFormulaValue(id);
    }
    valueList.onclick = function (e) {
        leftButton(e);
    }
    valueList.oncontextmenu = function (e) {
        let itemId = e.target.closest('tr').id;
        deleteFormulaValue(id, massiveOfConcepts[id].ConceptValues, itemId)
        return false;
    }
}

function addFormulaValue(id, mov, length) {
    let massiveOfValues = mov;
    let modalVal = modalValues.value;

    if (isCorrectValue(massiveOfValues, modalVal)) {
        let tr = document.createElement("tr");
        tr.setAttribute('id', `${length}`);
        let tdName = document.createElement("td");

        massiveOfValues.push(modalVal);
        massiveOfConcepts[id].ConceptValues = massiveOfValues;
        sessionStorage.setItem("testConcept", JSON.stringify(massiveOfConcepts))

        tdName.innerHTML = katex.renderToString(modalVal);
        tr.appendChild(tdName);
        valueList.appendChild(tr);
    }
}

function changeFormulaValue(id) {
    let massiveOfValues = JSON.parse(sessionStorage.getItem(`testConcept`))[id].ConceptValues;
    let modalVal = modalValues.value;

    if (isCorrectValue(massiveOfValues, modalVal)) {
        massiveOfValues[valueLeftId] = modalValues.value;
        massiveOfConcepts[id].ConceptValues = massiveOfValues;
        sessionStorage.setItem("testConcept", JSON.stringify(massiveOfConcepts))
        changeModalValues.style.display = "none";

        while (valueList.firstChild) {
            valueList.removeChild(valueList.firstChild);
        }

        let tr = document.createElement("tr");
        let thName = document.createElement("th");

        thName.innerHTML = "Формулы";
        tr.appendChild(thName);
        valueList.appendChild(tr);

        for (let i = 0; i < massiveOfValues.length; i++) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `${i}`);
            let tdName = document.createElement("td");

            let modalVal = massiveOfValues[i];

            tdName.innerHTML = katex.renderToString(modalVal);
            tr.appendChild(tdName);
            valueList.appendChild(tr);
        }
    }
}

function deleteFormulaValue(id, mov, itemId) {
    let massiveOfValues = mov;
    let modalVal = modalValues.value;

    document.getElementById("mainModal").style.display = "none";

    deleteModal.style.display = "block";

    katex.render(massiveOfValues[itemId], document.getElementById('deleteModalName'));

    deleteValue.onclick = function () {
        massiveOfValues.splice(itemId, 1);
        massiveOfConcepts[id].ConceptValues = massiveOfValues;
        deleteRelationConnected(id, itemId)
        sessionStorage.setItem("testConcept", JSON.stringify(massiveOfConcepts))

        deleteModal.style.display = "none";
        document.getElementById("mainModal").style.display = "block";

        while (valueList.firstChild) {
            valueList.removeChild(valueList.firstChild);
        }

        let tr = document.createElement("tr");
        let thName = document.createElement("th");

        thName.innerHTML = "Формулы";
        tr.appendChild(thName);
        valueList.appendChild(tr);

        for (let i = 0; i < massiveOfValues.length; i++) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `${i}`);
            let tdName = document.createElement("td");

            let modalVal = massiveOfValues[i];

            tdName.innerHTML = katex.renderToString(modalVal);
            tr.appendChild(tdName);
            valueList.appendChild(tr);
        }
    }

    cancelDeleteValue.onclick = function () {
        document.body.style.position = '';
        document.body.style.overflowY = '';
        document.getElementById("mainModal").style.display = "block";
        deleteModal.style.display = "none";
    }
}


function restConcept(id) {
    massiveOfConcepts = JSON.parse(sessionStorage.getItem(`testConcept`))
    globalID = id;

    while (valueList.firstChild) {
        valueList.removeChild(valueList.firstChild);
    }

    addModalValues.textContent = 'Добавить значение';

    let tr = document.createElement("tr");
    let thName = document.createElement("th");

    thName.innerHTML = "Значения";
    tr.appendChild(thName);
    valueList.appendChild(tr);

    let font = document.getElementById("valueList");
    font.style.fontSize = '16px';

    phrase.style.display = 'block'
    functions.style.display = 'none';

    for (let i = 0; i < massiveOfConcepts[globalID].ConceptValues.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute('id', `${i}`);
        let tdName = document.createElement("td");

        tdName.innerHTML = massiveOfConcepts[id].ConceptValues[i];
        tr.appendChild(tdName);
        valueList.appendChild(tr);
    }
    addModalValues.onclick = function () {
        addSymbolicValue(id, massiveOfConcepts[id].ConceptValues, massiveOfConcepts[id].ConceptValues.length)
    }
    changeModalValues.onclick = function () {
        changeSymbolicValue(id, massiveOfConcepts[id].ConceptValues);
    }
    valueList.onclick = function (e) {
        leftButton(e);
    }
    valueList.oncontextmenu = function (e) {
        let itemId = e.target.closest('tr').id;
        deleteSymbolicValue(id, massiveOfConcepts[id].ConceptValues, itemId)
        return false;
    }
}

function addSymbolicValue(id, mov, length) {
    let massiveOfValues = mov;
    let modalVal = modalValues.value;

    if (isCorrectValue(massiveOfValues, modalVal)) {
        let tr = document.createElement("tr");
        tr.setAttribute('id', `${length}`);
        let tdName = document.createElement("td");

        massiveOfValues.push(modalVal);
        massiveOfConcepts[id].ConceptValues = massiveOfValues;
        sessionStorage.setItem("testConcept", JSON.stringify(massiveOfConcepts))

        tdName.innerHTML = modalVal
        tr.appendChild(tdName);
        valueList.appendChild(tr);
    }
}

function changeSymbolicValue(id, mov) {
    let massiveOfValues = mov;
    let modalVal = modalValues.value;

    if (isCorrectValue(massiveOfValues, modalVal)) {
        massiveOfValues[valueLeftId] = modalValues.value;
        massiveOfConcepts[id].ConceptValues = massiveOfValues;
        sessionStorage.setItem("testConcept", JSON.stringify(massiveOfConcepts))
        changeModalValues.style.display = "none";

        while (valueList.firstChild) {
            valueList.removeChild(valueList.firstChild);
        }

        let tr = document.createElement("tr");
        let thName = document.createElement("th");

        thName.innerHTML = "Значения";
        tr.appendChild(thName);
        valueList.appendChild(tr);

        for (let i = 0; i < massiveOfValues.length; i++) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `${i}`);
            let tdName = document.createElement("td");

            let modalVal = massiveOfValues[i];

            tdName.innerHTML = modalVal;
            tr.appendChild(tdName);
            valueList.appendChild(tr);
        }
    }
}

function deleteSymbolicValue(id, mov, itemId) {
    let massiveOfValues = mov;
    let modalVal = modalValues.value;
    document.getElementById("mainModal").style.display = "none";

    deleteModal.style.display = "block";

    document.getElementById('deleteModalName').textContent = massiveOfValues[itemId];

    deleteValue.onclick = function () {
        massiveOfValues.splice(itemId, 1);
        massiveOfConcepts[id].ConceptValues = massiveOfValues;
        deleteRelationConnected(id, itemId)
        sessionStorage.setItem("testConcept", JSON.stringify(massiveOfConcepts))

        deleteModal.style.display = "none";
        document.getElementById("mainModal").style.display = "block";

        while (valueList.firstChild) {
            valueList.removeChild(valueList.firstChild);
        }

        let tr = document.createElement("tr");
        let thName = document.createElement("th");

        thName.innerHTML = "Значения";
        tr.appendChild(thName);
        valueList.appendChild(tr);

        for (let i = 0; i < massiveOfValues.length; i++) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `${i}`);
            let tdName = document.createElement("td");

            let modalVal = massiveOfValues[i];

            tdName.innerHTML = modalVal;
            tr.appendChild(tdName);
            valueList.appendChild(tr);
        }
    }

    cancelDeleteValue.onclick = function () {
        document.body.style.position = '';
        document.body.style.overflowY = '';
        document.getElementById("mainModal").style.display = "block";
        deleteModal.style.display = "none";
    }
}

function deleteRelationConnected(conceptId, elementId) {
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))
    for (let i = 0; i < massiveOfRelation.length; i++) {
        if (massiveOfRelation[i].RelationBetween.includes(`${conceptId}`)) {
            console.log(massiveOfRelation[i])

            if (massiveOfRelation[i].RelationElementsInConnection.length !== 0
                && massiveOfRelation[i].RelationElementsInConnection[0].length !== 0) {

                console.log(elementId)

                let tempMassive = massiveOfRelation[i].RelationElementsInConnection[0]
                tempMassive.splice(elementId, 1)

                massiveOfRelation[i].RelationElementsInConnection[0]
                    = tempMassive

                sessionStorage.setItem("testRelation", JSON.stringify(massiveOfRelation));
            }
        }
    }
}


function isCorrectValue(values, modalValue) {
    let isCorrect = true;
    if (modalValue === "") {
        modalValues.style.color = '#db0000';
        modalValues.value = "Введите значение";
        modalValues.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            modalValues.removeAttribute('disabled');
            modalValues.style.color = '#000';
            modalValues.focus();
            modalValues.value = "";
        }, 800)
        return false;
    }

    if (modalValue === "Введите значение" || modalValue === "Уже присутствует") {
        return false;
    }

    if (values.includes(modalValue)) {
        modalValues.style.color = '#db0000';
        modalValues.value = "Уже присутствует";

        modalValues.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            modalValues.removeAttribute('disabled');
            modalValues.style.color = '#000';
            modalValues.focus();
            modalValues.value = modalValue;
        }, 800)
        return false;
    }
    return isCorrect
}

function stringCreation(name) {
    let temp, str;
    let val = modalValues.value;
    let length = val.slice(0, modalValues.selectionStart).length;
    let openWindow = document.getElementsByClassName('show')[0].id;
    let massiveOfSpecSymbols = ['rangle', 'langle', 'exists', 'forall', 'neg'];
    console.log(openWindow);
    if (length !== modalValues.value.length) {
        temp = name.replace(/\s/g, '');
        if (temp === "up") {
            modalValues.value = val.splice(length, 0, '^{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if (temp === "down") {
            modalValues.value = val.splice(length, 0, '_{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if (temp === "dfrac") {
            modalValues.value = val.splice(length, 0, '\\dfrac{}{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if (massiveOfSpecSymbols.includes(temp)) {
            modalValues.value = val.splice(length, 0, `\\` + temp + '{}');
            str = modalValues.value + '{}';
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if (openWindow === 'functionList7') {
            modalValues.value = val.splice(length, 0, `\\` + temp);
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else {
            modalValues.value = val.splice(length, 0, "{}\\" + temp + "{}");
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }
    } else {
        temp = name.replace(/\s/g, '');
        if (temp === "up") {
            modalValues.value = val.splice(length, 0, '^{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if (temp === "down") {
            modalValues.value = val.splice(length, 0, '_{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if (temp === "dfrac") {
            modalValues.value = val.splice(length, 0, '\\dfrac{a}{b}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if (massiveOfSpecSymbols.includes(temp)) {
            modalValues.value = val.splice(length, 0, `\\` + temp + '{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if (openWindow === "functionList7") {
            modalValues.value = val.splice(length, 0, `\\` + temp);
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else {
            temp = name.replace(/\s/g, '');
            str = modalValues.value + "\\" + temp;
            katex.render(str, document.getElementById('formula'));
            modalValues.value = val.splice(length, 0, "{}\\" + temp + "{}");
            modalValues.focus();
        }
    }
}

function tableSearch() {
    let table = document.getElementById('valueList');
    let regPhrase = new RegExp(phrase.value, 'i');
    let flag = false;
    for (let i = 1; i < table.rows.length; i++) {
        flag = false;
        for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }

    }
}

function leftButton(e) {
    document.getElementById("modalValues").focus();

    valueLeftId = e.target.closest('tr').id;
    console.log(valueLeftId)
    let massiveOfModalElements = JSON.parse(sessionStorage.getItem("testConcept"))[globalID].ConceptValues;

    if (massiveOfConcepts[globalID].ConceptType === "Формульный") {
        katex.render(massiveOfConcepts[globalID].ConceptValues[valueLeftId], document.getElementById('formula'));
        modalValues.value = massiveOfModalElements[valueLeftId];
    } else{
        console.log(massiveOfModalElements[valueLeftId])
        modalValues.value = massiveOfModalElements[valueLeftId];
    }


    changeModalValues.style.display = 'inline-block';
}
