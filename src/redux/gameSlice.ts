import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GameState, Player} from "../definitions";

const INITIAL_TIME = 60000;
const MAX_PLAYER_COUNT = 10;

const initialState: GameState = {
    status: 'RESET',
    activePlayer: -1,
    maxTime: INITIAL_TIME,
    lastChangeTime: Date.now(),
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

const findNextColour = (from: number, players: Player[]) => {
    const assignedKeys = new Set(players.map(player => player.colour));
    for (let i = 0; i <= MAX_PLAYER_COUNT; i++) {
        const key = (from + i) % MAX_PLAYER_COUNT;
        if (!assignedKeys.has(key)) {
            return key;
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
            if (state.activePlayer !== -1) {
                state.players[state.activePlayer].timer -= (Date.now() - state.lastChangeTime);
                if (state.players[state.activePlayer].timer < 0) {
                    state.players[state.activePlayer].timer = 0;
                    state.players[state.activePlayer].live = false;
                }
            }
            state.lastChangeTime = Date.now()
            state.activePlayer = findNextActivePlayer(state.activePlayer + 1, state.players);
            state.status = state.activePlayer === -1 ? 'PAUSE' : 'PLAY';
        },
        pauseGame(state) {
            if (state.activePlayer !== -1) {
                state.players[state.activePlayer].timer -= (Date.now() - state.lastChangeTime);
                if (state.players[state.activePlayer].timer < 0) {
                    state.players[state.activePlayer].timer = 0;
                    state.players[state.activePlayer].live = false;
                }
            }
            state.lastChangeTime = Date.now()
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
        updatePlayerColour(state, action: PayloadAction<number>) {
            const i = action.payload;
            const nextColour = findNextColour(state.players[i].colour + 1, state.players);
            state.players[i].colour = nextColour === -1 ? state.players[i].colour : nextColour;
        },
        updatePlayerName(state, action: PayloadAction<updateNameProps>) {
            const { index, newName } = action.payload;
            state.players[index].name = newName;
        },
        addPlayer(state) {
            state.players.push({ name: 'Player', timer: state.maxTime, live: true, colour: findNextColour(state.players.length, state.players)});
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
            if (state.activePlayer !== -1) {
                state.players[state.activePlayer].timer -= (Date.now() - state.lastChangeTime);
                if (state.players[state.activePlayer].timer < 0) {
                    state.players[state.activePlayer].timer = 0;
                    state.players[state.activePlayer].live = false;
                }
                state.lastChangeTime = Date.now()
            }
        }
    },
});

export const { updateMaxTime, nextPlayer, resetGame, pauseGame, updatePlayerName, addPlayer, removePlayer, updateSwapPlayers, updateCountDown, updatePlayerColour } = gameSlice.actions;
export default gameSlice.reducer;
