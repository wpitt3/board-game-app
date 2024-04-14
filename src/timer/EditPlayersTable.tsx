import React from 'react';
import './EditPlayerTable.css';

interface Player {
    name: string;
    timer: number;
}

interface EditPlayerTableProps {
    players: Player[];
    onPlayerNameEdit: (name: string, i:number) => void;
}

interface EditPlayerRowProps {
    player: Player;
    onChange: (value: string) => void;
    index: number;
}

const EditPlayerRow: React.FC<EditPlayerRowProps> = ({ player, onChange}) => {
    return (
        <tr className={`edit-player-row `}>
            <td><input type="text"
                value={player.name}
                onChange={(e) => onChange(e.target.value.substring(0, 12))}
            /></td>
        </tr>
    );
};

const EditPlayerTable: React.FC<EditPlayerTableProps> = ({
         players,
         onPlayerNameEdit,
     }) => {
    return (
        <table className="edit-player-table">
            <tbody>
            {players.map((player, index) => (
                <EditPlayerRow key={index} player={player} index={index} onChange={(name) => onPlayerNameEdit(name, index)}/>
            ))}
            </tbody>
        </table>
    );
};

export default EditPlayerTable;
