
export interface Player {
    name: string;
    colour: number;
    timer: number;
    live: boolean;
}

export interface GameState {
    status: 'RESET' | 'PLAY' | 'PAUSE';
    activePlayer: number;
    maxTime: number;
    players: Player[];
    lastChangeTime: number;
}