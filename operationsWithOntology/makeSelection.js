let makeSelectionModal = document.getElementById("makeSelectionModal");
let listOfClassInSelectionBody = document.getElementById("listOfClassInSelectionBody");

let newOptionNameInMakeSelection, newValueInMakeSelection;

function makeSelection(){
    makeSelectionModal.style.display = "block";
    let massiveOfConcepts = JSON.parse(sessionStorage.getItem("testConcept"))

    for (let i = 0; i < massiveOfConcepts.length; i++) {
        newOptionNameInMakeSelection = massiveOfConcepts[i].ConceptName;
        newValueInMakeSelection = i;

        newOption = new Option(newOptionNameInMakeSelection, newValueInMakeSelection);
        listOfClassInSelectionBody.options[listOfClassInSelectionBody.options.length] = newOption;
    }
}

let buildSelection = document.getElementById("buildSelection");
let tempMassiveOfConceptElements;
buildSelection.onclick = function () {
    let massiveOfEl = [], idOfFirstClass, idCounter,
    nameOfFirstClass = document.getElementById("select2-listOfClassInSelectionBody-container").textContent;

    keyWord = document.getElementById("sampleFor").value

    let massiveOfConcepts = JSON.parse(sessionStorage.getItem("testConcept"))

    for (let i = 0; i < massiveOfConcepts.length; i++)
        if (massiveOfConcepts[i].ConceptName === nameOfFirstClass) {
            idOfFirstClass = i;
            tempMassiveOfConceptElements = massiveOfConcepts[i].ConceptValues;
        }

    for (let i = 0; i < tempMassiveOfConceptElements.length; i++) {
        if (tempMassiveOfConceptElements[i].toLowerCase().includes(keyWord.toLowerCase())) {
            massiveOfEl.push(tempMassiveOfConceptElements[i])
        }
    }

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
        let dataForBuildNetwork = fillNetworkInfo(nameOfFirstClass, "Contain: " + keyWord, "", massiveOfEl)
        buildNetwork(document.getElementById("treeBlockInSelectionBody"), dataForBuildNetwork, options)

        saveSelection.onclick = function () {
            makeSelectionModal.style.display = "none";
            saveSelectionModal.style.display = "block";

            saveInSelectionModal.onclick = function () {
                selectionName = document.getElementById("selectionName").value;

                if (massiveOfEl !== null) {
                    if (sessionStorage.getItem(`resultCount`) !== null) {
                        idCounter = parseInt(sessionStorage.getItem(`resultCount`));
                    } else {
                        idCounter = 0;
                    }
                    result[idCounter] = {
                        id: idCounter,
                        operationName: selectionName,
                        from: nameOfFirstClass,
                        classElement: "None",
                        relationName: keyWord,
                        to: "None",
                        operation: "Построение выборки",
                        elements: massiveOfEl,
                        dataForTree: dataForBuildNetwork
                    }
                    sessionStorage.setItem(`operationResult ${idCounter}`, JSON.stringify(result[idCounter]));
                    idCounter++;
                    sessionStorage.setItem(`resultCount`, `${idCounter}`);
                }
                saveSelectionModal.style.display = "none";
                makeSelectionModal.style.display = "block";
            }
        }
    } else {
        let message = "Окрестность пустая"
        document.getElementById("listOfEndElements").textContent = message;
        setTimeout(function () {
            document.getElementById("listOfEndElements").textContent = "";
        }, 1000)
        /*katex.render(message, document.getElementById('listOfEndElements'));*/
    }
}

let selectionName;
let saveSelection = document.getElementById("saveSelection");
let saveSelectionModal = document.getElementById("saveSelectionModal");
let saveInSelectionModal = document.getElementById("saveInSelectionModal")

$(document).ready(function() {
    $('#listOfClassInSelectionBody').select2({
        maximumSelectionLength: 2,
        language: "ru"});
});


let closeMakeSelectionModal = document.getElementById("closeMakeSelectionModal");
closeMakeSelectionModal.onclick = function() {
    listOfClassInSelectionBody = [];

    makeSelectionModal.style.display = "none";
    katex.render('', document.getElementById('treeBlockInSelectionBody'));
}