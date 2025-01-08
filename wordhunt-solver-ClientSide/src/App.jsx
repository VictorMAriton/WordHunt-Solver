import React, { useState, useEffect } from "react";
import BoardInput from "./BoardInput";
import WordViewer from "./WordViewer";
import { buildTrieFromArray, findWordsInBoard } from "./solver";

/**
 * App:
 * 1) Fetches dictionary.txt from /public
 * 2) Builds trie in browser
 * 3) Renders a split layout: left = BoardInput, right = WordViewer
 */
function App() {
  const [trie, setTrie] = useState(null);
  const [board, setBoard] = useState(null);
  const [wordsWithPaths, setWordsWithPaths] = useState([]);

  // Fetch dictionary on mount
  useEffect(() => {
    async function loadDictionary() {
      try {
        const response = await fetch(process.env.PUBLIC_URL + "/dictionary.txt");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
  
        const text = await response.text();
        const lines = text
          .split(/\r?\n/)
          .map((w) => w.trim())
          .filter((w) => w.length > 0);
  
        console.log("[App] Loaded dictionary lines:", lines);
        console.log("[App] Total dictionary words:", lines.length);
  
        // 1) Build the Trie
        const tempTrie = buildTrieFromArray(lines);
  
        // 2) Store the Trie in state
        setTrie(tempTrie);
  
        console.log("[App] Trie is fully built and stored!");
      } catch (err) {
        console.error("[App] Error loading dictionary:", err);
      }
    }
    loadDictionary();
  }, []);
  
  
  // Called by BoardInput when "Find Words" is clicked
  const handleSubmitBoard = (boardInput) => {
    console.log("[App] handleSubmitBoard called with boardInput:", boardInput);

    if (!trie) {
      alert("Trie not loaded yet. Wait for dictionary to finish loading.");
      console.warn("[App] Trie is null. Dictionary not ready.");
      return;
    }

    // Store the board in state (optional)
    setBoard(boardInput);

    // Convert to uppercase
    const uppercaseBoard = boardInput.map((row) =>
      row.map((letter) => letter.toUpperCase())
    );

    // Run the solver in the browser
    const results = findWordsInBoard(uppercaseBoard, trie);
    console.log(`[App] Found ${results.length} words in the board.`);
    setWordsWithPaths(results);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side: Board Input */}
      <div
        style={{
          width: "40%",
          borderRight: "1px solid #ccc",
          padding: "20px",
        }}
      >
        <h1>WordHunt Solver (Client-Side)</h1>
        <BoardInput onSubmitBoard={handleSubmitBoard} />
      </div>

      {/* Right side: Word List & Arrows */}
      <div style={{ width: "60%", padding: "20px" }}>
        {wordsWithPaths.length > 0 && board && (
          <WordViewer wordsWithPaths={wordsWithPaths} board={board} />
        )}
      </div>
    </div>
  );
}

export default App;
