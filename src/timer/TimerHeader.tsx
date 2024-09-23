import React from 'react';
import './TimerHeader.css';
import {GameStatus} from "../definitions";

interface TimerHeaderProps {
    time: number;
    onTimerModeEdit: () => void;
    gameStatus: GameStatus
}

const TimerUnit: React.FC<{timerUnit: number}> = ({timerUnit}) => {
    let x = timerUnit.toString()
    x = (x.length == 1 ? '0' : '') + x
    return (<div className={"time-in-header-unit"}>{x}</div>)
}

const Timer: React.FC<{time: number}> = ({time}) => {
    const SEC_IN_MILLIS =     1000;
    const MIN_IN_MILLIS =    60000;
    const HOUR_IN_MILLIS = 3600000;

    const secs = Math.floor(time / SEC_IN_MILLIS) % 60
    const mins = Math.floor(time / MIN_IN_MILLIS) % 60
    const hours = Math.floor(time / HOUR_IN_MILLIS) % 60

    return (
        <div className={"time-in-header"}>
            <TimerUnit timerUnit={hours}/>
            <div className={"time-in-header-unit-separator"}>:</div>
            <TimerUnit timerUnit={mins}/>
            <div className={"time-in-header-unit-separator"}>:</div>
            <TimerUnit timerUnit={secs}/>
        </div>
    );
}

const TimerHeader: React.FC<TimerHeaderProps> = ({onTimerModeEdit, time, gameStatus}) => {
    return (
        <div className={"timer-header"}>
            { gameStatus === 'RESET' &&
                <div className={"timer-header-items"}>
                    <Timer time={time}/>
                </div>
            }
            <div className={"timer-header-settings-container"}>
                <div className={"timer-header-settings"} onTouchStart={() => onTimerModeEdit()}><i className="material-icons">settings</i></div>
            </div>
        </div>
    );
};

export default TimerHeader;
