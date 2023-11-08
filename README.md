## Tic-Tac-Toe

Tic-Tac-Toe game is written by JavaScript, it's a classic two-player board game where player take turns marking a 3x3 grid with their symbols(typically "X" and "O") in a attempt to form a row, column, or diagonal of three of their symbols. The game is played in a web browser and used HTML, CSS, and JavaScript to create the user interface and game logic.

Player click on the grid to place their symbols, and the game checks for a win or a draw after each move. It provides feedback on the winner or a draw and allows for restarting the game. 

### InitBoard function

The "initBoard" function is used to initialize the game board at the start of each game. This funciton typically sets up an empty game board, ready for the players to make their moves.

```JavaScript
function initBoard(parent, row = 3, colum = 3) {
    const eleRow = new Array();
    const eleColum = Array.from(new Array(3),() => new Array(3));
    const recordStep = Array.from(new Array(2),() => new Array());
    const manArray = new Array();
    let player = 0;
    const playerArray = [selectById('player0'), selectById('player1')];

    parent.innerHTML = '';
    playerArray[0].style.color = 'red';
    playerArray[1].style.color = 'white';

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
}
```

###
The "setMan" function appears to be responsible for allowing a player to make a move, updating the game board, and checking if the player has won or if the game has ended in a draw in a Tic-tac-toe game.

```JavaScript
function setMan(player, ele, recordStep, manArray){
    const image = create('img');
    let indexNo = manArray.indexOf(ele.id);
    let ifend = 0;
    const modalContainer = document.querySelector('.modal-container');
    let winContent = 'You Win!';

    if (manArray.includes(ele.id)) {
        const imageArray = ['circle-outline-64.png', 'x-mark-64.png'];
        let checkArray = ['0-1', '1-1' , '2-0'];
        image.src = './assets/image/' + imageArray[player];
        ele.append(image);
        recordStep[player].unshift(ele.id);
        manArray.splice(indexNo, 1);

        //check win
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
            
        }
        
        return true;
    } else {
        return false;
    }
}
```
### Live Demo
[DEMO LINK](https://xiaofang82.github.io/Tic-Tac-Toe/)