import React, {useState} from 'react';
import './EditTime.css';


interface EditTimeProps {
    time: number;
    onTimeEdit: (i:number) => void;
}

interface EditTimeItemProps {
    time: number;
    onChange: (i:number) => void;
}

const EditTimeItem: React.FC<EditTimeItemProps> = ({time, onChange}) => {
    const v = time.toString();
    return (
        <div className={"edit-time-item"}>
            <input type="number"
               placeholder={(v.length === 1 ? '0' : '') + v}
               onChange={(e) => {
                   const val = parseInt(e.target.value);
                   if (val >= 0) {
                       onChange(val)
                   }
               }}
            />
        </div>
    );
}

const EditTime: React.FC<EditTimeProps> = ({
           time,
           onTimeEdit,
     }) => {

    const SEC_IN_MILLIS =     1000;
    const MIN_IN_MILLIS =    60000;
    const HOUR_IN_MILLIS = 3600000;

    const secs = Math.floor(time / SEC_IN_MILLIS) % 60
    const mins = Math.floor(time / MIN_IN_MILLIS) % 60
    const hours = Math.floor(time / HOUR_IN_MILLIS) % 60

    return (
        <div className={"edit-time"}>
            <div className={"edit-time-items"}>
                <EditTimeItem time={hours} onChange={(newHours) => onTimeEdit(time - hours * HOUR_IN_MILLIS + newHours * HOUR_IN_MILLIS)}></EditTimeItem>
                <EditTimeItem time={mins} onChange={(newMins) => onTimeEdit(time - mins * MIN_IN_MILLIS + newMins * MIN_IN_MILLIS)}></EditTimeItem>
                <EditTimeItem time={secs} onChange={(newSecs) => onTimeEdit(time - secs * SEC_IN_MILLIS + newSecs * SEC_IN_MILLIS)}></EditTimeItem>
            </div>
        </div>
    );
};

export default EditTime;
