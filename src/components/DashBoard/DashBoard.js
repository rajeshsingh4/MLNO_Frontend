import React, { useState, useEffect } from "react";
import ChartPie from './Chart'



const DashBoard = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
  
  }, []);

  return (
    <div className="container">
      <header className="pageHeader">
        <h3>{content} Dashboard</h3>
      </header>
    </div>
  );
};

export default DashBoard;
