import exp from "constants";

export type TimerType = 'STOPWATCH' | 'TOTAL_COUNTDOWN' | 'ROUND_COUNTDOWN' | 'FISHER' | 'BRONSTEIN';

export type GameStatus = 'RESET' | 'PLAY' | 'PAUSE' | 'SETTINGS';

export interface Player {
    name: string;
    colour: number;
    timer: number;
    live: boolean;
}

export interface GameState {
    status: GameStatus;
    activePlayer: number;
    maxTime: number;
    players: Player[];
    lastChangeTime: number;
    timerType: TimerType;
}
