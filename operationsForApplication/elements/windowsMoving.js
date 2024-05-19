/*classCreationModal.onmousedown = function (e) {
    if (e.which === 1) {
        let coords = getCoords(classCreationModal);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        moveAt(e);

        classCreationModal.style.zIndex = '1000';

        function moveAt(e) {
            classCreationModal.style.left = e.pageX - shiftX + 'px';
            classCreationModal.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function (e) {
            if((e.x - 480 > classCreationModal.getBoundingClientRect().x && e.y - 100 > classCreationModal.getBoundingClientRect().y)
                && (e.x - 480 < classCreationModal.getBoundingClientRect().x + 960 && e.y - 100 < classCreationModal.getBoundingClientRect().y + 49)) {
                moveAt(e);
            }
        };

        classCreationModal.onmouseup = function () {
            document.onmousemove = null;
            classCreationModal.onmouseup = null;
        };

    }
    classCreationModal.ondragstart = function () {
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

modal.onmousedown = function (e) {
    if (e.which === 1) {
        let coords = getCoords(modal);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        moveAt(e);

        modal.style.zIndex = '1000';

        function moveAt(e) {
            modal.style.left = e.pageX - shiftX + 'px';
            modal.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function (e) {
            if((e.x - 480 > modal.getBoundingClientRect().x && e.y - 100 > modal.getBoundingClientRect().y)
                && (e.x - 480 < modal.getBoundingClientRect().x + 960 && e.y - 100 < modal.getBoundingClientRect().y + 68)) {
                moveAt(e);
            }
        };

        modal.onmouseup = function () {
            document.onmousemove = null;
            modal.onmouseup = null;
        };

    }
    modal.ondragstart = function () {
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

classModifyModal.onmousedown = function (e) {
    if (e.which === 1) {
        let coords = getCoords(classModifyModal);
        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;

        moveAt(e);

        classModifyModal.style.zIndex = '1000';

        function moveAt(e) {
            classModifyModal.style.left = e.pageX - shiftX + 'px';
            classModifyModal.style.top = e.pageY - shiftY + 'px';
        }

        document.onmousemove = function (e) {
            if((e.x - 480 > modal.getBoundingClientRect().x && e.y - 100 > modal.getBoundingClientRect().y)
                && (e.x - 480 < modal.getBoundingClientRect().x + 960 && e.y - 100 < modal.getBoundingClientRect().y + 68)) {
                moveAt(e);
            }
        };

        modal.onmouseup = function () {
            document.onmousemove = null;
            modal.onmouseup = null;
        };

    }
    modal.ondragstart = function () {
        return false;
    };

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }
}*/

document.onmousedown = function(e) {
    if (e.target.parentElement.parentElement.parentElement.classList.contains('modal')) {
        let windowNow = e.target.parentElement.parentElement.parentElement;
        if (e.which === 1) {
            let coords = getCoords(windowNow);
            let shiftX = e.pageX - coords.left;
            let shiftY = e.pageY - coords.top;

            moveAt(e);

            windowNow.style.zIndex = '1000';

            function moveAt(e) {
                windowNow.style.left = e.pageX - shiftX + 'px';
                windowNow.style.top = e.pageY - shiftY + 'px';
            }

            document.onmousemove = function (e) {
                if ((e.x - 480 > windowNow.getBoundingClientRect().x && e.y - 100 > windowNow.getBoundingClientRect().y)
                    && (e.x - 480 < windowNow.getBoundingClientRect().x + 960 && e.y - 100 < windowNow.getBoundingClientRect().y + 68)) {
                    moveAt(e);
                }
            };

            windowNow.onmouseup = function () {
                document.onmousemove = null;
                windowNow.onmouseup = null;
            };

        }
        windowNow.ondragstart = function () {
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

document.onclick = function (e){
    console.log(e)
    if(e.target.classList.contains("close")) {
        e.target.parentNode.parentNode.parentNode.style.display = "none";
    }
}
