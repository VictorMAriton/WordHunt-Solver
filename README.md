# WordHunt-Solver
## Author: Victor Ariton

![image](https://github.com/user-attachments/assets/5d9ea7f5-4618-4cdf-a31a-30b81d8bf26f)


## How to use Locally: 
1. Clone Repo and open folder with VsCode

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
 
