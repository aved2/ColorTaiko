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
  // Calculate control point for the curved edge
  const curveFactor = 4; // Adjust this value for curvature
  const controlPointX = sourceX + (targetX - sourceX) / curveFactor;
  const controlPointY = sourceY; // Keep the y-coordinate same for both points

  // Create custom curve path
  const edgePath = `M${sourceX},${sourceY} C${controlPointX},${controlPointY} ${controlPointX},${controlPointY} ${targetX},${targetY}`;

  // Get marker end
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  // Edge style
  const edgeStyle = {
    ...style,
    fill: 'none', // Ensure no fill
  };

  return (
    <path
      style={edgeStyle}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

export default LargeArcEdge;