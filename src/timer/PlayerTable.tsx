import React from 'react';
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
    onDrag: (i: number, y: number) => void;
}

interface PlayerRowProps {
    player: Player;
    active: boolean;
    onClick: () => void;
    onDrag: (y: number) => void;
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

const PlayerRow: React.FC<PlayerRowProps> = ({ player, index, active, onClick, onDrag}) => {
    const secs = Math.ceil(player.timer / 1000)
    const mins = Math.floor(secs / 60)
    const hours = Math.floor(mins / 60)

    return (
        <tr className={`player-row ${!player.live ? 'dead' : ''}  colour-${player.colour}`} onTouchStart={onClick}
            draggable
            onTouchEnd={(e) => onDrag(e.changedTouches[0].clientY)}
        >
            <td className={'player-name'}>{player.name}</td>
            <td className={active ? 'active' : ''}>
                <div className={'time'}>
                    <TimerItem value={hours}/>
                    <div className={'colon'}>{":"}</div>
                    <TimerItem value={mins}/>
                    <div className={'colon'}>{":"}</div>
                    <TimerItem value={secs}/>
                </div>
            </td>
        </tr>
    );
};

const PlayerTable: React.FC<PlayerTableProps> = ({
         players,
         onTableRowClick,
         activePlayerIndex,
        onDrag,
     }) => {
    return (
        <table className="player-table">
            <tbody>
            {players.map((player, index) => (
                <PlayerRow key={index} player={player} index={index} active={activePlayerIndex === index} onClick={() => onTableRowClick(index)} onDrag={(y) => onDrag(index, y)}/>
            ))}
            </tbody>
        </table>
    );
};

export default PlayerTable;
