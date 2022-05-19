import "./App.css";
import React, { useState } from "react";
import ReactPlayer from "react-player";

function Game() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const Square = ({ value, className, onClick }) => {
    return (
      <button
        className={className ? `${className} square` : "square"}
        onClick={onClick}
      >
        {value}
      </button>
    );
  };
  const handleClick = (i) => {
    if (renderWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = isX ? "❌" : "⭕";
    setSquares(squares);
    setIsX(!isX);
  };

  const renderWinner = (squares) => {
    const winningTrios = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningTrios.length; i++) {
      const [a, b, c] = winningTrios[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const winner = renderWinner(squares);
  let status;

  if (winner) {
    status = `🎉Winner: ${winner} 🏆`;
  } else {
    status = "Next player: " + (isX ? "❌" : "⭕");
  }
  const restartGame = () => {
    setIsX(true);
    setSquares(Array(9).fill(null));
  };

  return isPlaying ? (
    <div className="startPlaying">
      <button onClick={() => setIsPlaying(false)}>Start Playing! 🎮 </button>
    </div>
  ) : (
    <div className="App">
      <div className="player">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=x2NzoLMWAwQ&t=23s&ab_channel=GamingSoundFX"
          volume={1}
          playing={true}
          controls={false}
          config={{
            youtube: {
              playerVars: {
                modestbranding: true,
                color: "black",
                controlsList: "nofullscreen",
                fs: 0,
              },
            },
          }}
        />
      </div>

      <div className="header">
        <h1>{status}</h1>
      </div>
      <div className="tictactoe">
        <div className="row">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square
            value={squares[1]}
            className={"middle"}
            onClick={() => handleClick(1)}
          />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square
            value={squares[4]}
            className={"middle"}
            onClick={() => handleClick(4)}
          />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square
            value={squares[6]}
            className={"bottom"}
            onClick={() => handleClick(6)}
          />
          <Square
            value={squares[7]}
            className={"middle bottom"}
            onClick={() => handleClick(7)}
          />
          <Square
            value={squares[8]}
            className={"bottom"}
            onClick={() => handleClick(8)}
          />
        </div>
        <div className="restart">
          <button onClick={restartGame}>Play Again! 🔄 </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <Game />;
}

export default App;
