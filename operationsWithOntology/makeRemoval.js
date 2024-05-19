let makeRemovalModal = document.getElementById("makeRemovalModal");
let listOfOperationInRemovalBody = document.getElementById("listOfOperationInRemovalBody");
let makeRemoveButton = document.getElementById("makeRemove");
let saveRemoveButton = document.getElementById("saveRemoval")
let saveRemovalModal = document.getElementById("saveRemovalModal")
let saveInRemovalModal = document.getElementById("saveInRemovalModal")
let resetRemoveButton = document.getElementById("resetRemoval")

let options = {
    nodes: {
        shape: "dot",
        size: 6,
    },
    layout: {
        hierarchical: {
            direction: "UD",
            levelSeparation: 60,
            nodeSpacing: 150,
        },
    },
    physics: false,
};

let newOptionNameInRemoval, newValueInRemoval, newOptionInRemoval;

let informationAboutResultForTree = [],
    dataForTree, dataForResultRemovalTree,
    networkInRemovalModal, lastEdgeNumber,
    networkNodeInRemoval, edgesForDelete = [], networkNodeLabel;

let keyWord;

function makeRemove() {
    makeRemovalModal.style.display = "block";

    for (let i = 0; i < parseInt(sessionStorage.getItem("resultCount")); i++) {
        operationResult[i] = JSON.parse(sessionStorage.getItem(`operationResult ${i}`));
        newOptionNameInRemoval = operationResult[i].operationName;
        newValueInRemoval = i;

        newOptionInRemoval = new Option(newOptionNameInRemoval, newValueInRemoval);
        listOfOperationInRemovalBody.options[listOfOperationInRemovalBody.options.length] = newOptionInRemoval;
    }

    informationAboutResultForTree = JSON.parse(sessionStorage.getItem(`operationResult ${0}`))
    dataForTree = informationAboutResultForTree.dataForTree

    networkInRemovalModal = buildNetwork(document.getElementById("treeBlockInRemovalBody"), dataForTree, options);

    networkInRemovalModal.on("click", function (target) {
        if(target.nodes.length !== 0) {
            console.log(target.nodes);
            networkNodeInRemoval = target.nodes[0];
            console.log(target);

            console.log(dataForTree.nodes.length)
        }
    });
}

document.onclick = function(event) {
    if (event.target.parentNode.id === "select2-listOfOperationInRemovalBody-results") {
        nameOfFirstResult = document.getElementById("select2-listOfOperationInRemovalBody-container").textContent

        for (let i = 0; i < parseInt(sessionStorage.getItem("resultCount")); i++) {
            if (JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfFirstResult) {
                firstOperationID = i;
            }
        }

        informationAboutResultForTree = JSON.parse(sessionStorage.getItem(`operationResult ${firstOperationID}`))
        console.log(informationAboutResultForTree)

        dataForTree = informationAboutResultForTree.dataForTree
        console.log(dataForTree.nodes)
        console.log(dataForTree.edges)

        networkInRemovalModal = buildNetwork(document.getElementById("treeBlockInRemovalBody"), dataForTree, options);
        networkInRemovalModal.on("click", function (target) {
            if (target.nodes.length !== 0) {
                console.log(target.nodes);
                networkNodeInRemoval = target.nodes[0];
                console.log(target);

                console.log(dataForTree.nodes.length)
            }
        });
    }
}
makeRemoveButton.onclick = function () {

    nodeLevel = dataForTree.nodes.find(object => object.id === networkNodeInRemoval).level;
    dataForResultRemovalTree = [];
    dataForResultRemovalTree = dataForTree;
    lastEdgeNumber = parseInt(dataForTree.edges[dataForTree.edges.length - 1].id.match(/\d+/)) + 1
    console.log(lastEdgeNumber)

    edgesForDelete = []

    networkNodeLabel = dataForResultRemovalTree.nodes[dataForResultRemovalTree.nodes.findIndex(object => object.id === networkNodeInRemoval)].label

    if(networkNodeInRemoval!=="Node-2" && networkNodeInRemoval!=="Node-1") {
        console.log(networkNodeInRemoval)
        edgesForDelete.push(networkNodeInRemoval)

        if (dataForResultRemovalTree.edges.findIndex(object => object.from === networkNodeInRemoval)!==-1) {
            for (let i = 0; i < dataForResultRemovalTree.edges.length; i++) {
                if (edgesForDelete.includes(dataForResultRemovalTree.edges[i].from)) {
                    edgesForDelete.push(dataForResultRemovalTree.edges[i].to)
                    dataForResultRemovalTree.nodes.splice(dataForResultRemovalTree.nodes.findIndex(object => object.id === dataForResultRemovalTree.edges[i].to), 1);

                    dataForResultRemovalTree.edges.splice(i, 1)
                    i--
                }
            }
            console.log(dataForResultRemovalTree)
        }else if(dataForResultRemovalTree.edges.findIndex(object => object.from === networkNodeInRemoval)===-1) {
            console.log("Here we go")

            dataForResultRemovalTree.nodes.splice(dataForResultRemovalTree.nodes.findIndex(object => object.id === networkNodeInRemoval), 1)
            dataForResultRemovalTree.edges.splice(dataForResultRemovalTree.edges.findIndex(object => object.to === networkNodeInRemoval),1)
        }
    }else if (networkNodeInRemoval==="Node-2" || networkNodeInRemoval==="Node-1"){
        dataForResultRemovalTree = []
    }


    console.log(dataForResultRemovalTree)

    networkInRemovalModal = buildNetwork(document.getElementById("treeBlockInRemovalBody"), dataForResultRemovalTree, options);
    networkInRemovalModal.on("click", function (target) {
        if(target.nodes.length !== 0) {
            console.log(target.nodes);
            networkNodeInRemoval = target.nodes[0];
            console.log(target);

            console.log(dataForTree.nodes.length)
        }
    });
}
resetRemoveButton.onclick = function (){
    nameOfFirstResult = document.getElementById("select2-listOfOperationInRemovalBody-container").textContent
    console.log(nameOfFirstResult)

    for (let i = 0; i < parseInt(sessionStorage.getItem("resultCount")); i++) {
        if (JSON.parse(sessionStorage.getItem(`operationResult ${i}`)).operationName === nameOfFirstResult) {
            firstOperationID = i;
        }
    }

    informationAboutResultForTree = JSON.parse(sessionStorage.getItem(`operationResult ${firstOperationID}`))
    dataForTree = informationAboutResultForTree.dataForTree

    networkInRemovalModal = buildNetwork(document.getElementById("treeBlockInRemovalBody"), dataForTree, options);
    networkNodeInRemoval = ""
    networkInRemovalModal.on("click", function (target) {
        if(target.nodes.length !== 0) {
            console.log(target.nodes);
            networkNodeInRemoval = target.nodes[0];
            console.log(target);

            console.log(dataForTree.nodes.length)
        }
    });
}
saveRemoveButton.onclick = function (){
    makeRemovalModal.style.display = "none";
    saveRemovalModal.style.display = "block";

    nameOfFirstResult = document.getElementById("select2-listOfOperationInRemovalBody-container").textContent

    saveInRemovalModal.onclick = function () {
        let removalName = document.getElementById("removalName").value;

        if (sessionStorage.getItem(`resultCount`) !== null) {
            idCounter = parseInt(sessionStorage.getItem(`resultCount`));
        } else {
            idCounter = 0;
        }
        result[idCounter] = {
            id: idCounter,
            operationName: removalName,
            from: nameOfFirstResult,
            classElement: "None",
            relationName: keyWord,
            to: nameOfSecondResult,
            operation: "Выполнение удаления",
            elements: [],
            dataForTree: dataForTree
        }
        sessionStorage.setItem(`operationResult ${idCounter}`, JSON.stringify(result[idCounter]));
        idCounter++;
        sessionStorage.setItem(`resultCount`, `${idCounter}`);

        saveRemovalModal.style.display = "none";
        makeRemovalModal.style.display = "block";
    }
}

$(document).ready(function() {
    $('#listOfOperationInRemovalBody').select2({
        closeOnSelect: false,
        maximumSelectionLength: 2,
        language: "ru"});
});
let closeMakeRemovalModal = document.getElementById("closeMakeRemovalModal");
closeMakeRemovalModal.onclick = function() {
    listOfOperationInRemovalBody.length = 0;

    makeRemovalModal.style.display = "none";
    katex.render('', document.getElementById('treeBlockInRemovalBody'));
}