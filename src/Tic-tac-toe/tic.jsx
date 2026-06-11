import React, { useState } from 'react'
import Boxes from './boxes'

function Tic() {
    const [toSwitch, setSwitch] = useState(true)
    const [arrData, setarrdata] = useState([null, null, null, null, null, null, null, null, null])
    const [winner, setWinner] = useState(null)
    const [isDraw, setIsDraw] = useState(false)

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        
        [0, 4, 8],
        [2, 4, 6]
    ];

    const a = "X"
    const b = "O"

    function onclicked(index) {
        if (arrData[index] !== null || winner) return;
        
        
        let value = toSwitch ? a : b
        setSwitch(prev => !prev)
        
        const newarrData = [...arrData]
        newarrData[index] = value
        setarrdata(newarrData)

        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const [pos1, pos2, pos3] = WINNING_COMBINATIONS[i]

            if (
                newarrData[pos1] && 
                newarrData[pos1] === newarrData[pos2] && 
                newarrData[pos1] === newarrData[pos3]
            ) {
                setWinner(newarrData[pos1]);
                return;
            }
        }

        if (!newarrData.includes(null)) {
            setIsDraw(true);
        }
    }

    function resetGame() {
        setarrdata([null, null, null, null, null, null, null, null, null]);
        setWinner(null);
        setIsDraw(false);
        setSwitch(true);
    }

    return (
        <>
            <div id="box" className="bg-gray-500 h-screen w-screen flex flex-col justify-center items-center p-4 gap-6">
                
                <div className="text-white text-4xl font-extrabold h-12 flex items-center justify-center">
                    {winner && `${winner} Won!`}
                    {!winner && isDraw && "It's a Draw!"}
                    {!winner && !isDraw && `Turn: ${toSwitch ? a : b}`}
                </div>

                <div id="container" className="bg-white w-full max-w-lg aspect-square rounded-2xl shadow-2xl grid grid-cols-3 grid-rows-3">
                    <Boxes id="1" onBoxclick={() => onclicked(0)} value={arrData[0]} />
                    <Boxes id="2" onBoxclick={() => onclicked(1)} value={arrData[1]} />
                    <Boxes id="3" onBoxclick={() => onclicked(2)} value={arrData[2]} />
                    <Boxes id="4" onBoxclick={() => onclicked(3)} value={arrData[3]} />
                    <Boxes id="5" onBoxclick={() => onclicked(4)} value={arrData[4]} />
                    <Boxes id="6" onBoxclick={() => onclicked(5)} value={arrData[5]} />
                    <Boxes id="7" onBoxclick={() => onclicked(6)} value={arrData[6]} />
                    <Boxes id="8" onBoxclick={() => onclicked(7)} value={arrData[7]} />
                    <Boxes id="9" onBoxclick={() => onclicked(8)} value={arrData[8]} />
                </div>

                <button 
                    onClick={resetGame} 
                    className="bg-white text-gray-800 font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition duration-200 text-lg active:scale-95"
                >
                    Restart
                </button>
            </div>
        </>
    )
}

export default Tic