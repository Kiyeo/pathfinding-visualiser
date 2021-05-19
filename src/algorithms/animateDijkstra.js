const animateDijkstra = (
  startNode,
  nodeRefArray,
  timeOut,
  isGenerateWeights,
  visitedNodeOrder,
  nodesInShortestPathOrder,
  setIsVisualising,
  setIsPostVisualise
) => {
  for (let i = 0; i <= visitedNodeOrder.length; i++) {
    if (i === visitedNodeOrder.length) {
      timeOut.current.push(
        setTimeout(() => {
          animateShortestPath(
            startNode,
            nodeRefArray,
            timeOut,
            nodesInShortestPathOrder,
            setIsVisualising,
            setIsPostVisualise
          );
        }, 5 * i)
      );
      return;
    }
    timeOut.current.push(
      setTimeout(() => {
        const node = visitedNodeOrder[i];
        const nodeRef = nodeRefArray.current[`${node.row}-${node.col}`];
        // displays cumulative weight if in random weight simulation
        if (isGenerateWeights.current)
          nodeRef.innerText = `${node.cumulativeWeight}`;
        nodeRef.className = "node node-visited";
      }, 5 * i)
    );
  }
};

const animateShortestPath = (
  startNode,
  nodeRefArray,
  timeOut,
  nodesInShortestPathOrder,
  setIsVisualising,
  setIsPostVisualise
) => {
  let delay = 0;
  if (nodesInShortestPathOrder[0].isStart) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      delay = i;
      timeOut.current.push(
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          nodeRefArray.current[`${node.row}-${node.col}`].className =
            "node node-shortest-path";
        }, 50 * i)
      );
    }
  } else {
    const startNodeRow = startNode.current.row;
    const startNodeCol = startNode.current.col;
    nodeRefArray.current[`${startNodeRow}-${startNodeCol}`].className =
      "node node-start";
  }
  timeOut.current.push(
    setTimeout(() => {
      setIsVisualising(false);
      setIsPostVisualise(true);
    }, 55 * delay)
  );
};

export default animateDijkstra;
