let findNeighborhoodModal = document.getElementById("findNeighborhoodModal");
let listOfClass = document.getElementById("listOfClass");
let listOfRelation = document.getElementById("listOfRelation");
let listOfConcepts = document.getElementById("listOfConcepts");
let listOfSecondClass = document.getElementById("listOfSecondClass");

let newOptionName, newValue, newOption;

function findNeighbors() {
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"))
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))

    findNeighborhoodModal.style.display = "block";

    for (let i = 0; i < massiveOfConcept.length; i++) {
        newOptionName = massiveOfConcept[i].ConceptName;
        newValue = i;

        newOption = new Option(newOptionName, newValue);
        listOfClass.options[listOfClass.options.length] = newOption;
    }

    for (let i = 0; i < massiveOfConcept.length; i++) {
        newOptionName = massiveOfConcept[i].ConceptName;
        newValue = i;

        newOption = new Option(newOptionName, newValue);
        listOfSecondClass.options[listOfSecondClass.options.length] = newOption;
    }

    let f, s;
    document.addEventListener("click", event => {
        if (event.target.classList.contains("select2-results__option--selected")) {

            let classId, massiveOfClassElements = [], massiveOfRelName = [],
                nameOfClass = document.getElementById("select2-listOfClass-container").textContent;

            for (let i = 0; i < massiveOfConcept.length; i++) {
                if (massiveOfConcept[i].ConceptName === nameOfClass) {
                    classId = i;
                }
            }

            while (listOfConcepts.firstChild) {
                listOfConcepts.removeChild(listOfConcepts.firstChild);
            }

            if (massiveOfConcept[classId].ConceptValues.length !== 0) {
                massiveOfClassElements = massiveOfConcept[classId].ConceptValues;
                for (let i = 0; i < massiveOfClassElements.length; i++) {
                    newOptionName = massiveOfClassElements[i];
                    newValue = i+1;

                    newOption = new Option(newOptionName, newValue);
                    listOfConcepts.options[listOfConcepts.options.length] = newOption;
                }
            }


            while (listOfRelation.firstChild) {
                listOfRelation.removeChild(listOfRelation.firstChild);
            }

            nameOfFirstClass = document.getElementById("select2-listOfClass-container").textContent;
            nameOfSecondClass = document.getElementById("select2-listOfSecondClass-container").textContent;
            for(let i = 0; i < massiveOfConcept.length; i++) {
                if(massiveOfConcept[i].ConceptName === nameOfFirstClass){
                    f = i;
                } else if(massiveOfConcept[i].ConceptName === nameOfSecondClass){
                    s = i;
                }
                if(nameOfFirstClass === nameOfSecondClass){
                    s = f;
                }
            }

            for(let i = 0; i < massiveOfRelation.length; i++){
                if(massiveOfRelation[i].RelationBetween.toString() === `${f},${s}`
                    || massiveOfRelation[i].RelationBetween.toString() === `${s},${f}`){
                    newOptionName = massiveOfRelation[i].RelationName;
                    newValue = i;

                    if (!massiveOfRelName.includes(newOptionName)) {
                        massiveOfRelName.push(newOptionName)
                        newOption = new Option(newOptionName, newValue);
                        listOfRelation.options[listOfRelation.options.length] = newOption;
                    }
                }
            }

        }
    }, false);
}

let nameOfFirstClass, nameOfSecondClass, nOfRelation, nameOfElement;
let idOfFirstClass, idOfSecondClass, idOfRelation, idOfElement;
let massiveOfEl = [], result = [], idCounter;

function buildNeighbors(){
    let massiveOfConcept = JSON.parse(sessionStorage.getItem("testConcept"))
    let massiveOfRelation = JSON.parse(sessionStorage.getItem("testRelation"))

    nameOfFirstClass = document.getElementById("select2-listOfClass-container").textContent;
    nameOfSecondClass = document.getElementById("select2-listOfSecondClass-container").textContent;
    nameOfElement = document.getElementById("select2-listOfConcepts-container").textContent;
    nOfRelation = document.getElementById("select2-listOfRelation-container").textContent;

    for(let i = 0; i < massiveOfConcept.length; i++) {
        if(massiveOfConcept[i].ConceptName === nameOfFirstClass){
            idOfFirstClass = i;
        }
        if(massiveOfConcept[i].ConceptName === nameOfSecondClass){
            idOfSecondClass = i;
        }
    }

    if(massiveOfConcept[idOfFirstClass].ConceptValues !== 0) {
        idOfElement = massiveOfConcept[idOfFirstClass].ConceptValues.indexOf(`${nameOfElement}`);
    }

    for (let i = 0; i < massiveOfRelation.length; i++) {
        if (massiveOfRelation[i].RelationName === nOfRelation
            && massiveOfRelation[i].RelationBetween.toString() === `${idOfFirstClass},${idOfSecondClass}`) {
            idOfRelation = i;
        }
    }

    let dataForBuildNetwork;
    massiveOfEl = massiveOfRelation[idOfRelation].RelationElementsInConnection[0][idOfElement];
    /*massiveOfEl = sessionStorage.getItem(`valueOfConnected ${idOfRelation}-${idOfElement}`)*/
    if(nameOfElement!=="") {
        if (massiveOfEl.length !== 0) {

            let options = {
                nodes: {
                    shape: "dot",
                    size: 4,
                },
                layout: {
                    hierarchical: {
                        direction: "UD",
                        levelSeparation: 40,
                        nodeSpacing: 150,
                    },
                },
                physics: false,
            };
            dataForBuildNetwork = fillNetworkInfo(nameOfElement, nOfRelation, nameOfSecondClass, massiveOfEl)
            buildNetwork(document.getElementById("listOfEndElements"), dataForBuildNetwork, options)

            saveNeighborhood.onclick = function (){
                findNeighborhoodModal.style.display = "none";
                saveNeighborhoodModal.style.display = "block";

                saveInNeighborhoodModal.onclick = function (){
                    operationName = document.getElementById("operationName").value;

                    if(massiveOfEl !== null){
                        if(sessionStorage.getItem(`resultCount`)!==null){
                            idCounter = parseInt(sessionStorage.getItem(`resultCount`));
                        }else{
                            idCounter = 0;
                        }
                        result[idCounter] = {
                            id: idCounter,
                            operationName: operationName,
                            from: nameOfFirstClass,
                            classElement: nameOfElement,
                            relationName: nOfRelation,
                            to: nameOfSecondClass,
                            operation: "Построение окрестности",
                            elements: massiveOfEl,
                            dataForTree: dataForBuildNetwork,
                        }
                        sessionStorage.setItem(`operationResult ${idCounter}`, JSON.stringify(result[idCounter]));
                        idCounter++;
                        sessionStorage.setItem(`resultCount`, `${idCounter}`);
                    }
                    saveNeighborhoodModal.style.display = "none";
                    findNeighborhoodModal.style.display = "block";
                }
            }
        } else {
            document.getElementById("listOfEndElements").textContent = "Окрестность пустая";
            setTimeout(function () {
                document.getElementById("listOfEndElements").textContent = "";
            }, 1000)
            /*katex.render(message, document.getElementById('listOfEndElements'));*/
        }
    }else{
        document.querySelector('span[aria-controls="select2-listOfConcepts-container"]').style.border = "solid red 2px"
        setTimeout(function () {
            document.querySelector('span[aria-controls="select2-listOfConcepts-container"]').style.border = "";
        }, 700)
    }
}

let closeSaveNeighborhoodModal = document.getElementById("closeSNeighborhoodModal");
closeSaveNeighborhoodModal.onclick = function(){
    saveNeighborhoodModal.style.display = "none";
    findNeighborhoodModal.style.display = "block";
}

let saveNeighborhood = document.getElementById("saveNeighborhood");
let saveNeighborhoodModal = document.getElementById("saveNeighborhoodModal");
let saveInNeighborhoodModal = document.getElementById("saveInNeighborhoodModal")
let operationName;

$(document).ready(function() {
    $('#listOfClass').select2({
        closeOnSelect: false,
        maximumSelectionLength: 2,
        language: "ru"});

    $('#listOfSecondClass').select2({
        closeOnSelect: false,
        maximumSelectionLength: 2,
        language: "ru"});

    $('#listOfConcepts').select2({
        maximumSelectionLength: 2,
        language: "ru"});

    $('#listOfRelation').select2({
        maximumSelectionLength: 2,
        language: "ru"});
});

let closeFNeighborhoodModal = document.getElementById("closeFNeighborhoodModal");
closeFNeighborhoodModal.onclick = function() {
    listOfClass = [];
    listOfSecondClass = [];

    findNeighborhoodModal.style.display = "none";
    katex.render('', document.getElementById('listOfEndElements'));
}