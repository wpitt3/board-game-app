import React, { useState, useEffect } from 'react';

import './TimerControlButtons.css';
import PlayerTable from "./PlayerTable";
import EditPlayersTable from "./EditPlayersTable";
import EditTime from "./EditTime";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "../store";
import {updateStatus} from "../gameSlice";

interface Player {
    name: string;
    timer: number;
    live: boolean;
    colour: number;
}

// type GameState = 'RESET' | 'PLAY' | 'PAUSE'

const INITIAL_TIME = 60000;

// start on x player
// set colour

function ChessTimer() {
    const dispatch = useDispatch();
    const initialPlayers: Player[] = [
        { name: 'Player', timer: INITIAL_TIME, live: true, colour: 0 },
        { name: 'Player', timer: INITIAL_TIME, live: true, colour: 1 },
    ];

    const gameStatus = useSelector((state: RootState) => state.game.status);
    const [players, setPlayers] = useState<Player[]>(initialPlayers);
    const [activePlayerIndex, setActivePlayerIndex] = useState<number>(-1);
    const [time, setMaxTime] = useState<number>(INITIAL_TIME);

    useEffect(() => {
        if (players.length > 0 && activePlayerIndex !== -1) {
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
            }, 10);

            return () => clearInterval(interval);
        }
    }, [players, activePlayerIndex]);

    const findNextActivePlayer = (from: number) => {
        for (let i = 0; i < players.length; i++) {
            if (players[(i + from) % players.length].live) {
                return (i + from) % players.length
            }
        }
        return -1;
    }

    const handleTableRowClick = (i: number) => {
        const nextPlayer = findNextActivePlayer(activePlayerIndex + 1);
        setActivePlayerIndex(nextPlayer)
        dispatch(updateStatus(nextPlayer === -1 ? 'PAUSE' : 'PLAY'));
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
            const nextPlayer = findNextActivePlayer(0);
            setActivePlayerIndex(nextPlayer)
            dispatch(updateStatus(nextPlayer === -1 ? 'PAUSE' : 'PLAY'));
        } else {
            setActivePlayerIndex(-1)
            dispatch(updateStatus('PAUSE'));
        }
    };

    const handleResetButtonClick = () => {
        setActivePlayerIndex(-1)
        dispatch(updateStatus('RESET'));
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

    const handleChangePlayerOrder = (fromI: number, toY: number) => {
        const playerWidth = (window.innerHeight - 80) / players.length;
        const toI = Math.floor((toY + (playerWidth / 2)) / playerWidth);
        if (fromI !== toI && gameStatus === 'PAUSE') {
            setPlayers((prevPlayers) => {
                const newPlayers = [...prevPlayers];
                const removedItem = newPlayers.splice(fromI, 1)[0];
                newPlayers.splice(toI > fromI ? toI -1 : toI, 0, removedItem);
                return newPlayers
            });
        }
    }

    return (
        <div>
            {gameStatus === 'RESET' && <EditTime time={time} onTimeEdit={handleTimeEdit} />}
            {gameStatus === 'RESET' && <EditPlayersTable players={players} onPlayerNameEdit={handlePlayerNameEdit} changePlayerColour={handleChangePlayerColour} />}
            {gameStatus !== 'RESET' && <PlayerTable players={players} activePlayerIndex={activePlayerIndex} onTableRowClick={handleTableRowClick} onDrag={handleChangePlayerOrder}/>}

            <div className="time-control-buttons">
                <button className='pause' onClick={handlePauseButtonClick}>
                    {gameStatus === 'PLAY' ? 'Pause' : 'Play'}
                </button>
                {gameStatus !== 'PLAY' && (<button className='reset' onClick={handleResetButtonClick}>
                    Reset
                </button>)}
                {gameStatus === 'RESET' && (<div className='player-change' ><button onClick={() => handleChangePlayerCount(-1)}>-</button>
                    <button onClick={() => handleChangePlayerCount(+1)}>+</button></div>
                )}

            </div>
        </div>
    );
}

export default ChessTimer;
