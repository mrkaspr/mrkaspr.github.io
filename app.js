
//This a global variable. This array contains contains sets of array with consistent length 
//of 3 which shows the winning combination of the boxes index in the board
var winCombo = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8],
]

//this is a helper function
//this function return the array of boxes class div element. Lenght will be consistent to 9. 
//It does not create array of the element value
var board = function(){
  return Array.from(document.querySelectorAll('.box'))

}

//this is a helper function
//this function return array of empty boxes from the board
//this is use to idenfity which boxes can next person/computer use
var emptyBoxes = function(){
  return board().filter(function(elem){
    return elem.innerText === ''
  })
}

//helper function
//this function returns element ID that has been converted from string to number data type
var boxIdNum = function(elem){
  return Number(elem.id)
}

//helper function
//returned a random ID number from empty boxes left 
var computerChoice = function (){
  //console.log(emptyBoxes()[Math.floor(Math.random() * emptyBoxes().length)])
  return boxIdNum(emptyBoxes()[Math.floor(Math.random() * emptyBoxes().length)])
}

var win = function(arr){
  return arr.every(function(elem){
    return elem.innerText === arr[0].innerText && elem.innerText !== ''  
  })
}


var finish = function (sequence){
  return sequence.forEach(function(elem) {
    console.log(sequence[0].innerText)
    document.querySelector('.win').innerText = sequence[0].innerText + ' is the Winner!'
    //document.querySelector('p').innerText = 'WINNING!'
    disableListener()
    return elem.classList.add('winner')
  } )
  
}


var winningCond = function (){
  var victory = false

   winCombo.forEach(function(combo){  

      var sequence = [board()[combo[0]], board()[combo[1]], board()[combo[2]]]

      if (win(sequence)){
        console.log (sequence)
        victory = true
        finish(sequence)
      }

   })

  return victory
}

//function that ran dumb computer turn. 
var opponentTurn = function(){
  disableListener()
  setTimeout(function(){
    takeTurn(computerChoice(), 'O')
    if (!winningCond()){ //check winning condition
      enableListener()
    }
  }, 1000)
}

//on this function, a letter X or O is assigned to an element referencing parameter received. 
var takeTurn = function (index, letter){
  board()[index].innerText = letter
  //console.log(typeof(index))
}

//function that describe what happen on click
var clickFn = function(){
  takeTurn(boxIdNum(event.target), 'X')
  //check winning condition
  if(!winningCond()){
    opponentTurn();
  }
  //console.log(event.target)
}

//this function is to enable click event listener on the board
var enableListener = function(){
  board().forEach(function(elem){
    elem.addEventListener('click', clickFn)
  })
}

//this function is to disable click event listener on the board
var disableListener = function(){
  board().forEach(function(elem){
    elem.removeEventListener('click', clickFn)
  })
}



//initialize the game. This function runs at the start of the game and also use to reset game
var init = function(){


}

//init()
enableListener()

//need to build control for box that have value to not able to be selected
//need to setup reset button for reinitialization
//need to setup control for draw scenario
//be able to select gif animation as winning message 
