console.log('--------------Pathfinding start------------');
const BY_A = 1;
const BY_B = 2;
const NO_ONE = 0;

const generateVisited = (maze) => {
  return maze.map((row, y) =>
    row.map((ele, x) => ({
      opened_by: NO_ONE,
      closed: ele === 1,
      length: 0,
      x,
      y,
    }))
  );
};

function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  let visited = generateVisited(maze);
  visited[yA][xA].opened_by = BY_A;
  visited[yB][xB].opened_by = BY_B;

  let aQueue = [visited[yA][xA]];
  let bQueue = [visited[yB][xB]];
  let iteration = 0;

  while (aQueue.length && bQueue.length) {
    iteration++;

    let aNeighbours = [];
    // get A neighbours
    while (aQueue.length) {
      let coordinate = aQueue.shift();
      aNeighbours = aNeighbours.concat(
        getNeighbours(visited, coordinate.x, coordinate.y)
      );
    }
    //process B neighbours
    for (let neighbour of aNeighbours) {
      if (neighbour.opened_by === BY_B) return iteration + neighbour.length;
      else if (neighbour.opened_by === NO_ONE) {
        neighbour.length = iteration;
        neighbour.opened_by = BY_A;
        aQueue.push(neighbour);
      }
    }

    let bNeighbours = [];
    // get A neighbours
    while (bQueue.length) {
      let coordinate = bQueue.shift();
      bNeighbours = bNeighbours.concat(
        getNeighbours(visited, coordinate.x, coordinate.y)
      );
    }
    //process B neighbours
    for (let neighbour of bNeighbours) {
      if (neighbour.opened_by === BY_A) return iteration + neighbour.length;
      else if (neighbour.opened_by === NO_ONE) {
        neighbour.length = iteration;
        neighbour.opened_by = BY_B;
        bQueue.push(neighbour);
      }
    }
  }

  return -1;
}
// the coordinates are in (x,y) format but they translate into [y][x]. think of it in that way
function getNeighbours(visited, x, y) {
  const neighbours = [];
  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    neighbours.push(visited[y][x - 1]);
  }
  if (x + 1 < visited[y].length && !visited[y][x + 1].closed) {
    neighbours.push(visited[y][x + 1]);
  }
  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    neighbours.push(visited[y - 1][x]);
  }
  if (y + 1 < visited.length && !visited[y + 1][x].closed) {
    neighbours.push(visited[y + 1][x]);
  }
  return neighbours;
}
console.log('----------------pathfinding end------------');