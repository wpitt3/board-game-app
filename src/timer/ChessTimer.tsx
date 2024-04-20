import React, { useEffect } from 'react';

import './TimerControlButtons.css';
import PlayerTable from "./PlayerTable";
import EditPlayersTable from "./EditPlayersTable";
import EditTime from "./EditTime";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "../store";
import {
    addPlayer, updateCountDown,
    nextPlayer,
    pauseGame, removePlayer,
    resetGame,
    updateMaxTime, updatePlayerName, updateSwapPlayers,
} from "../redux/gameSlice";

function ChessTimer() {
    const dispatch = useDispatch();
    const gameStatus = useSelector((state: RootState) => state.game.status);
    const activePlayerIndex = useSelector((state: RootState) => state.game.activePlayer);
    const players = useSelector((state: RootState) => state.game.players);
    const time = useSelector((state: RootState) => state.game.maxTime);

    useEffect(() => {
        if (players.length > 0 && activePlayerIndex !== -1) {
            const interval = setInterval(() => {
                dispatch(updateCountDown())
            }, 10);
            return () => clearInterval(interval);
        }
    }, [players, activePlayerIndex]);

    const handleTableRowClick = (i: number) => {
        dispatch(nextPlayer());
    };

    const handlePlayerNameEdit = (name: string, i: number) => {
        dispatch(updatePlayerName({index: i, newName: name}));
    };

    const handleChangePlayerColour = (i: number) => {
        // const newPlayers = [...players];
        // newPlayers[i].colour = (newPlayers[i].colour + 1) % 10;
        // dispatch(updatePlayers(newPlayers));
    };

    const handleTimeEdit = (newTime: number) => {
        dispatch(updateMaxTime(newTime));
    };

    const handlePauseButtonClick = () => {
        if (activePlayerIndex === -1) {
            dispatch(nextPlayer());
        } else {
            dispatch(pauseGame());
        }
    };

    const handleResetButtonClick = () => {
        dispatch(resetGame());
    };

    const handleChangePlayerCount = (change: number) => {
        const newPlayers = [...players];
        if (newPlayers.length + change > 0 && newPlayers.length + change < 11) {
            if (change > 0) {
                dispatch(addPlayer());
            } else {
                dispatch(removePlayer());
            }
        }
    };

    const handleChangePlayerOrder = (fromI: number, toY: number) => {
        const playerWidth = (window.innerHeight - 80) / players.length;
        const toI = Math.floor((toY + (playerWidth / 2)) / playerWidth);
        if (fromI !== toI && gameStatus === 'PAUSE') {
            dispatch(updateSwapPlayers({from: fromI, to: toI}))
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
