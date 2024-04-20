import React, { useEffect } from 'react';

import './TimerControlButtons.css';
import PlayerTable from "./PlayerTable";
import EditPlayersTable from "./EditPlayersTable";
import EditTime from "./EditTime";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "../store";
import {
    updateCountDown,
    nextPlayer,
    updateMaxTime, updatePlayerName, updateSwapPlayers, updatePlayerColour,
} from "../redux/gameSlice";
import TimerControlButtons from "./TimerControlButtons";

function ChessTimer() {
    const dispatch = useDispatch();
    const gameStatus = useSelector((state: RootState) => state.game.status);
    const activePlayerIndex = useSelector((state: RootState) => state.game.activePlayer);
    const players = useSelector((state: RootState) => state.game.players);
    const time = useSelector((state: RootState) => state.game.maxTime);

    useEffect(() => {
        if (players.length > 0 && activePlayerIndex !== -1) {
            const interval = setInterval(() => {
                dispatch(updateCountDown()) //TODO store time in state and just use this to repaint
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
        dispatch(updatePlayerColour(i))
    };

    const handleTimeEdit = (newTime: number) => {
        dispatch(updateMaxTime(newTime));
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
            <TimerControlButtons/>
        </div>
    );
}

export default ChessTimer;
