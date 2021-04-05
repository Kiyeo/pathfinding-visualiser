// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode, isRandomWeights) {
  finishNode.isVisited = false;
  finishNode.isWall = false;
  const finishNodeNeighbours = getUnvisitedNeighbors(finishNode, grid);
  let finishNodeNeighbourVisits = 0;
  const visitedNodes = [];
  startNode.distance = 0;
  startNode.cumulativeWeight = 0;
  startNode.isWall = false;
  const unvisitedNodes = getAllNodes(grid);
  // terminates when finishNode is reached
  while (true) {
    heapSortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodes;
    closestNode.isVisited = true;
    visitedNodes.push(closestNode);
    if (isRandomWeights && finishNodeNeighbours.length > 1) {
      for (const finishNodeNeighbour of finishNodeNeighbours) {
        const row = finishNodeNeighbour.row;
        const col = finishNodeNeighbour.col;
        if (
          closestNode.row === row &&
          closestNode.col === col &&
          closestNode.isVisited
        ) {
          finishNodeNeighbourVisits++;
        }
      }
      if (finishNodeNeighbourVisits === finishNodeNeighbours.length) {
        finishNodeNeighbours.filter((node) => (node.isVisited = false));
        return visitedNodes;
      }
    } else {
      if (closestNode === finishNode) return visitedNodes;
    }
    updateUnvisitedNeighbors(closestNode, grid, isRandomWeights);
  }
}

function heapSortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, isRandomWeights) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    // for weighted simulation
    if (isRandomWeights) {
      if (neighbor.distace === Infinity) {
        neighbor.distance = neighbor.displayWeight + node.cumulativeWeight;
        neighbor.cumulativeWeight = neighbor.distance;
        neighbor.previousNode = node;
      }
      // checks and updates the neighbors for the path with the less cost
      else if (
        neighbor.distance >
        neighbor.displayWeight + node.cumulativeWeight
      ) {
        neighbor.distance = neighbor.displayWeight + node.cumulativeWeight;
        neighbor.cumulativeWeight = neighbor.distance;
        neighbor.previousNode = node;
      }
    }
    // for unweighted simulation
    else {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  const neighborOperations = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const totalRows = grid.length;
  const totalCols = grid[0].length;
  //constant opeations => 4 values
  for (let i = 0; i < neighborOperations.length; i++) {
    const operation = neighborOperations[i];
    const x = operation[0];
    const y = operation[1];
    const newRow = row + x;
    const newCol = col - y;
    if (
      newRow >= 0 &&
      newRow < totalRows &&
      newCol >= 0 &&
      newCol < totalCols &&
      !grid[newRow][newCol].isWall
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
