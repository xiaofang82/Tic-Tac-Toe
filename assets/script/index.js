'user strict'

function onEvent(event, selector, callback){
    return selector.addEventListener(event,callback);
}

function select(selector,parent = document){
    return parent.querySelector(selector);
}

function selectById(selector,parent = document){
    return parent.getElementById(selector);
}

function selectAll(selector,parent = document){
    return [...parent.querySelectorAll(selector)];
}

function create(element,parent=document){
    return parent.createElement(element);
}

const tic = select('.tic');
const modalContainer = select('.modal-container');
const replay = selectById('replay');

initBoard(tic);

/**
 * initial table
 * @param {*} parent 
 * @param {*} row 
 * @param {*} colum 
 */
function initBoard(parent, row = 3, colum = 3) {
    const eleRow = new Array();
    const eleColum = Array.from(new Array(3),() => new Array(3));
    const recordStep = Array.from(new Array(2),() => new Array());
    const manArray = new Array();
    let player = 0;
    const playerArray = [selectById('player0'), selectById('player1')];

    parent.innerHTML = '';
    playerArray[player].style.color = 'red';
    //console.log(playerArray[player].classList);

    for(let i = 0; i < row; i++){
        eleRow[i] = create('div');
        eleRow[i].classList.add('row');
        parent.append(eleRow[i]);
        for(let j = 0; j < colum; j++){
            eleColum[i][j] = create('div');
            eleColum[i][j].classList.add('column');
            eleColum[i][j].id = i + '-' + j;
            eleRow[i].append(eleColum[i][j]);
            manArray.push(i + '-' + j);
            onEvent('click', eleColum[i][j], function(event) {
                if(setMan(player, this, recordStep, manArray)) {
                    playerArray[player].style.color = 'white';
                    player = 1 - player;
                    playerArray[player].style.color = 'red';
                }
            });
        }
    }
    console.log(manArray);
}

function setMan(player, ele, recordStep, manArray){
    const image = create('img');
    let indexNo = manArray.indexOf(ele.id);
    let ifend = 0;
    const modalContainer = document.querySelector('.modal-container');
    let winContent = 'You Win!';

    //console.log (manArray.includes(ele.id));
    if (manArray.includes(ele.id)) {
        const imageArray = ['circle-outline-64.png', 'x-mark-64.png'];
        let checkArray = ['0-1', '1-1' , '2-0'];
        image.src = './assets/image/' + imageArray[player];
        ele.append(image);
        recordStep[player].unshift(ele.id);
        manArray.splice(indexNo, 1);
        if(recordStep[player].length >= 3) {
            let sameRC = 0;
            const rowArray = [0,0,0];
            const columArray = [0,0,0];
            for(let index in recordStep[player]) {
                let valueArray = recordStep[player][index].split('-');
                rowArray[valueArray[0]]++;
                columArray[valueArray[1]]++;
                if (valueArray[0] == valueArray[1]){
                    sameRC++;
                    console.log(recordStep[player][index]);
                }
            }
            let needCheckArray = recordStep[player];
            const isInclude = compareArray(needCheckArray,checkArray);
            if (sameRC >= 3 || isInclude) {
                ifend = 1;
            }
            for(let value of rowArray){
                if (value == 3)
                    ifend = 1;
            }
            for(let value of columArray){
                if (value == 3)
                    ifend = 1;
            }
            if(manArray.length <= 0){
                ifend = 1;
                winContent = 'Score Draw!';
            }
            if(ifend == 1) {
                const title = selectById('title');
                title.innerText = winContent;
                modalContainer.classList.add('model_show');
                model.classList.add('modal-transform');
            }
            console.log(rowArray);
        }
        console.log(recordStep);
        //console.log(manArray);
        return true;
    } else {
        return false;
    }
}

function compareArray(arr1, arr2) {
    return arr2.every(item => arr1.includes(item));
}

onEvent('click',replay, function(){
    initBoard(tic);
});

onEvent('click',window, function(event){
    if(event.target == modalContainer){
        modalContainer.classList.remove('model_show');
        model.classList.remove('modal-transform');
    }
});

onEvent('keyup',window, function(event){
    if(event.key == 'Escape'){
        modalContainer.classList.remove('model_show');
        model.classList.remove('modal-transform');
    }
})
