class Game {
    constructor() {
        this.gameRestartBtn = document.getElementById('gameRestart')
        this.submitBtn = document.getElementById('submitBtn')
        this.gameStatus = document.getElementById('gameStatus')
        this.gameActive = true
        this.currentPlayer = 'X'
        this.xWins = document.getElementById('xWins')
        this.oWins = document.getElementById('oWins')
        this.playerOne = document.getElementById('playerOne')
        this.playerTwo = document.getElementById('playerTwo')

        this.winCount = {
            x: 0,
            o: 0
        }

        this.gameState = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
        ]
        this.players = {
            player1: 'Player 1',
            player2: 'Player 2'
        }
    }

    // initializer
    init() {
        this.playerOne.innerText = this.players.player1
        this.playerTwo.innerText = this.players.player2
        this.getPlayerNames()
        this.currPlayerTurn()
        this.handleCellClicked()
        this.gameRestartBtn.addEventListener('click', ()=> {
            this.restartGame()
        })
    }

    currPlayerTurn() {
        const message = `It's ${this.currentPlayer}'s turn`
        return this.gameStatus.innerText = message
    }

    drawMessage() {
        const message = `Game ended in a draw`
        return this.gameStatus.innerText = message
    }

    winningMessage() {
        const message = `Player ${this.currentPlayer} has won!`
        return this.gameStatus.innerText = message
    }

    // handles the clicked cells
    handleCellClicked() {
        // grab cell
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            const cellIdx = parseInt(cell.getAttribute('data-cell-index'))
            // console.log(cellIdx);
            // if the cellIdx is not an empty string OR if gameActive is false...
            cell.addEventListener('click', ()=> {
                if (this.gameState[cellIdx] != '' || !this.gameActive) {
                    return
                }
    
                this.handleCellPlayed(cell, cellIdx)
                this.resultValidation()
            })
        })
    }

    // handle cell played
    handleCellPlayed(cell, idx) {
        this.gameState[idx] = this.currentPlayer
        this.currentPlayer == 'X' ? cell.classList.add('red') : cell.classList.add('blue')
        cell.innerText = this.currentPlayer
    }

    resultValidation() {
        let gameWon = false //by default, game has not been won yet

        for (let i = 0; i <= 7; i++) { // there are 8 winning conditions (0 to 7)
            const win = this.winningConditions[i] // winning conditions set to 0

            let a = this.gameState[win[0]] // this is looping through each win conditions to see if the game has been won yet
            let b = this.gameState[win[1]] // in the "winningCondtions array", it just goes to each nested array item
            let c = this.gameState[win[2]] // a b c, a b c, a b c, etc

            if (a == '' || b == '' || c == '') { // this just sees if the strings are empty and that its ok to continue the game
                continue
            }

            if (a == b && b == c) { // this stops the game and confirms the win
                gameWon = true
                break
            }
        }

        if (gameWon) {

            // more to do later
            const tallyMark = 'x'
            this.winningMessage()
            const winner = this.currentPlayer

            if (winner == 'X') {
                this.winCount.x = this.winCount.x + 1
                this.xWins.innerHTML += `<span class="tally">${tallyMark}</span>`
            } else {
                this.winCount.o = this.winCount.o + 1
                this.oWins.innerHTML += `<span class="tally">${tallyMark}</span>`
            }
            this.checkWinCount()
            this.gameActive = false
            return
        }

        const roundDraw = !this.gameState.includes('') // making sure there are no empty slots in the game state
        if (roundDraw) {
            this.drawMessage()
            this.gameActive = false
            return
        }

        this.playerChange() // this changes player per turn         Also see if you can't make an option that gives the other player first turn every other game or so.
    }

    playerChange() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X" // is "this.currentPlayer" = to X? then set to "O"
        this.currPlayerTurn()
    }

    restartGame() {
        this.gameActive = true
        this.currentPlayer = 'X'
        this.gameState = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]
        this.currPlayerTurn()
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerText = ''
            cell.classList.remove('blue')
        })
    }

    checkWinCount() {
        let xWinTotal = this.winCount.x
        let oWinTotal = this.winCount.o

        if (xWinTotal == 3) {
            this.gameStatus.innerText = `${this.players.player1} is the winner!`
            this.gameReload()
        } else if (oWinTotal == 3) {
            this.gameStatus.innerText = `${this.players.player2} is the winner!`
            this.gameReload()
        } else {
            return
        }

        this.gameActive = false
    }

    // gameReload
    gameReload() {
        setTimeout(()=> { // this resets the game on a 3 seconnd timer after someone has won 3 games
            this.restartGame()
            this.xWins.innerHTML = ''
            this.oWins.innerHTML = ''
            this.playerOne.innerText = 'Player 1'
            this.playerTwo.innerText = 'Player 2'
            this.winCount.x = 0
            this.winCount.o = 0
        }, 3000)
    }

    getPlayerNames() {
        const submitBtn = this.submitBtn
        const playerOne = this.playerOne
        const playerTwo = this.playerTwo

        submitBtn.addEventListener('click', (e)=> {
            e.preventDefault()
            const player1Name = document.getElementById('player1').value // this stores the inserted player name and replaces the default
            const player2Name = document.getElementById('player2').value

            this.players.player1 = player1Name
            this.players.player2 = player2Name

            playerOne.innerText = this.players.player1
            playerTwo.innerText = this.players.player2
        })
    }
}

const action = new Game()
action.init()