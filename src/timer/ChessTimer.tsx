import React, { useState, useEffect } from 'react';

import './ChessTimer.css';
import PlayerTable from "./PlayerTable";
import EditPlayersTable from "./EditPlayersTable";
import EditTime from "./EditTime";

interface Player {
    name: string;
    timer: number;
    live: boolean;
}

// change order
// start on x player
// set colour

function ChessTimer() {
    const [gameState, setGameState] = useState<string>('RESET');
    const [players, setPlayers] = useState<Player[]>([]);
    const [activePlayerIndex, setActivePlayerIndex] = useState<number>(-1);
    const [time, setMaxTime] = useState<number>(60000);

    useEffect(() => {
        // Sample data for players
        const initialPlayers: Player[] = [
            { name: 'Player 1', timer: time, live: true },
            { name: 'Player 2', timer: time, live: true },
            { name: 'Player 3', timer: time, live: true },
            { name: 'Player 4', timer: time, live: true },
            { name: 'Player 5', timer: time, live: true },
            { name: 'Player 6', timer: time, live: true },
            { name: 'Player 7', timer: time, live: true },
            { name: 'Player 8', timer: time, live: true },
            { name: 'Player 9', timer: time, live: true },
        ];
        setPlayers(initialPlayers);
    }, []);

    useEffect(() => {
        if (players.length > 0 && activePlayerIndex != -1) {
            const interval = setInterval(() => {
                setPlayers((prevPlayers) => {
                    const newPlayers = [...prevPlayers];
                    if (newPlayers[activePlayerIndex].timer < 10) {
                        newPlayers[activePlayerIndex].timer = 0;
                        newPlayers[activePlayerIndex].live = false;
                    } else {
                        newPlayers[activePlayerIndex].timer -= 10;
                    }
                    return newPlayers
                });
            }, 19);

            return () => clearInterval(interval);
        }
    }, [players, activePlayerIndex]);

    const handleTableRowClick = (i: number) => {
        setActivePlayerIndex((activePlayerIndex + 1) % players.length);
        setGameState('PLAY')
    };

    const handlePlayerNameEdit = (name: string, i: number) => {
        setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            newPlayers[i].name = name;
            return newPlayers;
        });
    };

    const handleTimeEdit = (newTime: number) => {
        setMaxTime(newTime)
        setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            newPlayers.forEach( (player) => player.timer = newTime)
            return newPlayers;
        });
    };

    const handlePauseButtonClick = () => {
        if (activePlayerIndex === -1) {
            let i = 0;
            while(players[i].live === false) {

            }
            setActivePlayerIndex(0)
            setGameState('PLAY')
        } else {
            setActivePlayerIndex(-1)
            setGameState('PAUSE')
        }
    };

    const handleResetButtonClick = () => {
        setActivePlayerIndex(-1)
        setGameState('RESET')
        setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            newPlayers.forEach( (player) => player.timer = time)
            return newPlayers;
        });
    };

    const handleChangePlayerCount = (change: number) => {
        setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            if (newPlayers.length + change > 0 && newPlayers.length + change < 11) {
                if (change > 0) {
                    newPlayers.push({ name: 'Player', timer: time, live: true });
                } else {
                    newPlayers.pop();
                }
            }
            return newPlayers
        });
    };

    return (
        <div>
            {gameState === 'RESET' && <EditTime time={time} onTimeEdit={handleTimeEdit} />}
            {gameState === 'RESET' && <EditPlayersTable players={players} onPlayerNameEdit={handlePlayerNameEdit} />}
            {gameState !== 'RESET' && <PlayerTable players={players} activePlayerIndex={activePlayerIndex} onTableRowClick={handleTableRowClick} />}
            <div className="buttons">
                <button className='pause' onClick={handlePauseButtonClick}>
                    {gameState === 'PLAY' ? 'Pause' : 'Play'}
                </button>
                {gameState !== 'PLAY' && (<button className='reset' onClick={handleResetButtonClick}>
                    Reset
                </button>)}
                {gameState === 'RESET' && (<div className='player-change' ><button onClick={() => handleChangePlayerCount(-1)}>-</button>
                    <button onClick={() => handleChangePlayerCount(+1)}>+</button></div>
                )}

            </div>
        </div>
    );
}

export default ChessTimer;
