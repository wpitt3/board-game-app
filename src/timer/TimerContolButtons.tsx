import React from "react";


interface TimerControlButtonsProps {
    activePlayerIndex: number;
}

const TimerControlButtons: React.FC<TimerControlButtonsProps> = ({
     activePlayerIndex,
 }) => {


    return (
        <div className="time-control-buttons">
            {/*<button className='pause' onClick={handlePauseButtonClick}>*/}
            {/*    {gameStatus === 'PLAY' ? 'Pause' : 'Play'}*/}
            {/*</button>*/}
            {/*{gameStatus !== 'PLAY' && (<button className='reset' onClick={handleResetButtonClick}>*/}
            {/*    Reset*/}
            {/*</button>)}*/}
            {/*{gameStatus === 'RESET' && (<div className='player-change' ><button onClick={() => handleChangePlayerCount(-1)}>-</button>*/}
            {/*        <button onClick={() => handleChangePlayerCount(+1)}>+</button></div>*/}
            {/*)}*/}
        </div>
    );
};

export default TimerControlButtons;
