import { Trie } from "./trie";

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

/**
 * Takes an array of words, builds a trie
 */
export function buildTrieFromArray(wordArray) {
  const trie = new Trie();
  for (const w of wordArray) {
    const clean = w.trim().toUpperCase();
    if (clean) trie.insert(clean);
  }
  return trie;
}

/**
 * Takes a 4x4 board (uppercase letters) and a trie, returns:
 *   [{ word, path: [[r,c],[r,c],...] }, ...]
 * sorted by descending word length
 */
export function findWordsInBoard(board, trie) {
  const rows = board.length;
  const cols = board[0].length;
  const foundWords = new Set();
  const wordPaths = {}; // word -> path array

  function dfs(r, c, prefix, path, visited) {
    // If prefix not in trie, prune
    if (!trie.hasPrefix(prefix)) {
      return;
    }
    // If prefix is a valid word
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

  // DFS from each cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const visited = new Set();
      visited.add(`${r},${c}`);
      dfs(r, c, board[r][c], [[r, c]], visited);
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
