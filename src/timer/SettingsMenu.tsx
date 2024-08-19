import React from 'react';
import './SettingsMenu.css';
import {TimerType} from "../definitions";


interface SettingsMenuProps {
    onTimerTypeEdit: (i:TimerType) => void;
    timerMode: TimerType;
}

interface TimerTypeRow {
    timerType: TimerType
    title: string;
    description: string;
}

interface TimerTypeRowProps extends TimerTypeRow, SettingsMenuProps {
}

const TimerTypeRow: React.FC<TimerTypeRowProps> = ({ timerMode, title, description, onTimerTypeEdit, timerType}) => {
    return (
        <div className={`timer-type-row ${timerMode === timerType ? 'timer-type-selected' : ''}`} onClick={() => onTimerTypeEdit(timerType)} >
            <div className={'timer-type-name'}> {title} </div>
            <div className={'timer-type-details'}> {description} </div>
        </div>
    );
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({
       onTimerTypeEdit,
       timerMode
     }) => {

    const timerTypeRow: TimerTypeRow[] = [
        {timerType: "TOTAL_TIMER", title: "Stopwatch", description: "Counts time taken"},
        {timerType: "TOTAL_COUNTDOWN", title: "Per Game", description: "Counts down time for whole game"},
        {timerType: "ROUND_COUNTDOWN", title: "Per Turn", description: "Counts down time for whole turn"},
        {timerType: "FISHER", title: "Fisher", description: "Time per turn, spare time is kept for later"},
    ];

    return (
        <div className={"clock-options-container"}>
            <div className={"clock-options"}>
                {timerTypeRow.map((timerType, index) => (
                    <TimerTypeRow key={index} timerMode={timerMode} onTimerTypeEdit={onTimerTypeEdit} timerType={timerType.timerType} title={timerType.title} description={timerType.description} />
                ))}
            </div>
        </div>
    );
};

export default SettingsMenu;
