const game = {
    canvas: document.getElementById('gameBox'),
    keysActive: {},
    entities: [],
    start: () => {
        game.context = game.canvas.getContext('2d')
    
        setInterval( updateGameArea, 20)

        $(document)
            .keydown( e => {
                game.keysActive[e.keyCode] = true
            })
            .keyup( e => {
                game.keysActive[e.keyCode] = false
            })
    },
    clear: () => {
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height)
    },
}


function GameEntity(width, height, x, y, color) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.color = color
    this.draw = function () {
        game.context.fillStyle = this.color
        game.context.fillRect(this.x, this.y, this.width, this.height)
    }
    
    this.captureMovement = function () {
        if (game.keysActive[37]) {this.x -= 2}
        if (game.keysActive[39]) {this.x += 2}
        if (game.keysActive[38]) {this.y -= 2}
        if (game.keysActive[40]) {this.y += 2}

        this.checkBounds()
    }

    this.checkBounds = function () {
        // Left of Screen
        if ( this.x < 0 ) this.x = 0
        // Top of Screen
        if ( this.y < 0 ) this.y = 0
        // Right of Screen
        if ( this.x > game.canvas.width - this.width ) this.x = game.canvas.width - this.width
        // Bottom of Screen
        if ( this.y > game.canvas.height - this.height) this.y = game.canvas.height - this.height
    }

    this.draw()   
}

function updateGameArea() {
    game.clear()
    game.entities.forEach( function ( entity ) { 
        if ( entity.socketID == game.socketID ) {
            entity.captureMovement()
        }
        entity.draw() 
    })
}

$(document).ready(function () {

    game.start()

    let player = new GameEntity(20,20,20,20, 'green')
    game.entities.push(player)
})

