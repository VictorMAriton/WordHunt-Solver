class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let current = this.root;
      for (const char of word) {
        if (!current.children[char]) {
          current.children[char] = new TrieNode();
        }
        current = current.children[char];
      }
      current.isEndOfWord = true;
    }
  
    hasPrefix(prefix) {
      let current = this.root;
      for (const char of prefix) {
        if (!current.children[char]) {
          return false;
        }
        current = current.children[char];
      }
      return true;
    }
  
    hasWord(word) {
      let current = this.root;
      for (const char of word) {
        if (!current.children[char]) {
          return false;
        }
        current = current.children[char];
      }
      return current.isEndOfWord;
    }
  }
  
  const DIRECTIONS = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],            [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];
  
  // DFS function to explore the board
  function findWords(board, trie) {
    const rows = board.length;
    const cols = board[0].length;
    const foundWords = new Set();
    const wordPaths = {}; // word -> path (array of coords)
  
    function dfs(r, c, prefix, path, visited) {
      // If prefix not in trie, prune
      if (!trie.hasPrefix(prefix)) {
        return;
      }
  
      // If prefix is a valid word
      if (trie.hasWord(prefix)) {
        if (!foundWords.has(prefix)) {
          foundWords.add(prefix);
          wordPaths[prefix] = [...path]; // copy path
        }
      }
  
      // Explore neighbors
      for (const [dr, dc] of DIRECTIONS) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(`${nr},${nc}`)) {
          visited.add(`${nr},${nc}`);
          dfs(nr, nc, prefix + board[nr][nc], [...path, [nr, nc]], visited);
          visited.delete(`${nr},${nc}`);
        }
      }
    }
  
    // Start DFS from each cell
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const visited = new Set();
        visited.add(`${r},${c}`);
        dfs(r, c, board[r][c], [[r, c]], visited);
      }
    }
  
    return [foundWords, wordPaths];
  }
  
  module.exports = {
    Trie,
    findWords,
  };
  