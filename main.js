'use strict';

function createTable() {
  let container = document.getElementById('container');
  let table = document.createElement('table');
  let tbody = document.createElement('tbody');
  
  function creater(rows, columns) {
    let tableCells = [];
    function randomInteger(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    };

    for (let i = 0; i < rows; i++) {
      let rowCells = [];
      tableCells.push(rowCells);
      for (let j = 0; j < columns; j++) {
       rowCells.push(`<td class="row_${i} col_${j} lear_${randomInteger(1,4)}"></td>`);
      }
    }
   
    return tableCells;
  };

  tbody.insertAdjacentHTML('beforeEnd', creater(6,6).map((row, i) => `<tr>${row.join('')}</tr>`).join(''));
  table.append(tbody);  
  container.append(table);  

  return table;
};

createTable();

let table = document.querySelector('table');
let cells = document.querySelectorAll('td');

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].className[17] === '1') {
      cells[i].innerHTML = '&#9824;';
    } else if (cells[i].className[17] === '2') {
      cells[i].innerHTML = '&#9829;';
    } else if (cells[i].className[17] === '3') {
      cells[i].innerHTML = '&#9830';
    } else {
      cells[i].innerHTML = '&#9827;';
    }
  }

  table.onclick = (event) => {
    let target = event.target;
      if (target.tagName != 'TD') return;
    target.style.border = '2px solid red';
    
    function checkRight(target) {
      let currRow = +target.className[4];
      let currCol = +target.className[10];
      let rightCell = document.querySelector(`.row_${currRow}.col_${currCol + 1}`);
      target.style.background = 'gray';
        if (rightCell === null || target.innerHTML !== rightCell.innerHTML) return;
        checkRight(rightCell);
        checkUp(rightCell);
        checkDown(rightCell);
    };

    function checkLeft(target) {
      let currRow = +target.className[4];
      let currCol = +target.className[10];
      let leftCell = document.querySelector(`.row_${currRow}.col_${currCol - 1}`);
      target.style.background = 'gray';
        if (leftCell === null || target.innerHTML !== leftCell.innerHTML) return;
        checkLeft(leftCell);
        checkUp(leftCell);
        checkDown(leftCell)
    };

    function checkUp(target) {
      let currRow = +target.className[4];
      let currCol = +target.className[10];
      let upCell = document.querySelector(`.row_${currRow - 1}.col_${currCol}`);
      target.style.background = 'gray';
        if ((upCell === null || target.innerHTML !== upCell.innerHTML) || upCell.style.background === 'gray') return;
        checkUp(upCell);
        checkRight(upCell);
        checkLeft(upCell);
    };

    function checkDown(target) {
      let currRow = +target.className[4];
      let currCol = +target.className[10];
      let downCell = document.querySelector(`.row_${currRow + 1}.col_${currCol}`);
      target.style.background = 'gray';
        if ((downCell === null || target.innerHTML !== downCell.innerHTML) || downCell.style.background === 'gray') return;     
        checkDown(downCell);
        checkRight(downCell);
        checkLeft(downCell);
    };

    checkUp(target);
    checkRight(target);
    checkLeft(target);
    checkDown(target);
  };