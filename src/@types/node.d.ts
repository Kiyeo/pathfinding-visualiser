export default interface Node {
  weight: number;
  nodeType: number;
  row: row,
  col: col,
  prevNode: null | Node;
}

