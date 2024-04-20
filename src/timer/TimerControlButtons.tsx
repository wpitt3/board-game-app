import React from "react";
import {addPlayer, nextPlayer, pauseGame, removePlayer, resetGame} from "../redux/gameSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";


const TimerControlButtons: React.FC = () => {
    const dispatch = useDispatch();
    const gameStatus = useSelector((state: RootState) => state.game.status);
    const activePlayerIndex = useSelector((state: RootState) => state.game.activePlayer);
    const players = useSelector((state: RootState) => state.game.players);
    const handlePauseButtonClick = () => {
        if (activePlayerIndex === -1) {
            dispatch(nextPlayer());
        } else {
            dispatch(pauseGame());
        }
    };

    const handleResetButtonClick = () => {
        dispatch(resetGame());
    };

    const handleChangePlayerCount = (change: number) => {
        if (players.length + change > 0 && players.length + change < 11) {
            if (change > 0) {
                dispatch(addPlayer());
            } else {
                dispatch(removePlayer());
            }
        }
    };

    return (
        <div className="time-control-buttons">
            <div className="time-control-buttons">
                <button className='pause' onClick={handlePauseButtonClick}>
                    {gameStatus === 'PLAY' ? 'Pause' : 'Play'}
                </button>
                {gameStatus !== 'PLAY' && (<button className='reset' onClick={handleResetButtonClick}>
                    Reset
                </button>)}
                {gameStatus === 'RESET' && (<div className='player-change' ><button onClick={() => handleChangePlayerCount(-1)}>-</button>
                        <button onClick={() => handleChangePlayerCount(+1)}>+</button></div>
                )}
            </div>
        </div>
    );
};

export default TimerControlButtons;
