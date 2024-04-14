import React from 'react';
import './EditPlayerTable.css';

interface Player {
    name: string;
    timer: number;
    colour: number;
}

interface EditPlayerTableProps {
    players: Player[];
    onPlayerNameEdit: (name: string, i:number) => void;
    changePlayerColour: (i:number) => void;
}

interface EditPlayerRowProps {
    player: Player;
    onChange: (value: string) => void;
    changePlayerColour: () => void;
    index: number;
}

const EditPlayerRow: React.FC<EditPlayerRowProps> = ({ player, onChange, changePlayerColour}) => {
    return (
        <tr className={`edit-player-row colour-${player.colour}`}>
            <td><input type="text"
                value={player.name}
                onChange={(e) => onChange(e.target.value.substring(0, 12))}
            /></td>
        </tr>
    );
};

const EditPlayerTable: React.FC<EditPlayerTableProps> = ({
         players, onPlayerNameEdit, changePlayerColour,
     }) => {
    return (
        <table className="edit-player-table">
            <tbody>
            {players.map((player, index) => (
                <EditPlayerRow key={index} player={player} index={index} onChange={(name) => onPlayerNameEdit(name, index)} changePlayerColour={() => changePlayerColour(index)}/>
            ))}
            </tbody>
        </table>
    );
};

export default EditPlayerTable;
