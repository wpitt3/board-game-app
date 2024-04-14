import React, {useState} from 'react';
import './PlayerTable.css';

interface Player {
    name: string;
    timer: number;
    live: boolean;
    colour: number;
}

interface PlayerTableProps {
    players: Player[];
    activePlayerIndex: number;
    onTableRowClick: (i:number) => void;
}

interface PlayerRowProps {
    player: Player;
    active: boolean;
    onClick: () => void;
    index: number;
}

interface TimerItemProps {
    value:number
}

const TimerItem: React.FC<TimerItemProps> = ({value}) => {
    const v = (value % 60).toString()
    return (
        <div className={'timer-item'}>{ (v.length === 1 ? '0' : '') + v }</div>
    );
}

const PlayerRow: React.FC<PlayerRowProps> = ({ player, index, active, onClick}) => {
    const secs = Math.ceil(player.timer / 1000)
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)
    return (
        <tr className={`player-row ${!player.live ? 'dead' : ''}  colour-${player.colour}`} onClick={onClick}>
            <td>{player.name}</td>
            <td className={active ? 'active' : ''}>
                <TimerItem value={hours}/>
                <div className={'colon'}>{":"}</div>
                <TimerItem value={mins}/>
                <div className={'colon'}>{":"}</div>
                <TimerItem value={secs}/></td>
        </tr>
    );
};

const PlayerTable: React.FC<PlayerTableProps> = ({
         players,
         onTableRowClick,
         activePlayerIndex,
     }) => {
    return (
        <table className="player-table">
            <tbody>
            {players.map((player, index) => (
                <PlayerRow key={index} player={player} index={index} active={activePlayerIndex === index} onClick={() => onTableRowClick(index)}/>
            ))}
            </tbody>
        </table>
    );
};

export default PlayerTable;
