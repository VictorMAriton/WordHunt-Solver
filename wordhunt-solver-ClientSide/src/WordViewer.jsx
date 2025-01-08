// src/WordViewer.jsx
import React, { useState } from "react";

function WordViewer({ wordsWithPaths, board }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!wordsWithPaths || wordsWithPaths.length === 0) {
    return <div>No valid words found.</div>;
  }

  const { word, path } = wordsWithPaths[currentIndex];

  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % wordsWithPaths.length);
  };

  const prevWord = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + wordsWithPaths.length) % wordsWithPaths.length
    );
  };

  const cellSize = 50;
  const tableSize = cellSize * 4;

  return (
    <div>
      <h2>
        Word #{currentIndex + 1} / {wordsWithPaths.length}
      </h2>
      <h3>{word}</h3>
      <p>Length: {word.length}</p>

      {/* Relative container to hold table + SVG overlay */}
      <div
        style={{
          position: "relative",
          width: `${tableSize}px`,
          height: `${tableSize}px`,
          marginBottom: "20px",
        }}
      >
        {/* The 4x4 table */}
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            height: "100%",
            tableLayout: "fixed",
          }}
        >
          <tbody>
            {board.map((row, rIdx) => (
              <tr key={rIdx} style={{ height: `${cellSize}px` }}>
                {row.map((cell, cIdx) => {
                  const isInPath = path.some(([pr, pc]) => pr === rIdx && pc === cIdx);
                  return (
                    <td
                      key={cIdx}
                      style={{
                        border: "1px solid #000",
                        textAlign: "center",
                        verticalAlign: "middle",
                        backgroundColor: isInPath ? "#FFD700" : "#fff",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* SVG Overlay for Arrows */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
          width={tableSize}
          height={tableSize}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="red" />
            </marker>
          </defs>

          {path.map((coord, index) => {
            if (index === path.length - 1) return null;
            const [r1, c1] = coord;
            const [r2, c2] = path[index + 1];

            const x1 = c1 * cellSize + cellSize / 2;
            const y1 = r1 * cellSize + cellSize / 2;
            const x2 = c2 * cellSize + cellSize / 2;
            const y2 = r2 * cellSize + cellSize / 2;

            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="red"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </svg>
      </div>

      <div>
        <button onClick={prevWord}>Previous</button>
        <button onClick={nextWord} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
}

export default WordViewer;
