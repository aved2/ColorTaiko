import { useCallback, useState, useRef, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, ConnectionMode, ConnectionLineType, MarkerType } from 'reactflow';
import CustomNode from './customNode';
import ErrorModal from './ErrorModal'; 
import { invertColor, generateRandomColor } from './utils';
import 'reactflow/dist/style.css';
import './App.css';
import { toast } from 'react-toastify';
import  LargeArcEdge from './LargeArcEdge';

const lineWidths = [1, 2, 3, 4, 5, 6,8,10];


const initItemStyle = {
 markerEnd: undefined,
 markerStart: undefined,
 animated: false
}


const initWarpStyle = {
 strokeDasharray: undefined
}


const nodeTypes = {
 custom: CustomNode,
};

const edgeTypes = {
  largeArc: LargeArcEdge,
};






const nodeDefault = {
 // sourcePosition: Position.Right,
 // targetPosition: Position.Left,
 style: {
   borderRadius: '100%',
   backgroundColor: 'rgb(227, 213, 194)',
   width: 27,
   height: 27,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   border: 'solid 3px #604d93',
 },
}
export default function App() {
 const previousColorRef = useRef(null);
 const MIN_VERTICES = 3;
 const MAX_VERTICES = 50;
 const idTop = useRef(0)
 const idBottom = useRef(100)
 // const [rfInstance, setRfInstance] = useState(null);
 const [darkMode, setDarkMode] = useState(false);
 const [topVertices, setTopVertices] = useState(5);
 const [bottomVertices, setBottomVertices] = useState(5);
 const [nodes, setNodes, onNodesChange] = useNodesState([]);
 const [edges, setEdges, onEdgesChange] = useEdgesState([]);
 const [lineColor, setLineColor] = useState('#666');
 const [lineWidth, setLineWidth] = useState(4);
 const [lineStyle, setLineStyle] = useState('endArrowClosed');
 const [errorMessage, setErrorMessage] = useState(null);
 const currNodeA = useRef(null);
 const currNodeB = useRef(null);
 const round = useRef(0);




 const lineStyles = useCallback(() => {
   return [
    //  {
    //    key: 'default',
    //    name: 'Default',
    //    lineComponent: undefined,
    //    itemStyle: initItemStyle, // add to edges
    //    wrapStyle: initWarpStyle // add to linestyles
    //  },
    //  {
    //    key: 'dashed',
    //    name: 'Dasthed',
    //    lineComponent: undefined,
    //    itemStyle: {},
    //    wrapStyle: {
    //      strokeDasharray: '5, 5'
    //    }
    //  },
    //  {
    //    key: 'dotDash',
    //    name: 'DotDash',
    //    lineComponent: undefined,
    //    itemStyle: {},
    //    wrapStyle: {
    //      strokeDasharray: '1, 5'
    //    }
    //  },
    //  {
    //    key: 'shortDash',
    //    name: 'ShortDash',
    //    lineComponent: undefined,
    //    itemStyle: {},
    //    wrapStyle: {
    //      strokeDasharray: '5, 5, 1, 5'
    //    }
    //  },
    //  {
    //    key: 'moveDash',
    //    name: 'MoveDash',
    //    lineComponent: undefined,
    //    itemStyle: {
    //      animated: true
    //    },
    //    wrapStyle: {}
    //  },
    //  {
    //    key: 'endArrow',
    //    name: 'EndArrow',
    //    lineComponent: undefined,
    //    itemStyle: {
    //      markerEnd: {
    //        type: MarkerType.Arrow,
    //        // color: lineColor,
    //      },
    //      animated: false
    //    },
    //    wrapStyle: {}
    //  },
     {
       key: 'endArrowClosed',
       name: 'EndArrowClosed',
       lineComponent: undefined,
       itemStyle: {
         markerEnd: {
           type: MarkerType.ArrowClosed,
           // color: lineColor,
         },
         animated: false
       },
       wrapStyle: {}
     }
    //  {
    //    key: 'bothArrow',
    //    name: 'BothArrow',
    //    lineComponent: undefined,
    //    itemStyle: {
    //      markerEnd: {
    //        type: MarkerType.Arrow,
    //        // color: lineColor,
    //      },
    //      markerStart: {
    //        type: MarkerType.Arrow,
    //        // color: lineColor,
    //      },
    //      animated: false
    //    },
    //    wrapStyle: {}
    //  },
    //  {
    //    key: 'bothArrowClosed',
    //    name: 'BothArrowClosed',
    //    lineComponent: undefined,
    //    itemStyle: {
    //      markerEnd: {
    //        type: MarkerType.ArrowClosed,
    //        // color: lineColor,
    //      },
    //      markerStart: {
    //        type: MarkerType.ArrowClosed,
    //        // color: lineColor,
    //      },
    //      animated: false
    //    },
    //    wrapStyle: {}
    //  },
     // {
     //   key: 'bothArrowClosed',
     //   name: 'BothArrowClosed',
     //   lineComponent: undefined,
     //   itemStyle: {},
     //   wrapStyle: {}
     // },
   ]
 }, [])


 useEffect(() => {
   setNodes(() => []);
   idTop.current = 0;
   idBottom.current = 100;
   const width = window.innerWidth
   const height = window.innerHeight
   // top
   const topArr = new Array(topVertices).fill(idTop.current + 1)
   const topItemWidth = (width - 30) / (topVertices - 1)
   topArr.forEach((_, index) => {
     addItems({x: index * topItemWidth, y: 0})
   })
   // bottom
   const bottomItemWidth = (width - 30) / (bottomVertices - 1)
   new Array(bottomVertices).fill(idBottom.current + 1).forEach((_, index) => {
     addItems({x: index * bottomItemWidth, y: height * 3 / 5})
   })
 }, [topVertices, bottomVertices])


 useEffect(() => {
     const style = lineStyles().find((item) => item.key === lineStyle)
     const nds = edges.map((item) => {
     return {
       ...item,
       style: {
         stroke: item?.style?.stroke,
         strokeWidth: lineWidth,
         ...initWarpStyle,
         ...style.wrapStyle,
       },
       ...initItemStyle,
       ...{
         ...style.itemStyle,
         markerEnd: style.itemStyle.markerEnd ? {...style.itemStyle.markerEnd, color: item?.style?.stroke,} : undefined,
         markerStart: style.itemStyle.markerStart ? {...style.itemStyle.markerStart, color: item?.style?.stroke} : undefined,
       },
     }
   })
   // directly setEdges([...nds])，do not re-render lines with arrows
   if (lineStyle.includes('Arrow')) {
     setEdges([])
     setTimeout(() => {
       setEdges([...nds])
     });
   } else {
     setEdges([...nds])
   }
 }, [lineWidth, lineStyle])


 const addItems = (pos) => {
   let idNode;
   if (pos.y > 80) {
     idBottom.current = idBottom.current + 1;
     idNode = idBottom.current
   } else {
     idTop.current = idTop.current + 1;
     idNode = idTop.current
   }
   const newNode = {
     id: idNode.toString(),
     position: pos,
     data: { label: '' },
     type: 'custom',
     ...nodeDefault
   };
   setNodes((nds) => nds.concat(newNode));
 }


 const availableColors = []; // Array to hold available colors

 const onConnect = useCallback(
  (params) => {
    let randomColorPair;

    // Generate a random color pair if there is no previous pair
    if (!previousColorRef.current) {
      randomColorPair = [generateRandomColor(), generateRandomColor()];
    }

    let shNode = {};
    let thNode = {};

    nodes.forEach((item) => {
      if (item.id === params.source) {
        shNode = item;
      }
      if (item.id === params.target) {
        thNode = item;
      }
    });
    
    const style = lineStyles().find((item) => item.key === lineStyle);
    const { source, sourceHandle, target, targetHandle, ...P } = params;
    let sh = sourceHandle;
    let th = targetHandle;
    // Check if an edge already exists between the source and target nodes
    const isEdgeExists = edges.some(edge => (  (edge.source === source && edge.target === target) ||  (edge.source === target && edge.target === source)  ));

    if (isEdgeExists) {
      setErrorMessage('An edge already exists between these nodes. Draw another edge.');
      return; // Prevent adding a new edge
    }

    if (shNode.position.y === thNode.position.y) {
      toast.warning("You can't draw horizontal lines", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    } else {
      if (shNode.position.y < thNode.position.y) {
        sh = 'c';
        th = 'a';
      } else {
        sh = 'a';
        th = 'c';
      }
      
    }
    
    let colorPairToUse;


    // Use the previous color pair if available, otherwise use the new random color pair
    if (!previousColorRef.current ) {
      colorPairToUse = randomColorPair;
      previousColorRef.current = randomColorPair;

    } else {
      colorPairToUse = previousColorRef.current;
      if (!isEdgeExists) {
        previousColorRef.current = null; // Reset to null after using the previous color pair
      }
    }
    
    round.current +=1;
    // console.log(count);
    console.log(round.current);
    console.log(colorPairToUse);
    let newCurvedEdgeA;
    let newCurvedEdgeB;
    // see if any demand to generate horizontal lines
    let prevNodeA;
    let prevNodeB;
    

    
    if (!currNodeA.current && !currNodeB.current) {
      currNodeA.current =  String(Math.max(Number(source), Number(target)));
      currNodeB.current =  String(Math.min(Number(source), Number(target)));
    } else {
      prevNodeA = currNodeA.current;
      prevNodeB = currNodeB.current;
      currNodeA.current =  String(Math.max(Number(source), Number(target)));
      currNodeB.current =  String(Math.min(Number(source), Number(target)));
    }
    
    if (round.current % 2 === 0) {    // even round, check if demand to draw horizontal lines
      newCurvedEdgeA = {
        ...P,
        source: currNodeA.current,
        target: prevNodeA,
        type: 'largeArc', 
        // animated: true,
        style: {
          stroke: colorPairToUse[0], 
          strokeWidth: lineWidth,
          ...initWarpStyle,
          ...style.wrapStyle, 
        },
        
          ...initItemStyle,
          ...style.itemStyle,
          markerEnd: style?.itemStyle?.markerEnd
            ? { ...style?.itemStyle?.markerEnd, color: colorPairToUse[0] }
            : undefined,
          markerStart: style?.itemStyle?.markerStart
            ? { ...style?.itemStyle?.markerStart, color: colorPairToUse[0] }
            : undefined,
      };  


      newCurvedEdgeB = {
        ...P,
        source: currNodeB.current,
        target: prevNodeB,
        type: 'largeArc',
        // animated: true,
        style: {
          stroke: colorPairToUse[0], 
          strokeWidth: lineWidth,
          ...initWarpStyle,
          ...style.wrapStyle, 
        },
        
          ...initItemStyle,
          ...style.itemStyle,
          markerEnd: style?.itemStyle?.markerEnd
            ? { ...style?.itemStyle?.markerEnd, color: colorPairToUse[0] }
            : undefined,
          markerStart: style?.itemStyle?.markerStart
            ? { ...style?.itemStyle?.markerStart, color: colorPairToUse[0] }
            : undefined,
      };  
    } else {
      newCurvedEdgeA = null;
      newCurvedEdgeB = null;
    }

  




    

    return setEdges((eds) =>
      // addEdge(
      //   {
      //     ...P,
      //     source,
      //     target,
      //     sourceHandle: sh,
      //     targetHandle: th,
      //     type: ConnectionLineType.Straight,
      //     style: {
      //       stroke: colorPairToUse[0], // Use the first color in the pair for the current edge
      //       strokeWidth: lineWidth,
      //       ...initWarpStyle,
      //       ...style.wrapStyle,
      //     },
      //     ...initItemStyle,
      //     ...style.itemStyle,
      //     markerEnd: style?.itemStyle?.markerEnd
      //       ? { ...style?.itemStyle?.markerEnd, color: colorPairToUse[1] } // Use the second color in the pair for markers
      //       : undefined,
      //     markerStart: style?.itemStyle?.markerStart
      //       ? { ...style?.itemStyle?.markerStart, color: colorPairToUse[1] } // Use the second color in the pair for markers
      //       : undefined,
      //   },
      //   eds
      // )
      {

        const newEdge = {
          ...P,
          source,
          target,
          sourceHandle: sh,
          targetHandle: th,
          type: ConnectionLineType.Straight,
          style: {
            stroke: colorPairToUse[0], // Use the first color in the pair for the current edge
            strokeWidth: lineWidth,
            ...initWarpStyle,
            ...style.wrapStyle,
          },
          ...initItemStyle,
          ...style.itemStyle,
          markerEnd: style?.itemStyle?.markerEnd
            ? { ...style?.itemStyle?.markerEnd, color: colorPairToUse[1] }
            : undefined,
          markerStart: style?.itemStyle?.markerStart
            ? { ...style?.itemStyle?.markerStart, color: colorPairToUse[1] }
            : undefined,
        };
        console.log(newEdge);
      
        return [...eds, newEdge, ...(newCurvedEdgeA ? [newCurvedEdgeA, newCurvedEdgeB] : [])];

      });
  },
  [setEdges, lineWidth, lineStyle, nodes, lineStyles, edges]
);


const closeModal = () => {
  setErrorMessage(null);
};


 const undoLastLine = () => {
   setEdges(edges.slice(0, -1));
 };


 const toggleDarkMode = () => {
   setDarkMode(!darkMode);
   const egs = edges.map(e => {
     return {
       ...e,
       style: {...e.style, stroke: invertColor(e.style.stroke)},
       markerEnd: e.markerEnd ? {
         ...e.markerEnd,
         color: invertColor(e.markerEnd.color),
       } : undefined,
       markerStart: e.markerStart ? {
         ...e.markerStart,
         color: invertColor(e.markerStart.color),
       } : undefined,
     }
   })
   setEdges([...egs])
 };
 return (
   <div className={`App ${darkMode ? 'dark-mode' : ''}`} style={{ height: '100vh' }}>
     <div className='option-wrap'>
       <div className='option-title'>
         <div className='option-switch'>
           <button id = 'undoButton' onClick={undoLastLine}>Undo Last Line</button>
           <button id="modeSwitch" onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
         </div>
         <h1 className="title">ColorTaiko!</h1>
       </div>
       <div className='input-wrap'>
       <div>
           <div className="input-container">
             <label htmlFor="top-vertices">Top Vertices:</label>
             <input
               id="top-vertices"
               value={topVertices}
               min={MIN_VERTICES}
               max={MAX_VERTICES}
               maxLength={2}
               onChange={(e) => {
                 const newValue = Math.min(Math.max(parseInt(e.target.value), MIN_VERTICES), MAX_VERTICES);
                 setTopVertices(newValue);
               }}
             />
             <button onClick={() => setTopVertices(Math.min(topVertices + 1, MAX_VERTICES))}>+</button>
             <button onClick={() => setTopVertices(Math.max(topVertices - 1, MIN_VERTICES))}>-</button>
           </div>
           <div className="input-container">
             <label htmlFor="bottom-vertices">Bottom Vertices:</label>
             <input
               id="bottom-vertices"
               type="number"
               value={bottomVertices}
               min={MIN_VERTICES}
               max={MAX_VERTICES}
               maxLength={2}
               onChange={(e) => {
                 const newValue = Math.min(Math.max(parseInt(e.target.value), MIN_VERTICES), MAX_VERTICES);
                 setBottomVertices(newValue);
               }}
             />
             <button onClick={() => setBottomVertices(Math.min(bottomVertices + 1, MAX_VERTICES))}>+</button>
             <button onClick={() => setBottomVertices(Math.max(bottomVertices - 1, MIN_VERTICES))}>-</button>
           </div>
         </div>
         <div>
           {/* <div className="input-container">
               <label htmlFor="top-vertices">Line style:</label>
               <select defaultValue={lineStyle} onChange={(e) => {
                 setLineStyle(e.target.value)
               }}>
                 {
                   lineStyles().map((lineItem) => {
                     return <option key={lineItem.key} value={lineItem.key}>{lineItem.name}</option>
                   })
                 }
               </select>
             </div> */}
         </div>
         <div>
           <div className="input-container">
             <label htmlFor="top-vertices">Line width:</label>
             <select defaultValue={lineWidth} onChange={(e) => {
               setLineWidth(e.target.value)
             }}>
               {lineWidths.map(width => {
                 return <option key={width + 'width'} value={width}>{width}</option>
               })}
             </select>
           </div>
           {/* <div className="input-container">
             <label htmlFor="top-vertices">Line color:</label>
             <input type='color' value={lineColor} onChange={(e) => {
               setLineColor(e.target.value)
             }} />
           </div> */}
         </div>
       </div>
     </div>
     <div className='svg-content'>
       <ReactFlow
         nodes={nodes}
         edges={edges}
         edgeTypes={edgeTypes}
         connectionLineType={ConnectionLineType.Straight}
         // onInit={setRfInstance}
         onNodesChange={onNodesChange}
         onEdgesChange={onEdgesChange}
         onConnect={onConnect}
         onConnectStart={() => {
           const initColor = generateRandomColor()
           setLineColor(initColor)
         }}
         autoPanOnConnect={false} // cannot move after connecting
         panOnDrag={false}
         nodesDraggable={false}
         nodesFocusable={false}
         zoomOnScroll={false}
         zoomOnPinch={false}
         zoomOnDoubleClick={false}
         connectionMode={ConnectionMode.Loose}
         nodeTypes={nodeTypes}
         onEdgeClick={(e, node) => {
           // change the lines you selected here
           console.log(e, node)
         }}
         connectionLineStyle={{
           stroke: lineColor,
           strokeWidth: lineWidth,
           ...(lineStyles().find((style) => style.key === lineStyle).wrapStyle)
           // strokeDasharray: '5, 5'
         }}
         // viewportInitialized={false}
       />

       {/* Render the error modal if there's an error message */}
       {errorMessage && <ErrorModal message={errorMessage} onClose={closeModal} />}
     </div>
    
   </div>
 );
}
