let makeInsertionModal = document.getElementById("makeInsertionModal");
let firstListOfOperationInInsertionBody = document.getElementById("firstListOfOperationInInsertionBody");
let secondListOfOperationInInsertionBody = document.getElementById("secondListOfOperationInInsertionBody");
let makeInsertButton = document.getElementById("makeInsert");
let saveInsertionButton = document.getElementById("saveInsertion")
let saveInInsertionModal = document.getElementById("saveInInsertionModal")
let saveInsertionModal = document.getElementById("saveInsertionModal")
let resetInsertionButton = document.getElementById("resetInsertion")
let showInsertionResult = document.getElementById("showInsertionResult")
let insertionModalName = document.getElementById("insertionModalName")
let cancelShowingInsertionResult = document.getElementById("cancelShowingInsertionResult")
let showFullSizeButton = document.getElementById("showFullSize")
let countOfOperationRepeat = 0;

let newOptionNameInInsertion, newValueInInsertion, newOptionForFirst, newOptionForSecond;

let informationAboutResultForFirstTree = [], informationAboutResultForSecondTree = [],
    firstOperationID, secondOperationID, nameOfFirstResult, nameOfSecondResult, wordForRepeat, insertionName,
    dataForFirstTree, dataForSecondTree, dataForResultTree,
    firstNetwork, secondNetwork,
    firstNetworkNode, secondNetworkNode = undefined, lastNodeNumber,
    tempIteration, nodeLevel, edgesForAdd = [];

function makeInsert() {
    sessionStorage.removeItem("tempTreeForInsertionBody")
    makeInsertionModal.style.display = "block";

    for (let i = 0; i < parseInt(sessionStorage.getItem("resultCount")); i++) {
        console.log(JSON.parse(sessionStorage.getItem(`operationResult ${i}`)))
        operationResult[i] = JSON.parse(sessionStorage.getItem(`operationResult ${i}`));
        newOptionNameInInsertion = operationResult[i].operationName;
        newValueInInsertion = i;

        newOptionForFirst = new Option(newOptionNameInInsertion, newValueInInsertion);
        newOptionForSecond = new Option(newOptionNameInInsertion, newValueInInsertion);
        firstListOfOperationInInsertionBody.options[firstListOfOperationInInsertionBody.options.length] = newOptionForFirst;
        secondListOfOperationInInsertionBody.options[secondListOfOperationInInsertionBody.options.length] = newOptionForSecond;
    }


    informationAboutResultForFirstTree = JSON.parse(sessionStorage.getItem(`operationResult ${0}`))
    dataForFirstTree = informationAboutResultForFirstTree.dataForTree
    dataForSecondTree = informationAboutResultForFirstTree.dataForTree

    firstOperationID = 0;
    secondOperationID = 0;

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
    };
    firstNetwork = buildNetwork(document.getElementById("firstTreeBlockInInsertionBody"), dataForFirstTree, options);
    secondNetwork = buildNetwork(document.getElementById("secondTreeBlockInInsertionBody"), dataForFirstTree, options);

    firstNetwork.on("click", function (target) {
        if(target.nodes.length !== 0) {
            console.log(target.nodes);
            firstNetworkNode = target.nodes[0];
            console.log(target);

            console.log(dataForFirstTree.nodes.length)
        }
    });
    secondNetwork.on("click", function (target) {
        if(target.nodes.length !== 0) {
            console.log(target.nodes);
            secondNetworkNode = target.nodes[0];
            console.log(target);

            console.log(dataForFirstTree.nodes.length)
        }
    });
}

document.addEventListener("click", event => {
    if (event.target.parentNode.id === "select2-firstListOfOperationInInsertionBody-results") {
        nameOfFirstResult = document.getElementById("select2-firstListOfOperationInInsertionBody-container").textContent
        nameOfSecondResult = document.getElementById("select2-secondListOfOperationInInsertionBody-container").textContent

        for (let i = 0; i < parseInt(sessionStorage.getItem("resultCount")); i++) {
            if (JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfFirstResult) {
                firstOperationID = i;
            }
            if (JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfSecondResult) {
                secondOperationID = i;
            }
        }

        informationAboutResultForFirstTree = JSON.parse(sessionStorage.getItem(`operationResult ${firstOperationID}`))
        informationAboutResultForSecondTree = JSON.parse(sessionStorage.getItem(`operationResult ${secondOperationID}`))
        console.log(informationAboutResultForFirstTree)

        dataForFirstTree = informationAboutResultForFirstTree.dataForTree
        console.log(dataForFirstTree.nodes)
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
        };
        firstNetwork = buildNetwork(document.getElementById("firstTreeBlockInInsertionBody"), dataForFirstTree, options);
        firstNetwork.on("click", function (target) {
            if (target.nodes.length !== 0) {
                console.log(target.nodes);
                firstNetworkNode = target.nodes[0];
                console.log(target);

                console.log(dataForFirstTree.nodes.length)
            }
        });
    }
})

makeInsertButton.onclick = function () {
    createGraph()

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
        edges: {
            "smooth": {
                "roundness": 0.4,
            }
        },
        physics: false,
    };
    firstNetwork = buildNetwork(document.getElementById("firstTreeBlockInInsertionBody"), dataForResultTree, options);
    firstNetwork.on("click", function (target) {
        if(target.nodes.length !== 0) {
            console.log(target.nodes);
            firstNetworkNode = target.nodes[0];
            console.log(target);

            console.log(dataForResultTree.nodes.length)
        }
    });
}
showFullSizeButton.onclick = function () {
    let tempNetworkNode = firstNetworkNode
    resetGraph()
    firstNetworkNode = tempNetworkNode
    createGraph()
    showInsertionResult.style.display = "block"
    let insertionType
    if(document.getElementById('rightInsertion').checked) {
        insertionType = "Правая"
    }else{
        insertionType = "Левая"
    }
    insertionModalName.textContent = `Результат вставки ${nameOfSecondResult} в ${nameOfFirstResult}. Тип вставки - ${insertionType}`

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
        edges: {
            "smooth": {
                "roundness": 0.4,
            }
        },
        physics: false,
    };
    firstNetwork = buildNetwork(document.getElementById("insertionShowingBlock"), dataForResultTree, options);
    cancelShowingInsertionResult.onclick = function(){
        showInsertionResult.style.display = "none";
        resetGraph()
    }
}
resetInsertionButton.onclick = function (){
    resetGraph()
}
saveInsertionButton.onclick = function (){
    makeInsertionModal.style.display = "none";
    saveInsertionModal.style.display = "block";

    nameOfFirstResult = document.getElementById("select2-firstListOfOperationInInsertionBody-container").textContent
    nameOfSecondResult = document.getElementById("select2-secondListOfOperationInInsertionBody-container").textContent

    saveInInsertionModal.onclick = function () {
        insertionName = document.getElementById("insertionName").value;

        if (sessionStorage.getItem(`resultCount`) !== null) {
            idCounter = parseInt(sessionStorage.getItem(`resultCount`));
        } else {
            idCounter = 0;
        }
        result[idCounter] = {
            id: idCounter,
            operationName: insertionName,
            from: nameOfFirstResult,
            classElement: "None",
            relationName: keyWord,
            to: nameOfSecondResult,
            operation: "Выполнение вставки",
            elements: [],
            dataForTree: dataForResultTree
        }
        sessionStorage.setItem(`operationResult ${idCounter}`, JSON.stringify(result[idCounter]));
        idCounter++;
        sessionStorage.setItem(`resultCount`, `${idCounter}`);

        saveInsertionModal.style.display = "none";
        makeInsertionModal.style.display = "block";
    }
}

document.addEventListener("click", event => {
    if (event.target.parentNode.id === "select2-secondListOfOperationInInsertionBody-results") {
        nameOfSecondResult = document.getElementById("select2-secondListOfOperationInInsertionBody-container").textContent

        for(let i = 0; i < parseInt(sessionStorage.getItem("resultCount")); i++)
        {
            if(JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfSecondResult){
                secondOperationID = i;
            }
        }

        informationAboutResultForSecondTree = JSON.parse(sessionStorage.getItem(`operationResult ${secondOperationID}`))
        console.log(informationAboutResultForSecondTree)

        dataForSecondTree = informationAboutResultForSecondTree.dataForTree
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
        };
        secondNetwork = buildNetwork(document.getElementById("secondTreeBlockInInsertionBody"), dataForSecondTree, options);
        secondNetwork.on("click", function (params) {
            secondNetworkNode = params.nodes[0];
            console.log(params.nodes);

            console.log(dataForSecondTree.nodes)
        });
    }
})

$(document).ready(function() {
    $('#firstListOfOperationInInsertionBody').select2({
        closeOnSelect: false,
        maximumSelectionLength: 2,
        language: "ru"});

    $('#secondListOfOperationInInsertionBody').select2({
        closeOnSelect: false,
        maximumSelectionLength: 2,
        language: "ru"});
});

let closeMakeInsertionModal = document.getElementById("closeMakeInsertionModal");
let closeInsertionShowingModal = document.getElementById("closeInsertionShowingModal");

closeInsertionShowingModal.onclick = function() {
    showInsertionResult.style.display = "none";

    resetGraph()
}

closeMakeInsertionModal.onclick = function() {
    firstListOfOperationInInsertionBody.length = 0;
    secondListOfOperationInInsertionBody.length = 0;

    countOfOperationRepeat = 0;
    edgesForAdd = []

    makeInsertionModal.style.display = "none";
    katex.render('', document.getElementById('firstTreeBlockInInsertionBody'));
    katex.render('', document.getElementById('secondTreeBlockInInsertionBody'));
    sessionStorage.removeItem("tempTreeForInsertionBody")
}

function createGraph(){
    nameOfFirstResult = document.getElementById("select2-firstListOfOperationInInsertionBody-container").textContent
    nameOfSecondResult = document.getElementById("select2-secondListOfOperationInInsertionBody-container").textContent

    console.log(nameOfFirstResult)
    console.log(nameOfSecondResult)

    for (let i = 0; i < parseInt(sessionStorage.getItem("resultCount")); i++) {
        if (JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfFirstResult) {
            firstOperationID = i;
        }
        if (JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfSecondResult) {
            secondOperationID = i;
        }
    }

    informationAboutResultForFirstTree = JSON.parse(sessionStorage.getItem(`operationResult ${firstOperationID}`))
    informationAboutResultForSecondTree = JSON.parse(sessionStorage.getItem(`operationResult ${secondOperationID}`))

    dataForFirstTree = informationAboutResultForFirstTree.dataForTree
    dataForSecondTree = informationAboutResultForSecondTree.dataForTree

    dataForResultTree = [];
    if(sessionStorage.getItem("tempTreeForInsertionBody")!==null){
        dataForResultTree = JSON.parse(sessionStorage.getItem("tempTreeForInsertionBody"))
    }else {
        dataForResultTree = dataForFirstTree;
    }

    nodeLevel = dataForResultTree.nodes.find(object => object.id === firstNetworkNode).level;
    lastNodeNumber = parseInt(dataForResultTree.nodes[dataForResultTree.nodes.length - 1].id.match(/\d+/)) + 1
    console.log(lastNodeNumber)

    tempIteration = 0;
    while(dataForResultTree.nodes.find(object => object.id.match(`OR-${tempIteration}-${secondOperationID}`))!==undefined){
        tempIteration++;
    }

    wordForRepeat = `OR-${tempIteration}-${secondOperationID}`
    console.log(dataForSecondTree.nodes)
    for (let i = 0; i < dataForSecondTree.nodes.length; i++) {
        dataForResultTree.nodes.push({
            id: dataForSecondTree.nodes[i].id + wordForRepeat,
            label: dataForSecondTree.nodes[i].label,
            level: nodeLevel + dataForSecondTree.nodes[i].level + 1,
        })
    }
    if(secondNetworkNode === undefined) {
        secondNetworkNode = dataForSecondTree.nodes[dataForSecondTree.nodes.findIndex(object => object.level === 0)].id
    }

    edgesForAdd.push(firstNetworkNode)
    for (let i = 0; i < dataForResultTree.edges.length; i++) {
        if (edgesForAdd.includes(dataForResultTree.edges[i].from)) {
            edgesForAdd.push(dataForResultTree.edges[i].to)
        }
    }

    console.log(edgesForAdd)

    for (let i = 0; i < dataForResultTree.nodes.length; i++) {
        if (edgesForAdd.includes(dataForResultTree.nodes[i].id)) {
            dataForResultTree.nodes[i].level += 1
        }
    }

    dataForResultTree.nodes.push({
        id: "SpaceNode" + countOfOperationRepeat,
        label: "",
        level: dataForResultTree.nodes.find(object => object.id === firstNetworkNode).level - 1,
        color: "#97c2fc",
    })
    dataForResultTree.edges[dataForResultTree.edges.findIndex(object => object.to === firstNetworkNode)].to = "SpaceNode" + countOfOperationRepeat

    if(document.getElementById('rightInsertion').checked) {
        dataForResultTree.edges.push({
            id: "NewSpaceEdge-1" + "-" + countOfOperationRepeat,
            from: "SpaceNode" + countOfOperationRepeat,
            to: firstNetworkNode,
            color: "#97c2fc",
        })
        dataForResultTree.edges.push({
            id: "NewSpaceEdge-2" + "-" + countOfOperationRepeat,
            from: "SpaceNode" + countOfOperationRepeat,
            to: dataForResultTree.nodes.find(object => object.id === secondNetworkNode).id + wordForRepeat,
            color: "#97c2fc",
        })
    }else{
        dataForResultTree.edges.push({
            id: "NewSpaceEdge-1" + "-" + countOfOperationRepeat,
            from: "SpaceNode" + countOfOperationRepeat,
            to: dataForResultTree.nodes.find(object => object.id === secondNetworkNode).id + wordForRepeat,
            color: "#97c2fc",
        })
        dataForResultTree.edges.push({
            id: "NewSpaceEdge-2" + "-" + countOfOperationRepeat,
            from: "SpaceNode" + countOfOperationRepeat,
            to: firstNetworkNode,
            color: "#97c2fc",
        })
    }

    countOfOperationRepeat++

    console.log(dataForResultTree)

    for (let i = 0; i < dataForSecondTree.edges.length; i++) {
        dataForResultTree.edges.push({
            id: dataForSecondTree.edges[i].id + wordForRepeat,
            from: dataForSecondTree.edges[i].from + wordForRepeat,
            to: dataForSecondTree.edges[i].to + wordForRepeat,
            color: "#97c2fc",
        })
    }

    sessionStorage.setItem("tempTreeForInsertionBody", JSON.stringify(dataForResultTree))
    sessionStorage.setItem("countOfOperationRepeat", countOfOperationRepeat)
}
function resetGraph(){
    sessionStorage.removeItem("tempTreeForInsertionBody")
    firstNetworkNode = undefined
    secondNetworkNode = undefined

    nameOfFirstResult = document.getElementById("select2-firstListOfOperationInInsertionBody-container").textContent
    nameOfSecondResult = document.getElementById("select2-secondListOfOperationInInsertionBody-container").textContent

    for (let i = 0; i < parseInt(sessionStorage.getItem("resultCount")); i++) {
        if (JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfFirstResult) {
            firstOperationID = i;
        }
        if (JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfSecondResult) {
            secondOperationID = i;
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
                levelSeparation: 40,
                nodeSpacing: 200,
            },
        },
        physics: false,
    };
    informationAboutResultForFirstTree = JSON.parse(sessionStorage.getItem(`operationResult ${firstOperationID}`))
    informationAboutResultForSecondTree = JSON.parse(sessionStorage.getItem(`operationResult ${secondOperationID}`))
    dataForFirstTree = informationAboutResultForFirstTree.dataForTree
    dataForSecondTree = informationAboutResultForSecondTree.dataForTree


    firstNetwork = buildNetwork(document.getElementById("firstTreeBlockInInsertionBody"), dataForFirstTree, options);
    secondNetwork = buildNetwork(document.getElementById("secondTreeBlockInInsertionBody"), dataForSecondTree, options);

    edgesForAdd = []
    countOfOperationRepeat = 0;

    firstNetwork.on("click", function (target) {
        if(target.nodes.length !== 0) {
            console.log(target.nodes);
            firstNetworkNode = target.nodes[0];
            console.log(target);

            console.log(dataForFirstTree.nodes.length)
        }
    });
    secondNetwork.on("click", function (target) {
        if(target.nodes.length !== 0) {
            console.log(target.nodes);
            secondNetworkNode = target.nodes[0];
            console.log(target);

            console.log(dataForFirstTree.nodes.length)
        }
    });
}