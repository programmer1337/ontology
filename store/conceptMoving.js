/*
if(sessionStorage.getItem('k') == null) {
    k = 1;
}else {
    k = sessionStorage.getItem('k');
}


let deleteClassForm = document.getElementById("deleteClassForm");

let changeModalValues = document.getElementById("changeModalValues");


let nType = document.getElementById("formType");
let newColorForm = document.getElementById("formColorChanger");
let cleanStrokeButton = document.getElementById("clean");
let span = document.getElementById("closeModalForm");

let button = [], arrayOfLinks = [], Values = [], rep;

for (let i = 1; i < x; i++) {
    if(sessionStorage.getItem(`ConceptId ${i}`)!==null) {

        button[i] = document.getElementById(`Concept ${i}`);

        button[i].onmousedown = function (e) {
            if (e.which === 1) {
                let coords = getCoords(button[i]);
                let shiftX = e.pageX - coords.left;
                let shiftY = e.pageY - coords.top;

                button[i].style.position = 'absolute';
                /!*moveAt(e);*!/

                button[i].style.zIndex = '15';


                function moveAt(e) {
                    button[i].style.left = e.pageX - shiftX + 'px';
                    button[i].style.top = e.pageY - shiftY + 'px';
                }

                document.onmousemove = function (e) {
                    moveAt(e);
                    updateLine();
                };

                button[i].onmouseup = function () {
                    sessionStorage.setItem(`pos ${i}`, button[i].style.position);
                    sessionStorage.setItem(`left ${i}`, button[i].style.left);
                    sessionStorage.setItem(`top ${i}`, button[i].style.top);
                    sessionStorage.setItem(`CoordinateX ${i}`, `${button[i].getBoundingClientRect().x}`);
                    sessionStorage.setItem(`CoordinateY ${i}`, `${button[i].getBoundingClientRect().y}`);

                    document.onmousemove = null;
                    button[i].style.zIndex = '14';
                    button[i].onmouseup = null;
                };

            }

            button[i].ondragstart = function () {
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

        button[i].oncontextmenu = function (e) {
            console.log(i)
            console.log(sessionStorage.getItem(`name ${i}`))

           if (button[i].style.background === "") {
               newColorForm.value = '#2b2b2b';
               newColorForm.background = '#2b2b2b';
           } else {
               newColorForm.value = RGBToHex(button[i].style.background);
               newColorForm.background = RGBToHex(button[i].style.background)
           }

           n.value = sessionStorage.getItem(`name ${i}`);
           nType.value = "Тип: " + sessionStorage.getItem(`Type ${i}`).toLowerCase();
           katex.render('', document.getElementById('formula'));

           modal.style.display = "block";
           document.body.style.position = 'fixed';
           document.body.style.overflowY = 'hidden';

           let sortButtonAZ = document.getElementById("sortButtonAZ");
           let sortButtonZA = document.getElementById("sortButtonZA");

           sortButtonAZ.onclick = function () {
               let massiveOfValues = sessionStorage.getItem(`valueStorage ${i}`).split(',');
               let valuesOfClass = document.getElementById('valueList');

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

               sessionStorage.setItem(`valueStorage ${i}`, `${massiveOfValues.sort()}`);
           }
           sortButtonZA.onclick = function () {
               let valuesOfClass = document.getElementById('valueList');
               let massiveOfValues = sessionStorage.getItem(`valueStorage ${i}`).split(',');

               massiveOfValues.sort();
               sessionStorage.setItem(`valueStorage ${i}`, `${massiveOfValues.reverse()}`);

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

           let valuesOfClass = document.getElementById('valueList');
           let functions = document.getElementById('function');

           while (valuesOfClass.firstChild) {
               valuesOfClass.removeChild(valuesOfClass.firstChild);
           }

           modalValues.value = "";
           if (sessionStorage.getItem(`Type ${i}`) === 'Формульный') {
               addModalValues.textContent = 'Добавить формулу в класс';

               let tr = document.createElement("tr");
               let thName = document.createElement("th");

               thName.innerHTML = "Формулы";
               tr.appendChild(thName);
               valuesOfClass.appendChild(tr);

               let font = document.getElementById("valueList");
               font.style.fontSize = '14pt';

               phrase.style.display = 'none';
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
                       console.log('i see u');
                   }
               }

               let modalVal
               modalValues.oninput = function () {
                   modalVal = modalValues.value;

                   katex.render(modalVal, document.getElementById('formula'));
               }

               if (sessionStorage.getItem(`valueStorage ${i}`) !== null) {
                   addModalValues.textContent = 'Добавить формулу в класс';
                   let massiveOfValues = sessionStorage.getItem(`valueStorage ${i}`).split(',');
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
           }else {
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

               if (sessionStorage.getItem(`valueStorage ${i}`) !== null) {
                   let massiveOfValues = sessionStorage.getItem(`valueStorage ${i}`).split(',');

                   for (let i = 0; i < massiveOfValues.length; i++) {
                       let tr = document.createElement("tr");
                       tr.setAttribute('id', `${i + 1}`);
                       tr.setAttribute('href', `${modalValues.value}`);

                       let tdName = document.createElement("td");
                       tdName.setAttribute('href', `${modalValues.value}`);
                       tdName.innerHTML = massiveOfValues[i];

                       tr.appendChild(tdName);
                       valuesOfClass.appendChild(tr);
                   }
               }
           }

            addModalValues.onclick = function () {
                console.log(i);
                addModalValuesInStorage(i);
            }

            changeModalValues.onclick = function (){
                changeModalValueInStorage(i);
            }

            valueList.onclick = function (e) {
                if (`Type ${i}`!==`Неструктурированный`) {
                    leftButton(e, i);
                }
            }

            valueList.oncontextmenu = function (e) {
                rightButton(e, i);
                return false;
            }

            formSave.onclick = function () {
                rep = 0;
                button[i].style.background = newColorForm.value;

                for (let j = 1; j < sessionStorage.getItem('x'); j++) {
                    if (n.value.toLowerCase() === sessionStorage.getItem(`name ${j}`).toLowerCase() && j !== i) {
                        repeat = 1;
                        n.style.color = '#db0000';
                        n.value = 'Имя занято';
                        n.setAttribute('disabled', 'disabled');
                        setTimeout(function () {
                            n.removeAttribute('disabled');
                            n.style.color = '#fff';
                            n.value = '';
                            n.focus();
                        }, 2000)
                        console.log("Повтор");
                    }
                }
                if (rep === 0 && n.value !== '' && n.value !== 'Имя занято') {
                    button[i].textContent = n.value;
                    sessionStorage.setItem(`name ${i}`, n.value);
                    modal.style.display = "none";
                }

                for (let i = 1; i < 7; i++) {
                    document.getElementById(`functionList${i}`).classList.remove('show');
                }

                modal.style.left = 0+'px';
                modal.style.top = 0+'px';
                sessionStorage.setItem(`buttonColor ${i}`, newColorForm.value);
            }

            deleteClassForm.onclick = function deleteClassButton() {
                let conceptNow = i
                console.log(conceptNow)
                let conceptCount = parseInt(sessionStorage.getItem(`x`))

                for (let j = 1; j < conceptCount; j++) {
                    button[j] = document.getElementById(`Concept ${j}`)
                }

                for (let j = i; j < conceptCount; j++) {
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
                    if (sessionStorage.getItem(`RelationBetween ${j}`).split(",").includes(`${i}`)) {
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
    }
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

cleanStrokeButton.onclick = function(){
    modalValues.value="";
}
span.onclick = function() {
    modal.style.left = 0+'px';
    modal.style.top = 0+'px';

    document.body.style.position = '';
    document.body.style.overflowY = '';
    for(let i = 1; i<7; i++) {
        document.getElementById(`functionList${i}`).classList.remove('show');
    }
    modal.style.display = "none";
}


function addModalValuesInStorage(id){
    let dontPush;
    let numberOfTR;
    let modalValues = document.getElementById('modalValues');
    if (addModalValues.textContent === "Добавить значение" || addModalValues.textContent === "Добавить формулу в класс") {
        if (sessionStorage.getItem(`valueStorage ${id}`) !== null) {
            numberOfTR = sessionStorage.getItem(`valueStorage ${id}`).split(",").length;
            Values = sessionStorage.getItem(`valueStorage ${id}`).split(",");
            let temp = modalValues.value;
            if (!Values.includes(modalValues.value) && modalValues.value.length !== 0
                && modalValues.value !== "Уже присутствует" && modalValues.value !== "Введите значение") {
                Values.push(modalValues.value);
                dontPush = 0;
                console.log(Values);
            } else {
                modalValues.style.color = '#db0000';
                if (modalValues.value === '') {
                    modalValues.value = "Введите значение";
                } else if (modalValues.value !== 'Введите значение') {
                    modalValues.value = "Уже присутствует";
                }

                modalValues.setAttribute('disabled', 'disabled');
                setTimeout(function () {
                    modalValues.removeAttribute('disabled');
                    modalValues.style.color = '#000';
                    modalValues.focus();
                    modalValues.value = temp;
                }, 500)
                dontPush = 1;
            }
        } else {
            numberOfTR = 0;
            if (modalValues.value.length !== 0) {
                Values = [];
                Values.push(modalValues.value);
                dontPush = 0;
            } else {
                dontPush = 1;
            }
        }

        if (sessionStorage.getItem(`Type ${id}`) === "Формульный" && dontPush !== 1) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `${numberOfTR + 1}`);
            let tdName = document.createElement("td");

            let modalVal = modalValues.value;

            tdName.innerHTML = katex.renderToString(modalVal);
            tr.appendChild(tdName);
            valuesOfClass.appendChild(tr);
        } else if ((sessionStorage.getItem(`Type ${id}`) === "Символьный" && dontPush !== 1)) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `${numberOfTR + 1}`);
            tr.setAttribute('href', `${modalValues.value}`);

            let tdName = document.createElement("td");
            tdName.setAttribute('href', `${modalValues.value}`);
            tdName.innerHTML = modalValues.value;

            tr.appendChild(tdName);
            valuesOfClass.appendChild(tr);
        }else if (sessionStorage.getItem(`Type ${id}`) === "Неструктурированный" && dontPush !== 1) {
            let tr = document.createElement("tr");
            tr.setAttribute('id', `${numberOfTR + 1}`);
            let tdName = document.createElement("td");

            let modalVal = modalValues.value;

            tdName.innerHTML = katex.renderToString(modalVal);
            tr.appendChild(tdName);
            valuesOfClass.appendChild(tr);
        }

        if (dontPush !== 1) {
            changeModalValues.style.display = "none";
            sessionStorage.setItem(`valueStorage ${id}`, `${Values}`);
        }
    }
}
function stringCreation(name){
    let temp, str;
    let val = modalValues.value;
    let length = val.slice(0, modalValues.selectionStart).length;
    let openWindow = document.getElementsByClassName('show')[0].id;
    let massiveOfSpecSymbols = ['rangle','langle', 'exists', 'forall', 'neg'];
    console.log(openWindow);
    if(length !== modalValues.value.length) {
        temp = name.replace(/\s/g, '');
        if(temp === "up"){
            modalValues.value = val.splice(length, 0, '^{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else if(temp === "down"){
            modalValues.value = val.splice(length, 0, '_{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else if(temp === "dfrac"){
            modalValues.value = val.splice(length, 0, '\\dfrac{}{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else if(massiveOfSpecSymbols.includes(temp)) {
            modalValues.value = val.splice(length, 0, `\\` + temp + '{}');
            str = modalValues.value + '{}';
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else if(openWindow === 'functionList7'){
            modalValues.value = val.splice(length, 0, `\\` + temp);
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else{
            modalValues.value = val.splice(length, 0, "{}\\" + temp + "{}");
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }
    }else{
        temp = name.replace(/\s/g, '');
        if(temp === "up"){
            modalValues.value = val.splice(length, 0, '^{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else if(temp === "down"){
            modalValues.value = val.splice(length, 0, '_{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        } else if(temp === "dfrac"){
            modalValues.value = val.splice(length, 0, '\\dfrac{a}{b}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else if(massiveOfSpecSymbols.includes(temp)) {
            modalValues.value = val.splice(length, 0, `\\` + temp + '{}');
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else if(openWindow === "functionList7"){
            modalValues.value = val.splice(length, 0, `\\` + temp);
            str = modalValues.value;
            katex.render(str, document.getElementById('formula'));
            modalValues.focus();
        }else {
            temp = name.replace(/\s/g, '');
            str = modalValues.value + "\\" + temp;
            katex.render(str, document.getElementById('formula'));
            modalValues.value = val.splice(length, 0, "{}\\" + temp + "{}");
            modalValues.focus();
        }
    }
}
function changeModalValueInStorage(id) {
    let valuesOf = sessionStorage.getItem(`valueStorage ${id}`).split(",");

    if (!valuesOf.includes(modalValues.value) && modalValues.value.length !== 0
        && modalValues.value !== "Уже присутствует" && modalValues.value !== valuesOf[valueLeftId - 1]) {
        valuesOf[valueLeftId - 1] = modalValues.value;
        sessionStorage.setItem(`valueStorage ${id}`, `${valuesOf}`);
        changeModalValues.style.display = "none";
    } else {
        modalValues.style.color = '#db0000';
        if (modalValues.value === '') {
            modalValues.value = "Введите значение";
        } else if (modalValues.value !== 'Введите значение') {
            modalValues.value = "Уже присутствует";
        }

        modalValues.setAttribute('disabled', 'disabled');
        setTimeout(function () {
            modalValues.removeAttribute('disabled');
            modalValues.style.color = '#000';
            modalValues.focus();
            modalValues.value = valuesOf[valueLeftId - 1];
        }, 500)
    }

    if (sessionStorage.getItem(`Type ${id}`) === "Символьный") {
        let massiveOfValues = sessionStorage.getItem(`valueStorage ${id}`).split(',');

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
            tr.setAttribute('href', `${modalValues.value}`);

            let tdName = document.createElement("td");
            tdName.setAttribute('href', `${modalValues.value}`);
            tdName.innerHTML = massiveOfValues[i];

            tr.appendChild(tdName);
            valuesOfClass.appendChild(tr);
        }
    } else if (sessionStorage.getItem(`Type ${id}`) === 'Формульный') {
        let massiveOfValues = sessionStorage.getItem(`valueStorage ${id}`).split(',');
        console.log(massiveOfValues);

        while (valuesOfClass.firstChild) {
            valuesOfClass.removeChild(valuesOfClass.firstChild);
        }

        let tr = document.createElement("tr");
        let thName = document.createElement("th");

        thName.innerHTML = "Формулы";
        tr.appendChild(thName);
        valuesOfClass.appendChild(tr);

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
function RGBToHex(rgb) {
    var rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}
*/
