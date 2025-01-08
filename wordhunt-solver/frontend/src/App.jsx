import React, { useState } from "react";
import BoardInput from "./BoardInput";
import WordViewer from "./WordViewer";

function App() {
  const [board, setBoard] = useState(null);
  const [wordsWithPaths, setWordsWithPaths] = useState([]);

  const handleSubmitBoard = async (boardInput) => {
    setBoard(boardInput);

    try {
      const response = await fetch("http://localhost:3001/api/find-words", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board: boardInput }),
      });
      const data = await response.json();
      setWordsWithPaths(data.wordsWithPaths || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Panel (Board Input) */}
      <div style={{ width: "40%", borderRight: "1px solid #ccc", padding: "20px" }}>
        <h1>WordHunt Solver</h1>
        <BoardInput onSubmitBoard={handleSubmitBoard} />
      </div>
      
      {/* Right Panel (Results) */}
      <div style={{ width: "60%", padding: "20px" }}>
        {wordsWithPaths.length > 0 && board && (
          <WordViewer wordsWithPaths={wordsWithPaths} board={board} />
        )}
      </div>
    </div>
  );
}

export default App;
