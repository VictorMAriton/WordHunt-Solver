// src/BoardInput.jsx
import React, { useState, useRef } from "react";

function BoardInput({ onSubmitBoard }) {
  // Initialize 4x4 board
  const [board, setBoard] = useState(
    Array(4).fill(null).map(() => Array(4).fill(""))
  );

  // Refs for each cell input
  const inputRefs = useRef([]);

  const handleChange = (r, c, e) => {
    const value = e.target.value.toUpperCase().slice(0, 1);
    const newBoard = board.map((row, rowIndex) => {
      if (rowIndex !== r) return row;
      return row.map((colVal, colIndex) => {
        if (colIndex !== c) return colVal;
        return value;
      });
    });
    setBoard(newBoard);

    // Auto focus the next cell
    if (value.length === 1) {
      const currentIndex = r * 4 + c;
      const nextIndex = currentIndex + 1;
      if (nextIndex < 16) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const handleSubmit = () => {
    onSubmitBoard(board);
  };

  return (
    <div>
      <h2>Enter Board</h2>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {board.map((row, rIndex) => (
            <tr key={rIndex}>
              {row.map((cell, cIndex) => {
                const index = rIndex * 4 + cIndex;
                return (
                  <td key={cIndex} style={{ padding: "5px" }}>
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={cell}
                      onChange={(e) => handleChange(rIndex, cIndex, e)}
                      style={{
                        width: "40px",
                        height: "40px",
                        textAlign: "center",
                        fontSize: "1.2rem"
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Find Words
      </button>
    </div>
  );
}

export default BoardInput;
