import React from 'react';
import { getBezierPath, getMarkerEnd } from 'react-flow-renderer';

const LargeArcEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  arrowHeadType,
  markerEndId, 
}) => {
  const midX = (sourceX + targetX) / 2;
  const cp1Y = sourceY + 80 ; 
  const cp2Y = targetY + 80 ; 

  const edgePath = `M${targetX},${targetY} C${(targetX + midX) / 2},${cp2Y} ${(sourceX + midX) / 2},${cp1Y} ${sourceX},${sourceY}`;
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <path
      style={style}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

export default LargeArcEdge;
