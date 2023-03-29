import React, { useEffect, useState } from 'react';
import Square from "../square";
import './board.css';

export default function Board(){
  const [squares, setSquares] = useState<string[]|null[]>(Array(9).fill(null))
  const [player, setPlayer] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [end, setEnd] = useState<boolean>(false);
  const token = ["O","X"];

  function newGame() {
    setSquares(Array(9).fill(null));
    setEnd(false);
    setPlayer(0);
  }

  function hasWinner(squares:any):boolean{
    const lines = [
      // horizontal
      [0,1,2],
      [3,4,5],
      [6,7,8],
      // vertical
      [0,3,6],
      [1,4,7],
      [2,5,8],
      // diagonal
      [0,4,8],
      [2,4,6]
    ]
    return lines.some((line): boolean =>
      squares[line[0]]!==null &&
      squares[line[0]]===squares[line[1]] &&
      squares[line[1]]===squares[line[2]]
    );
  }

  function hasMove(squares:any): boolean{
    return squares.some((square: string|null): boolean=> square===null)
  }

  useEffect(()=>{
    // updates the data every move

    if (hasWinner(squares)) {
      setStatus("Winner: "+token[player])
      setEnd(true);
    }else {
      if (hasMove(squares)){
        setPlayer((player + 1) % 2) // change player between 0 and 1
      }else{
        setStatus("Draw!!!")
        setEnd(true);
      }
    }
  } , [squares]);

  useEffect(()=> setStatus("Next Player: "+token[player]), [player]);


  function handleClick(index: number):any{
    if (squares[index] || hasWinner(squares)){
      return
    }

    const nextSquares: string[]|null[] = squares.slice();
    nextSquares[index] = token[player];
    setSquares(nextSquares);

  }

  return (
    <>
      <p>
        {status}
      </p>
      <div className='board'>
        {squares.map((square, index)=>{
          return <Square key={index} value={square} onSquareClick={()=>handleClick(index)} />
        })}
      </div>
      { end &&
      <button onClick={newGame}>new game</button>
      }

    </>
  );
}
