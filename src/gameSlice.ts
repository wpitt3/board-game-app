import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
    name: string;
    colour: string;
    time: number;
    live: boolean;
}

type GameStatus = 'RESET' | 'PLAY' | 'PAUSE';

interface GameState {
    status: GameStatus;
    activePlayer: number;
    maxTime: number;
    players: Player[];
}

const initialState: GameState = {
    status: 'RESET',
    activePlayer: 0,
    maxTime: 0,
    players: [],
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateStatus(state, action: PayloadAction<'RESET' | 'PLAY' | 'PAUSE'>) {
            state.status = action.payload;
        },
        updateActivePlayer(state, action: PayloadAction<number>) {
            state.activePlayer = action.payload;
        },
        updateMaxTime(state, action: PayloadAction<number>) {
            state.maxTime = action.payload;
        },
        updatePlayers(state, action: PayloadAction<Player[]>) {
            state.players = action.payload;
        },
    },
});

export const { updateStatus, updateActivePlayer, updateMaxTime, updatePlayers } = gameSlice.actions;
export default gameSlice.reducer;
