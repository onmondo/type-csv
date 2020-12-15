import fs from 'fs';
import moment from 'moment-timezone';
import { isEmpty } from 'lodash';

import { MatchResult, Schema } from '../../model/FootballModel';

enum SpecialChars {
    COMMA = ',',
    NEW_LINE = '\n',
}

export class Reader {
    private contents: string;
    public plainText: string[][] = [[]];
    public collection: Schema[] = [];
    // public typedCollection: any[][] = [[]];

    constructor(public filename: string, public file: string) {
        const result = fs.readFileSync(this.file, { encoding: 'utf-8' });
        if (result.endsWith(SpecialChars.COMMA) 
            || result.endsWith(SpecialChars.NEW_LINE)) {
            this.contents = result.slice(0, -1);
        } else {
            this.contents = result;
        }      
    }

    public read(): void {
        if (!isEmpty(this.contents)) {
            const result =  this.contents.split(SpecialChars.NEW_LINE).map((content: string): string[] => {
                return content.split(SpecialChars.COMMA);
            });
            this.plainText = result;    
        }
    }

    public parse(): void {
        this.read();

        // TODO: Better use a schema for more dynamic type
        const parsedData = this.plainText.map((record): Schema => {
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

        this.collection = parsedData;
    }

    public toString(): void {
        console.table(this.collection);
    }    
}
