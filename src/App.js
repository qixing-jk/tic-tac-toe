import {useState} from "react";

export function Square({value, onSquareClick}) {
    return (<button className="square" onClick={onSquareClick}>{value}</button>)
}


export default function Board() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentSquares, setCurrentSquares] = useState(history[history.length - 1]);
    const [nextIsX, setNextIsX] = useState(true);

    function handleSquareClick(index) {
        if (currentSquares[index] || calculateWinner(currentSquares)) return;
        const tempSquares = currentSquares.slice();
        tempSquares[index] = nextIsX ? 'X' : 'O'
        setNextIsX(!nextIsX)
        setCurrentSquares(tempSquares)
        setHistory([...history, tempSquares])
    }

    const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (nextIsX ? "X" : "O");
    }

    function jumpTo(move) {
        setHistory(history.slice(0, move + 1));
        setCurrentSquares(history[move]);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
    return <>
        <div className="status">{status}</div>
        <div className="board-row">
            <Square value={currentSquares[0]} onSquareClick={() => handleSquareClick(0)}/>
            <Square value={currentSquares[1]} onSquareClick={() => handleSquareClick(1)}/>
            <Square value={currentSquares[2]} onSquareClick={() => handleSquareClick(2)}/>
        </div>
        <div className="board-row">
            <Square value={currentSquares[3]} onSquareClick={() => handleSquareClick(3)}/>
            <Square value={currentSquares[4]} onSquareClick={() => handleSquareClick(4)}/>
            <Square value={currentSquares[5]} onSquareClick={() => handleSquareClick(5)}/>
        </div>
        <div className="board-row">
            <Square value={currentSquares[6]} onSquareClick={() => handleSquareClick(6)}/>
            <Square value={currentSquares[7]} onSquareClick={() => handleSquareClick(7)}/>
            <Square value={currentSquares[8]} onSquareClick={() => handleSquareClick(8)}/>
        </div>
        <div className="game-info">
            <ol>{moves}</ol>
        </div>
    </>
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}