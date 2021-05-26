import config from "./config";

export default function runGame(canvas, gameSize = config.gameSize) {
  const ctx = canvas.getContext("2d");
  const responsiveSize = config.responsiveSize;
  const numOfCells = config.numOfCells;
  const sideLength = responsiveSize ? findScreenSize() : config.gameSize;
  const scale = sideLength / numOfCells;
  const backgroundColor = config.backgroundColor;

  function findScreenSize() {
    const size =
      window.innerWidth < window.innerHeight
        ? window.innerWidth
        : window.innerHeight;
    console.log(window.innerWidth, window.innerHeight, size);
    return size * 0.9;
  }

  function resizeCanvas() {
    canvas.height = sideLength;
    canvas.width = sideLength;
  }
  function drawBackground() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, sideLength, sideLength);
    ctx.fillStyle = "rgba(255,255,255, 0.2)";

    for (let i = 0; i < numOfCells; i += 2) {
      for (let j = 0; j < numOfCells; j += 2) {
        ctx.fillRect(i * scale, j * scale, scale, scale);
        ctx.fillRect((i + 1) * scale, (j + 1) * scale, scale, scale);
      }
    }
  }
  function cellPosToCanvasPos(positionArray) {
    const x = Math.floor(positionArray[0] * scale + scale * 0.5);
    const y = Math.floor(positionArray[1] * scale + scale * 0.5);
    return [x, y];
  }
  function createSlug(
    color = "salmon",
    x = Math.floor(numOfCells / 2),
    y = Math.floor(numOfCells / 2)
  ) {
    return {
      color: color,
      direction: "north",
      bellyPositions: [],
      isDigesting: false,
      segmentPositions: [
        [x, y],
        [x, y + 1],
        [x, y + 2]
      ],
      update: function () {
        this.checkCollision();
        this.moveSlug();
        this.handleDigestion();
        this.drawSlug();
        this.drawBelly();
      },
      drawSlug: function () {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = scale * 0.8;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();

        this.segmentPositions.forEach((segmentPosition, index) => {
          const position = cellPosToCanvasPos(segmentPosition);
          if (index === 0) {
            ctx.moveTo(position[0], position[1]);
          } else {
            ctx.lineTo(position[0], position[1]);
          }
        });
        ctx.stroke();
      },
      drawBelly: function () {
        if (this.isDigesting) {
          ctx.fillStyle = this.color;
          this.bellyPositions.forEach(position => {
            position = cellPosToCanvasPos(position);
            ctx.beginPath();
            ctx.arc(position[0], position[1], scale * 0.5, 0, 2 * Math.PI);
            ctx.fill();
          });
        }
      },
      moveSlug: function () {
        this.segmentPositions.pop();
        this.segmentPositions.unshift(this.findNextPosition());
      },
      findNextPosition: function (direction = this.direction) {
        const firstSegment = this.segmentPositions[0];
        let newSegment = [];
        switch (direction) {
          case "north":
            newSegment[0] = firstSegment[0];
            newSegment[1] = firstSegment[1] - 1;
            break;
          case "west":
            newSegment[0] = firstSegment[0] - 1;
            newSegment[1] = firstSegment[1];
            break;
          case "south":
            newSegment[0] = firstSegment[0];
            newSegment[1] = firstSegment[1] + 1;
            break;
          case "east":
            newSegment[0] = firstSegment[0] + 1;
            newSegment[1] = firstSegment[1];
            break;
          default:
            console.error(
              "ERROR: expected 'north' 'south' 'east' or 'west' but got " +
                direction
            );
        }
        return newSegment;
      },
      checkCollision: function () {
        const nextPosition = this.findNextPosition();
        const nextSegmentPositions = [...this.segmentPositions];
        nextSegmentPositions.pop();
        const collideWithSelf = nextSegmentPositions.some(
          position =>
            position[0] === nextPosition[0] && position[1] === nextPosition[1]
        );
        const collideWithEdge =
          nextPosition[0] < 0 ||
          nextPosition[0] > numOfCells - 1 ||
          nextPosition[1] < 0 ||
          nextPosition[1] > numOfCells - 1;
        const collideWithSnack =
          nextPosition[0] === snack.position[0] &&
          nextPosition[1] === snack.position[1];

        if (collideWithSelf || collideWithEdge) {
          isPaused = true;
          gameOver();
        } else if (collideWithSnack) {
          this.handleEatSnack();
        }
      },
      handleEatSnack: function () {
        this.bellyPositions.push(snack.position);
        this.isDigesting = true;
        snack.handleEaten();
      },
      handleMovementInput: function (direction) {
        const nextPosition = this.findNextPosition(direction);
        const canMoveThere = !this.segmentPositions.some(
          position =>
            position[0] === nextPosition[0] && position[1] === nextPosition[1]
        );
        if (canMoveThere) {
          this.direction = direction;
        }
      },
      handleDigestion: function () {
        if (this.isDigesting) {
          const tempPositions = [...this.bellyPositions];
          tempPositions.forEach(position => {
            const finalSegment =
              this.segmentPositions[this.segmentPositions.length - 1];
            if (
              position[0] === finalSegment[0] &&
              position[1] === finalSegment[1]
            ) {
              this.segmentPositions.push(position);
              this.bellyPositions.shift();
              if (this.bellyPositions.length === 0) {
                this.isDigesting = false;
              }
            }
          });
        }
      }
    };
  }
  function createSnack(color = "#66b8ff") {
    const newSnack = {
      color: color,
      position: [0, 0],
      randomizePosition: function () {
        const slugPositions = [slug.findNextPosition()].concat(
          slug.segmentPositions
        );
        const randomX = Math.floor(Math.random() * numOfCells);
        const randomY = Math.floor(Math.random() * numOfCells);
        if (slugPositions.length - 2 === numOfCells ** 2) {
          gameOver("You WIN!");
        } else if (
          slugPositions.some(
            position => position[0] === randomX && position[1] === randomY
          )
        ) {
          this.randomizePosition();
        } else {
          this.position = [randomX, randomY];
        }
      },
      drawSnack: function () {
        const position = cellPosToCanvasPos(this.position);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(position[0], position[1], scale * 0.3, 0, 2 * Math.PI);
        ctx.fill();
      },
      handleEaten: function () {
        snack = createSnack();
      }
    };
    newSnack.randomizePosition();
    return newSnack;
  }
  function gameOver(message = "Game Over") {
    isPaused = true;
    slug = createSlug();
    snack = createSnack();
    drawBackground();
    alert(message);
  }

  let isPaused = true;
  const fps = config.fps;
  const fpsInterval = 1000 / fps;
  let now, then, delta;

  function startGame(fps) {
    then = window.performance.now();
    requestAnimationFrame(update);
  }

  function update() {
    now = window.performance.now();
    delta = now - then;

    if (delta > fpsInterval) {
      then = now - (delta % fpsInterval);
      drawBackground();
      slug.update();
      snack.drawSnack();
    }
    !isPaused && requestAnimationFrame(update);
  }

  function init() {
    resizeCanvas();
    drawBackground();
    startGame();
  }

  let slug = createSlug();
  let snack = createSnack();

  window.addEventListener("load", init);

  document.addEventListener("keydown", event => {
    const key = event.key.toLocaleLowerCase();
    switch (key) {
      case " ":
        isPaused && update();
        break;
      case "p":
        isPaused = !isPaused;
        !isPaused && requestAnimationFrame(update);
        break;
      case "w":
      case "arrowup":
        slug.handleMovementInput("north");
        break;
      case "s":
      case "arrowdown":
        slug.handleMovementInput("south");
        break;
      case "a":
      case "arrowleft":
        slug.handleMovementInput("west");
        break;
      case "d":
      case "arrowright":
        slug.handleMovementInput("east");
        break;
      default:
        break;
    }
  });
}
