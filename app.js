const board = document.getElementById("board")
const tiles = Array.from(document.querySelectorAll(".tile"))
const wordSearched = document.getElementById("inputSearch")
const serachBtn = document.getElementById("addSearch")
const resetBtn = document.getElementById("resetBtn")
const gameOverElement = document.getElementById("gameOverMessage")
const gameOverMessageText = document.querySelector("[gameOverMessageText]")



let guessedWord = []

let boardPlacements = [
    "","","","","",
    "","","","","",
    "","","","","",
    "","","","","",
    "","","","",""
]

let gameOver = false
let gameLoss = false




const correctWord = ['O', 'R', 'G', 'A', 'N']

startGame()


function startGame(){

    removeAllElements()
    guessedWord = []

    boardPlacements = [
        "","","","","",
        "","","","","",
        "","","","","",
        "","","","","",
        "","","","",""
    ]

    gameOver = false
    gameLoss = false

    // gameOverElement.classList.remove('show')


    // const correctWord = ['O', 'R', 'G', 'A', 'N']


    wordSearched.addEventListener('keypress', function(e){
    
    
        if (e.key === 'Enter'){
            if(gameOver == false){
                searchedWord()
                wordSearched.value = ""
                checkWinCon()
                checkIfAllTilesGuessed()
                if(gameOver == true){
                    // gameOverMessage()
                    setTimeout(gameOverMessage, 2000)
                }
            }
        }
        
    })

    resetBtn.addEventListener('click', startGame)

}




// wordSearched.addEventListener('keypress', function(e){
    
    
//     if (e.key === 'Enter'){
//         if(gameOver == false){
//             searchedWord()
//             wordSearched.value = ""
//             checkWinCon()
//             checkIfAllTilesGuessed()
//             if(gameOver == true){
//                 // gameOverMessage()
//                 setTimeout(gameOverMessage, 2000)
//             }
//         }
//     }
    
// })


function searchedWord(){
    
    let input = wordSearched.value

    let upperCasedInput = input.toUpperCase()
    console.log("THe input is: " + upperCasedInput)

    const inputSplit = upperCasedInput.split('')

    if(inputSplit.length < 5){
        console.log("number of characters less than 5")
    }else if(inputSplit.length > 5) {
        console.log("number of characters greater than 5")

    }else{
        console.log("number of characters is exactly 5")
        for(let i = 0; i < inputSplit.length; i++){
            guessedWord.push(inputSplit[i])
        }
    
        // words.push(inputSplit)
        // console.log("The words searched: " + guessedWord)
        // console.log("The first letter is : " + guessedWord[0])
        
        updateBoard()
        updateBoardPlacementArray()
        checkExactplace()
        


    }
    // checkCorrectWord()
}

function updateBoard(){
    for(let i = 0; i < guessedWord.length; i++){
        // if(guessedWord[i] != ""){
            document.getElementById(i).innerHTML = guessedWord[i]
            // document.getElementById(i).style.backgroundColor = "lightgreen"
            // console.log("words[i]: "+ guessedWord)
        // }
    }

    
}

function updateBoardPlacementArray(){
    for(let i = 0; i < guessedWord.length; i++){
        boardPlacements[i] = guessedWord[i] 

        console.log("boardpalcemenst: " + boardPlacements)
    }
}

function checkIfAllTilesGuessed(){
    // for(let i = 0; i < 26; i++){        
        if(boardPlacements[20] != ""){
            gameOver = true
            gameLoss = true
            console.log("all guess made, cna no longer guess")
        }
    // }
}

// function checkCorrectWord(){
    
//     for(let i = 0; i < guessedWord.length; i++){
//         for(let j = 0; j < correctWord.length; j++){
//             // if(guessedWord[i] == correctWord[j]){
//             //     document.getElementById(i).style.backgroundColor = "lightgreen"
//             //     console.log("correct character: "+ correctWord[j])
//             // }
//             if(correctWord[j].includes(guessedWord[i])){
//                 document.getElementById(i).style.backgroundColor = "yellow"
//             }else{
//                 console.log("error")
//             }
//         }
//     }
// }

function checkExactplace(){
    console.log("length: " + guessedWord.length);
    let counter = 0;
    for(let i = 0; i < guessedWord.length; i++){
        // let counter = 0;
        if(counter == 5){
            counter = 0
        }
        for(let j = 0; j < correctWord.length; j++){
            if(guessedWord[i] == correctWord[j] && correctWord.indexOf(correctWord[j]) == counter){
                console.log("find Index: "+ correctWord.indexOf(correctWord[j]))

                // document.getElementById(i).style.backgroundColor = "lightgreen"
                console.log("correct character: "+ correctWord[j])
                if(document.getElementById(i).style.backgroundColor != "lightgreen"){
                    document.getElementById(i).style.backgroundColor = "lightgreen"
                }
            }
            else if(correctWord[j].includes(guessedWord[i])){
                if(document.getElementById(i).style.backgroundColor != "lightgreen"){
                    document.getElementById(i).style.backgroundColor = "yellow"
                }
            }else{
                console.log("error")
            }

        }
        counter++
        
    }
}

function checkWinCon(){
    let rowOne = 0
    let rowTwo = 0
    let rowThree = 0
    let rowFour = 0
    let rowFive = 0;   

    for(let i = 0; i < 25; i++){
        if(i < 5){
            if(document.getElementById(i).style.backgroundColor == "lightgreen"){
                rowOne++
            }
        }else if(i > 4 && i < 10){
            if(document.getElementById(i).style.backgroundColor == "lightgreen"){
                rowTwo++
            }
        }else if(i > 9 && i < 15){
            if(document.getElementById(i).style.backgroundColor == "lightgreen"){
                rowThree++
            }
        }else if(i > 14 && i < 20){
            if(document.getElementById(i).style.backgroundColor == "lightgreen"){
                rowFour++
            }
        }else if(i > 19 && i < 25){
            if(document.getElementById(i).style.backgroundColor == "lightgreen"){
                rowFive++
            }
        }   
        
        console.log("rowOne: " + rowOne)
        if(rowOne == 5 || rowTwo == 5 || rowThree == 5 || rowFour == 5 || rowFive == 5){
            gameOver = true
        }
    }




}

function gameOverMessage(){
    if(gameLoss == true && gameOver == true){
        gameOverMessageText.innerText = "UNLUCKY! GOOD LUCK NEXT TIME!"
        console.log("Better Luck Next Time")
        gameOverElement.classList.add("show")
    }else if(gameOver == true){
        gameOverMessageText.innerText = "WELL DONE YOU DID IT!!!"
        console.log("Better Luck Next Time")
        gameOverElement.classList.add("show")
    }
}

function removeAllElements(){
    for(let i = 0; i < guessedWord.length; i++){
        document.getElementById(i).innerHTML = null
        document.getElementById(i).style.backgroundColor = "white"
        gameOverElement.classList.remove('show')
    }
}

console.log(serachBtn)
