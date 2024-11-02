import React, { useEffect, useState } from "react";

function ChildComponent() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log("%c Child Component State Update - Mounted", "color: green;");

    return () => {
      console.log(
        "%c Child Component State Update - Unmounted",
        "color: green;"
      );
    };
  }, [num]);

  useEffect(() => {
    console.log("%c Child Component - Mounted", "color: red;");

    return () => {
      console.log("%c Child Component - Unmounted", "color: blue;");
    };
  }, []);

  return (
    <div>
      <h2>Child Component</h2>
      <button onClick={() => setNum(num + 1)}>{num}</button>
    </div>
  );
}

export default ChildComponent;
