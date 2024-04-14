import React, { useState, useEffect } from 'react';

import './ChessTimer.css';
import PlayerTable from "./PlayerTable";
import EditPlayersTable from "./EditPlayersTable";
import EditTime from "./EditTime";

interface Player {
    name: string;
    timer: number;
    live: boolean;
    colour: number;
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
            { name: 'Player', timer: time, live: true, colour: 0 },
            { name: 'Player', timer: time, live: true, colour: 1 },
            { name: 'Player', timer: time, live: true, colour: 2 },
            { name: 'Player', timer: time, live: true, colour: 3 },
            { name: 'Player', timer: time, live: true, colour: 4 },
            { name: 'Player', timer: time, live: true, colour: 5 },
            { name: 'Player', timer: time, live: true, colour: 6 },
            { name: 'Player', timer: time, live: true, colour: 7 },
            { name: 'Player', timer: time, live: true, colour: 8 },
            { name: 'Player', timer: time, live: true, colour: 9 },
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

    const handleChangePlayerColour = (i: number) => {
        setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            newPlayers[i].colour = (newPlayers[i].colour + 1) % 10;
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
            newPlayers.forEach( (player) => {
                player.timer = time;
                player.live = true;
            })
            return newPlayers;
        });
    };

    const handleChangePlayerCount = (change: number) => {
        setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers];
            if (newPlayers.length + change > 0 && newPlayers.length + change < 11) {
                if (change > 0) {
                    newPlayers.push({ name: 'Player', timer: time, live: true, colour: newPlayers.length});
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
            {gameState === 'RESET' && <EditPlayersTable players={players} onPlayerNameEdit={handlePlayerNameEdit} changePlayerColour={handleChangePlayerColour} />}
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
