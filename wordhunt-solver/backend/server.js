const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const { Trie, findWords } = require("./wordhunt");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Read dictionary.txt, build Trie
const dictionaryData = fs.readFileSync("dictionary.txt", "utf-8").split("\n");
const trie = new Trie();
dictionaryData.forEach((word) => {
  const cleanWord = word.trim().toUpperCase();
  if (cleanWord) {
    trie.insert(cleanWord);
  }
});

// POST route to accept the 4x4 board and respond with found words + paths
app.post("/api/find-words", (req, res) => {
  const { board } = req.body;
  if (!board || !Array.isArray(board) || board.length !== 4) {
    return res.status(400).json({ error: "Invalid board data" });
  }

  // Convert letters to uppercase
  const uppercaseBoard = board.map((row) => row.map((letter) => letter.toUpperCase()));

  // DFS + Trie to find valid words
  const [foundWords, wordPaths] = findWords(uppercaseBoard, trie);

  // Sort from longest to shortest
  const wordsWithPaths = Array.from(foundWords)
    .sort((a, b) => b.length - a.length)
    .map((word) => ({
      word,
      path: wordPaths[word],
    }));

  res.json({ wordsWithPaths });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
