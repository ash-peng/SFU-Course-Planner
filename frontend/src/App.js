import React from "react";
import ReactFlowRenderer from "./react-flow-renderer";
import CoursePlanner from "./course-planner";

const App = () => {
  return (
    <div>
      <CoursePlanner />
      <ReactFlowRenderer />
    </div>
  );
};

export default App;