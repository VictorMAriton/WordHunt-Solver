// src/App.jsx
import React, { useState, useEffect } from "react";
import BoardInput from "./BoardInput";
import WordViewer from "./WordViewer";
import { buildTrieFromArray, findWordsInBoard } from "./solver";

function App() {
  const [trie, setTrie] = useState(null);           // The built Trie
  const [board, setBoard] = useState(null);         // 4x4 letter matrix
  const [wordsWithPaths, setWordsWithPaths] = useState([]);

  // Load dictionary on mount
  useEffect(() => {
    async function loadDictionary() {
      try {
        const response = await fetch("/dictionary.txt");
        const text = await response.text();
        const lines = text.split(/\r?\n/).filter((w) => w.trim().length > 0);
        const trie = buildTrieFromArray(lines);
        setTrie(trie);
      } catch (err) {
        console.error("Error loading dictionary:", err);
      }
    }
    loadDictionary();
  }, []);

  // Handler for when the user clicks "Find Words"
  const handleSubmitBoard = (boardInput) => {
    if (!trie) {
      alert("Trie not loaded yet, please wait.");
      return;
    }
    setBoard(boardInput);

    // Run DFS in the browser
    const uppercaseBoard = boardInput.map(row =>
      row.map(letter => letter.toUpperCase())
    );
    const found = findWordsInBoard(uppercaseBoard, trie);
    setWordsWithPaths(found);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side: Board Input */}
      <div style={{ width: "40%", borderRight: "1px solid #ccc", padding: "20px" }}>
        <h1>WordHunt Solver (Client-Side)</h1>
        <BoardInput onSubmitBoard={handleSubmitBoard} />
      </div>

      {/* Right side: Word List + Path Display */}
      <div style={{ width: "60%", padding: "20px" }}>
        {wordsWithPaths.length > 0 && board && (
          <WordViewer wordsWithPaths={wordsWithPaths} board={board} />
        )}
      </div>
    </div>
  );
}

export default App;
