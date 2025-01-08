/**
 * Trie data structure for prefix + word checks
 */
export class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfWord = false;
    }
  }
  
  export class Trie {
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
  