import React, { useEffect, useState } from "react";
import ChildComponent from "./ChildComponent";
import Test from "./component/test.tsx";

function ParentComponent() {
  const [showChild, setShowChild] = useState(true);

  const toggleChild = () => {
    setShowChild(!showChild);
  };

  useEffect(() => {
    console.log("%c Parent Component State Update - Mounted", "color: green;");

    return () => {
      console.log(
        "%c Parent Component State Update - Unmounted",
        "color: green;"
      );
    };
  }, [showChild]);

  useEffect(() => {
    console.log("%c Parent Component - Mounted", "color: red;");

    return () => {
      console.log("%c Parent Component - Unmounted", "color: blue;");
    };
  }, []);

  return (
    <>
      <div style={{ borderBottom: "1px black solid", paddingBottom: 10 }}>
        <h1>Parent Component</h1>
        <button onClick={toggleChild}>Toggle Child Component</button>
        {showChild && <ChildComponent />}
      </div>
      <Test />
    </>
  );
}

export default ParentComponent;
