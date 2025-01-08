import React, { useState, useRef } from "react";

/**
 * BoardInput:
 * - Renders a 4x4 grid of <input />
 * - Auto-advances focus after typing 1 char
 * - Calls onSubmitBoard(board) when "Find Words" is clicked
 */
function BoardInput({ onSubmitBoard }) {
  // 4x4 array of strings
  const [board, setBoard] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );

  // Refs for auto-focus
  const inputRefs = useRef([]);

  const handleChange = (r, c, e) => {
    const val = e.target.value.toUpperCase().slice(0, 1);
    const newBoard = board.map((row, rowIndex) => {
      if (rowIndex !== r) return row;
      return row.map((cellVal, colIndex) => {
        if (colIndex !== c) return cellVal;
        return val;
      });
    });
    setBoard(newBoard);

    // Auto-focus next cell if exactly 1 char typed
    if (val.length === 1) {
      const currentIndex = r * 4 + c;
      const nextIndex = currentIndex + 1;
      if (nextIndex < 16 && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const handleSubmit = () => {
    console.log("[BoardInput] handleSubmit -> calling onSubmitBoard with:", board);
    onSubmitBoard(board);
  };

  return (
    <div>
      <h2>Enter Board</h2>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {board.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => {
                const idx = rIdx * 4 + cIdx;
                return (
                  <td key={cIdx} style={{ padding: "5px" }}>
                    <input
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={cell}
                      onChange={(e) => handleChange(rIdx, cIdx, e)}
                      style={{
                        width: "40px",
                        height: "40px",
                        textAlign: "center",
                        fontSize: "1.2rem",
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        style={{ marginTop: "15px", padding: "8px 16px" }}
      >
        Find Words
      </button>
    </div>
  );
}

export default BoardInput;
