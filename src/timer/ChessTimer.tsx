import React, { useEffect } from 'react';

import './TimerControlButtons.css';
import PlayerTable from "./PlayerTable";
import EditPlayersTable from "./EditPlayersTable";
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "../store";
import {
    updatePlayerTime,
    nextPlayer,
    updateMaxTime, updatePlayerName, updateSwapPlayers, updatePlayerColour, toggleSettings, toggleTimerMode
} from "../redux/gameSlice";
import TimerControlButtons from "./TimerControlButtons";
import TimerHeader from "./TimerHeader";
import SettingsMenu from "./SettingsMenu";
import {TimerType} from "../definitions";

function ChessTimer() {
    const dispatch = useDispatch();
    const gameStatus = useSelector((state: RootState) => state.game.status);
    const activePlayerIndex = useSelector((state: RootState) => state.game.activePlayer);
    const players = useSelector((state: RootState) => state.game.players);
    const time = useSelector((state: RootState) => state.game.maxTime);
    const timerMode = useSelector((state: RootState) => state.game.timerType);

    useEffect(() => {
        if (players.length > 0 && activePlayerIndex !== -1) {
            const interval = setInterval(() => {
                dispatch(updatePlayerTime()) //TODO store time in state and just use this to repaint
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

    const handleToggleSettings = () => {
        dispatch(toggleSettings())
    };

    const handleTimerModeEdit = (i: TimerType) => {
        dispatch(toggleTimerMode(i))
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
            {(gameStatus === 'RESET' || gameStatus === 'SETTINGS') &&  <TimerHeader time={time} gameStatus={gameStatus} onTimerModeEdit={handleToggleSettings}/>}
            {gameStatus === 'SETTINGS' && <SettingsMenu time={time} onTimeEdit={handleTimeEdit} onTimerTypeEdit={handleTimerModeEdit} timerMode={timerMode}/>}
            {gameStatus === 'RESET' && <EditPlayersTable players={players} onPlayerNameEdit={handlePlayerNameEdit} changePlayerColour={handleChangePlayerColour} />}
            {gameStatus !== 'RESET' && gameStatus !== 'SETTINGS' && <PlayerTable players={players} activePlayerIndex={activePlayerIndex} onTableRowClick={handleTableRowClick} onDrag={handleChangePlayerOrder}/>}
            {gameStatus !== 'SETTINGS' && <TimerControlButtons/>}
        </div>
    );
}

export default ChessTimer;
