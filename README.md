# pathfinding-visualiser

# TODO / KNOWN BUGS

After visualisation, reset css when resizing window

Implement ondrag on mobile touch screen for movement of start, finish nodes and toggle of wall nodes 10/04/2021

# FIXED BUGS

Weighted Dijkstra, on runtime, miss nodes due to presorting which assigns an incorrect previousNode to a node and produces an incorect accumulative weight for the finish node if the path is not found on the first branching. RESOLVED 03/04/2021 (Due to not updating neighbours for the least cost and not visiting neigbours of the finish node)

Weight Dijkstra, on rare runtimes, revisualisation may leave left over artifacts/css when reseting. Possibly due to above bug. RESOLVED 03/04/2021
