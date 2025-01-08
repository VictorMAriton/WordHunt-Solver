// src/solver.js
import { Trie } from "./trie";

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

export function buildTrieFromArray(wordArray) {
  const trie = new Trie();
  wordArray.forEach((word) => {
    const clean = word.trim().toUpperCase();
    if (clean) trie.insert(clean);
  });
  return trie;
}

export function findWordsInBoard(board, trie) {
  const rows = board.length;
  const cols = board[0].length;
  const foundWords = new Set();
  const wordPaths = {}; // word -> path (array of coordinates)

  function dfs(r, c, prefix, path, visited) {
    // If prefix not in trie, prune.
    if (!trie.hasPrefix(prefix)) {
      return;
    }
    // If prefix is a word, record it.
    if (trie.hasWord(prefix)) {
      if (!foundWords.has(prefix)) {
        foundWords.add(prefix);
        wordPaths[prefix] = [...path];
      }
    }
    // Explore neighbors
    for (const [dr, dc] of DIRECTIONS) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 && nr < rows &&
        nc >= 0 && nc < cols &&
        !visited.has(`${nr},${nc}`)
      ) {
        visited.add(`${nr},${nc}`);
        dfs(
          nr,
          nc,
          prefix + board[nr][nc],
          [...path, [nr, nc]],
          visited
        );
        visited.delete(`${nr},${nc}`);
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const visited = new Set();
      visited.add(`${r},${c}`);
      dfs(
        r,
        c,
        board[r][c],
        [[r, c]],
        visited
      );
    }
  }

  // Sort from longest to shortest
  const wordsWithPaths = Array.from(foundWords)
    .sort((a, b) => b.length - a.length)
    .map((word) => ({
      word,
      path: wordPaths[word],
    }));

  return wordsWithPaths;
}
