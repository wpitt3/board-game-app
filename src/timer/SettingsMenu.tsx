import React from 'react';
import './SettingsMenu.css';
import {TimerType} from "../definitions";
import EditTime from "./EditTime";


interface SettingsMenuProps {
    onTimerTypeEdit: (i:TimerType) => void;
    timerMode: TimerType;
    time: number;
    onTimeEdit: (i:number) => void;
}

interface TimerTypeRow {
    timerType: TimerType
    title: string;
    description: string;
}

interface TimerTypeRowProps extends TimerTypeRow {
    onTimerTypeEdit: (i:TimerType) => void;
    timerMode: TimerType;
}

const TimerTypeRow: React.FC<TimerTypeRowProps> = ({ timerMode, title, description, onTimerTypeEdit, timerType}) => {
    return (
        <div className={`timer-type-row ${timerMode === timerType ? 'timer-type-selected' : ''}`} onTouchStart={() => onTimerTypeEdit(timerType)} >
            <div className={'timer-type-name'}> {title} </div>
            <div className={'timer-type-details'}> {description} </div>
        </div>
    );
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({
       onTimerTypeEdit,
       timerMode,
       time,
       onTimeEdit,
     }) => {

    const timerTypeRow: TimerTypeRow[] = [
        {timerType: "STOPWATCH", title: "Stopwatch", description: "Counts time taken"},
        {timerType: "TOTAL_COUNTDOWN", title: "Per Game", description: "Timer per player for whole game"},
        {timerType: "ROUND_COUNTDOWN", title: "Per Turn", description: "Timer per player for each turn"},
        {timerType: "FISHER", title: "Fisher", description: "Time per turn, spare time is kept for later"},
    ];

    return (
        <div className={"clock-options-container"}>
            {timerMode === 'STOPWATCH' && <div className={"edit-time"}/>}
            {timerMode === 'TOTAL_COUNTDOWN' && <EditTime title={'Game :'} time={time} onTimeEdit={onTimeEdit}/>}
            {timerMode === 'ROUND_COUNTDOWN' && <EditTime title={'Turn :'} time={time} onTimeEdit={onTimeEdit}/>}
            {timerMode === 'FISHER' && <EditTime title={'Turn :'} time={time} onTimeEdit={onTimeEdit}/>}

            <div className={"clock-options"}>
                {timerTypeRow.map((timerType, index) => (
                    <TimerTypeRow key={index} timerMode={timerMode} onTimerTypeEdit={onTimerTypeEdit} timerType={timerType.timerType} title={timerType.title} description={timerType.description} />
                ))}
            </div>
        </div>
    );
};

export default SettingsMenu;
