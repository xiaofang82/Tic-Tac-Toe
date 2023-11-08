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
    const recordStep = [];
    const recordStep2 = [];
    const manArray = new Array();
    const player = 0;
    const playerArray = [select('.player0') ,select('.player1')]
    playerArray

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
                setMan(this, recordStep, manArray);
                player = 1 - player;
            });
        }
    }
    console.log(manArray);
}

function setMan(ele, recordStep, manArray){
    const image = create('img');
    let indexNo = manArray.indexOf(ele.id);
    image.src = './assets/image/circle-outline-64.png';
    ele.append(image);
    recordStep.push(ele.id);
    manArray.splice(indexNo, 1);
    console.log(recordStep);
    console.log(manArray);
}

