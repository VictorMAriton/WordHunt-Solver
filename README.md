# WordHunt-Solver
## Author: Victor Ariton

![image](https://github.com/user-attachments/assets/5d9ea7f5-4618-4cdf-a31a-30b81d8bf26f)

### Click Here to Use: [Here](https://victormariton.github.io/WordHunt-Solver/)
## How to use Locally: 
1. Clone Repo and open folder (not the client-side folder) with VsCode

1.	**Backend**:  
o	Open a terminal, navigate to wordhunt-solver/backend.  
o	Run npm install (this installs express, cors, etc.).  
o	Run npm start.  
The backend will run on http://localhost:3001.  
2.	**Frontend**:  
o	Open another terminal, navigate to wordhunt-solver/frontend.  
o	Run npm install (this installs react, react-dom, react-scripts, etc.).  
o	Run npm start.  
The frontend will run on http://localhost:3000. It will make requests to http://localhost:3001/api/find-words.  
3.	**Usage**:  
o	In your browser, go to http://localhost:3000.  
o	Type letters into the 4×4 grid, then click Find Words.  
o	The frontend sends the board to the backend, which runs DFS with the Trie and returns all found words (sorted from longest to shortest).  
o	Use Next / Previous to step through the words and see their highlighted paths.  
 
### Overview: 

   Essentially, summarized simply; A Depth-First Search (DFS) is used to explore each cell in a 4×4 grid.
    Alongside a Trie data structure, it enables fast checking of valid prefixes and complete words.
    Then, when a prefix is no longer valid (not in the Trie), the search stops early, improving efficiency allowing for usablity as a Word-Hunt Solver.

   For those that don't know Word-Hunt is a I-Message game where players are given a 4x4 board of letters and tasked with scoring highest number of points within a time period. Points are attributed to finding viable words with longer words giving higher score.

1. Recursive Logic  

       1. Start from each of the 16 cells.
       2. Append the letter in that cell to the current prefix.
       3. Check if the prefix exists in the Trie:
           a. If not found, stop the current DFS path.
           b. If it is a valid word, record it along with its path of cells.
       4. Mark cells as visited so they cannot be reused in the same path.
       5. Recursively move along to all adjacent (up to 8 neighbors) cells if they haven’t been visited.

2. Trie Usage  

       1. Each word in the dictionary is inserted into a Trie for quick lookup.
       2. hasPrefix(prefix) determines whether the prefix is still potentially valid.
       3. hasWord(word) confirms if the current prefix forms a complete word.
       4. This combination of DFS + Trie leads to faster lookups and minimal searching.

   Trie Explained Better: 
   (Source): [Geek for Geeks](https://www.geeksforgeeks.org/trie-insert-and-search/)
       ![image](https://github.com/user-attachments/assets/07edbf5f-4718-41c2-9f67-6a2bfc69746c)




   
