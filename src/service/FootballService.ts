import moment from 'moment-timezone';
import { Reader } from '../lib/csv'
import { MatchResult, Schema } from '../model/FootballModel';
import { Analyzer } from './ReportService';

export class MatchReader extends Reader<Schema> {
    public matches: Schema[] = [];
    constructor(public filename: string, public file: string) {
        super(filename, file);
    }

    public mapRow(contents: string[][]): Schema[] {
        this.matches = contents.map((record): Schema => {
            return [
                moment(record[0], 'DD/MM/YYYY').toDate(),  
                record[1],
                record[2],
                parseInt(record[3]),
                parseInt(record[4]),
                record[5] as MatchResult,
                record[6],
            ];
        });

        return this.matches;
    }

    public toString(): void {
        console.table(this.matches);
    }
}

export class WinsAnalysis implements Analyzer<Schema> {
    constructor(public team: string) {}

    run(matches: Schema[]): string {
        const wins = matches.reduce((total: number, item: string[]): number => {
            if ((item[1] === this.team && item[5] === MatchResult.HOME_WIN)
                || item[2] === this.team && item[5] === MatchResult.AWAY_WIN) {
                return total += 1;
            }
            return total += 0;
        }, 0);

        return `Team ${this.team} won ${wins} games`;
    }
}
