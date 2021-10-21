import React, { useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  updateEdge,
  Background,
  Controls,
} from "react-flow-renderer";
import "./style.css";
import axios from "axios";
import chroma from "chroma-js";


const ReactFlowRenderer = () => {
  const [elements, setElements] = useState([]);
  const graphStyles = { width: "100%", height: "600px", opacity: 1};

  const nodeAddHandler = (name) => {
    // Position a course by its level
    let level = name.split(" ")[1][0];
    level = parseInt(level);
    const posX = 260 * (level-1) + Math.random() * 260;
    const posY = Math.random() * 520;

    const newNode = {
      id: name,
      data: { label: name },
      sourcePosition: 'right',
      targetPosition: 'left',
      position: {
        x: posX,
        y: posY
      }
    };
    newNode.data = { ...newNode.data, id: `${newNode.id}` };
    setElements((prev) => {
      return [...prev, newNode];
    });
  };

  const edgeAddHandler = (sid, tid) => {
    const colours = chroma.scale(['lightslategray','lightskyblue', '#FFD580']).mode('lch').colors(10);
    // const colours = chroma.scale(['#283350','#F93800', '#FFB500']).mode('lch').colors(5);

    const newEdge = {
      id: `${Date.now()}`,
      source: sid,
      target: tid,
      arrowHeadType: 'arrowclosed',
      // type: 'smoothstep',
      // animated: true,
      style: {
        stroke: colours[Math.floor(Math.random()*colours.length)],
      }
    }
    newEdge.data = { ...newEdge.data, id: `${newEdge.id}` };
    setElements((prev) => {
      return [...prev, newEdge];
    });
  }

  // Get courses from server and add them along with their prerequisites
  const addElements = () => {
    var seen = [];
    axios
      .get("/api/todos/")
      .then((res) => {
        res = res.data;
        for (let i = 0; i < res.length; i++) {
          if (res[i].number && !(seen.includes(res[i].number))){
            seen.push(res[i].number);
            nodeAddHandler(res[i].number);
          }
          const prereqs = res[i].prerequisites.split(', ');
          for (let j = 0; j < prereqs.length; j++){
            if (prereqs[j]){
              if (!(seen.includes(prereqs[j]))){
                seen.push(prereqs[j]);
                nodeAddHandler(prereqs[j]); 
              }
              edgeAddHandler(prereqs[j], res[i].number);
            }
          }
        }
      }) 
  }

  const onLoad = (reactFlowInstance) => {
    addElements();
    // console.log('flow loaded:', reactFlowInstance);
    reactFlowInstance.fitView();
  };
  
  const elementRemoveHandler = (elementTobeRemoved) => {
    setElements((prev) => removeElements(elementTobeRemoved, prev));
  };
    
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <div>
        <div>
        <aside>
          <div id="desc">
            * Drag & drop playground <br></br>
            Generated from courses and prerequisites
          </div>
        </aside>
      </div>

      <div>
        <ReactFlow
        elements={elements}
        onElementsRemove={elementRemoveHandler}
        onConnect={onConnect}
        onLoad={onLoad}
        onEdgeUpdate={onEdgeUpdate}
        snapToGrid={true}
        snapGrid={[15, 15]}
        style={graphStyles}
      >
        <Controls />
        <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ReactFlowRenderer;

