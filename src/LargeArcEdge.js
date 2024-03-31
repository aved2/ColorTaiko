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
    // Implement the custom large arc drawing logic here, setting the color based on data.color
    const edgePath = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  
    // Use the color specified in the data object, or default to black if not specified
    const edgeStyle = {
      ...style,
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






