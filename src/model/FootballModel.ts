export enum MatchResult {
    HOME_WIN = 'H',
    AWAY_WIN = 'A',
    DRAW = 'D',
}

export type Schema = [Date, string, string, number, number, MatchResult, string];
