import React, {FunctionComponent, useCallback, useRef, useState} from "react";
//import '/home/che/REACT_TS/go-life/src/App.css';

const rows = 10;
const cols = 10;

const NEIGHBOURS = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];


const Fin2dArray:FunctionComponent = () => {
    const [board, setBoard] = useState( ()=> {
        const arr = [];

        for (let i=0;i<rows;i++){
            arr.push(Array(cols).fill(0));
        }

        return arr;
    });

    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback( (board) => {
        if(!runningRef.current){
            return;
        }
        console.log("HELLOW");
        //////
        let newBoard = JSON.parse(JSON.stringify(board));
        
        for(let i=1; i<rows-1; i++){
            for(let j=1 ;j<cols-1; j++){
                let neighbours = 0;
                //computing alive neighbours
            
                NEIGHBOURS.forEach(([x, y]) => {
                    const I = i + x;
                    const J = j + y;
          
                    if (I >= 0 && I < rows && J >= 0 && J < cols) {
                      neighbours += board[I][J];
                    }
                  });
                if (neighbours < 3 || neighbours > 4) {
                    newBoard[i][j] = 0;
                } else if (board[i][j] === 0 && neighbours === 3) {
                    newBoard[i][j] = 1;
                }    
            }
        }
        //update board
        setBoard(newBoard);

       // setTimeout(runSimulation,1000);
        
    },[]//,[board]
);

    return(
        <div>
            
            <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 12px)`, width: 'fit-content', margin: '0 auto'}} >
                {board.map((arr,i) => 
                arr.map((cols,j) => 
                <div
                    key={`${i}-${j}`}
                    onClick={() => {
                        let newBoard = JSON.parse(JSON.stringify(board));
                        newBoard[i][j] = board[i][j] ? 0:1;
                        setBoard(newBoard);
                    }}
                    style={{width:10, height:10, backgroundColor: board[i][j] ? 'black' : 'white', border: 'solid 1px black'}} 
                    />
                ))}
            </div>
            <button onClick={() =>{
                setRunning(!running);
                if(!running){
                    runningRef.current=true;
                    runSimulation(board);
                }
                setInterval(() => {
                    runSimulation(board);
                  }, 1000);
            }}>{running ? 'stop': 'start'}</button>

        </div>
    );

}
export default Fin2dArray;