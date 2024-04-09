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
  const cp1Y = sourceY - 50 ; 
  const cp2Y = targetY - 50 ; 

  const edgePath = `M${sourceX},${sourceY} C${(sourceX + midX) / 2},${cp1Y} ${(targetX + midX) / 2},${cp2Y} ${targetX},${targetY}`;
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
