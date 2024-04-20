import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameState, Player} from "../definitions";

const INITIAL_TIME = 60000;

const initialState: GameState = {
    status: 'RESET',
    activePlayer: -1,
    maxTime: INITIAL_TIME,
    players: [
        { name: 'Player', timer: INITIAL_TIME, live: true, colour: 0 },
        { name: 'Player', timer: INITIAL_TIME, live: true, colour: 1 },
    ],
};

const findNextActivePlayer = (from: number, players: Player[]) => {
    for (let i = 0; i < players.length; i++) {
        if (players[(i + from) % players.length].live) {
            return (i + from) % players.length
        }
    }
    return -1;
}

interface updateNameProps {
    newName: string;
    index: number;
}

interface swapPlayersProps {
    from: number;
    to: number;
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateMaxTime(state, action: PayloadAction<number>) {
            state.maxTime = action.payload;
            state.players.forEach( (player) => {
                player.timer = state.maxTime;
            })
        },
        nextPlayer(state) {
            state.activePlayer = findNextActivePlayer(state.activePlayer + 1, state.players);
            state.status = state.activePlayer === -1 ? 'PAUSE' : 'PLAY';
        },
        pauseGame(state) {
            state.activePlayer = -1;
            state.status = 'PAUSE';
        },
        resetGame(state) {
            state.activePlayer = -1;
            state.status = 'RESET';
            state.players.forEach( (player) => {
                player.timer = state.maxTime;
                player.live = true;
            })
        },
        updatePlayerName(state, action: PayloadAction<updateNameProps>) {
            const { index, newName } = action.payload;
            state.players[index].name = newName;
        },
        addPlayer(state) {
            state.players.push({ name: 'Player', timer: state.maxTime, live: true, colour: state.players.length});
        },
        removePlayer(state) {
            state.players.pop();
        },
        updateSwapPlayers(state, action: PayloadAction<swapPlayersProps>) {
            const { from, to } = action.payload;
            const removedItem = state.players.splice(from, 1)[0];
            state.players.splice(to > from ? to -1 : to, 0, removedItem);
        },
        updateCountDown(state) {
            if (state.players[state.activePlayer].timer < 10) {
                state.players[state.activePlayer].timer = 0;
                state.players[state.activePlayer].live = false;
            } else {
                state.players[state.activePlayer].timer -= 10;
            }
        }
    },
});

export const { updateMaxTime, nextPlayer, resetGame, pauseGame, updatePlayerName, addPlayer, removePlayer, updateSwapPlayers, updateCountDown } = gameSlice.actions;
export default gameSlice.reducer;