import React from 'react';

const calculateMidpointAndTangent = (sourceX, sourceY, controlX, controlY, targetX, targetY) => {
  const t = 0.5;
  const midX = Math.pow(1 - t, 2) * sourceX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * targetX;
  const midY = Math.pow(1 - t, 2) * sourceY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * targetY;

  const tangentX = 2 * (1 - t) * (controlX - sourceX) + 2 * t * (targetX - controlX);
  const tangentY = 2 * (1 - t) * (controlY - sourceY) + 2 * t * (targetY - controlY);

  const angle = Math.atan2(tangentY, tangentX) * (180 / Math.PI);

  return { midX, midY, angle };
};

const LargeArcEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
}) => {
  const controlX = (sourceX + targetX) / 2;
  const controlY = Math.min(sourceY, targetY) - 50; 

  const { midX, midY, angle } = calculateMidpointAndTangent(sourceX, sourceY, controlX, controlY, targetX, targetY);

  const edgePath = `M${sourceX},${sourceY} Q ${controlX},${controlY} ${targetX},${targetY}`;

  // Define a larger arrow pointing to the right
  // Adjust the size as needed by scaling the numbers
// Define a traditional arrowhead pointing to the right
  const arrowWidth = 25; // Width of the arrowhead
  const arrowLength = 50; // Length of the arrowhead
  const arrowPath = `M 0,0 L ${arrowLength},${arrowWidth / 2} L ${arrowLength},-${arrowWidth / 2} Z`;

  return (
    <g>
      <path d={edgePath} style={style} fill="none" />
      <g transform={`translate(${midX},${midY}) rotate(${angle})`}>
        <path d={arrowPath} fill={style.stroke || 'black'} />
      </g>
    </g>
  );
};

export default LargeArcEdge;
